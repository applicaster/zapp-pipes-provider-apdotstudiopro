import { commands } from "./commands";
import { authenticate, safeJsonParse } from "./utils";

export const handler = (nativeBridge) => (params) => {
  // console.log("handler", { params, type, nativeBridge });
  const { type } = params;

  // acquire API key from Native Bridge appData() method
  const { api_key, environment } = nativeBridge.getSessionStoreItem(
    "dotstudiopro"
  );
  // console.log("after setting config", JSON.stringify(pluginConfigurations));
  if ("production" == environment) {
    // console.log("with config");

    try {
      return authenticate(nativeBridge, api_key)
        .then((authObj) => {
          console.log("authObj", authObj);
          params.token = authObj.token;
          params.cdn = authObj.cdn;
          if (params.cdn.indexOf("https://") === -1) {
            params.cdn = "https://" + params.cdn;
          }

          params.deviceWidth = nativeBridge.getSessionStoreItem(
            "deviceWidth",
            ""
          );
          params.deviceHeight = nativeBridge.getSessionStoreItem(
            "deviceHeight",
            ""
          );
          params.platform = nativeBridge.getSessionStoreItem("platform", "");
          params.deviceType = nativeBridge.getSessionStoreItem(
            "deviceType",
            ""
          );
          params.bundleIdentifier = nativeBridge.getSessionStoreItem(
            "bundleIdentifier",
            ""
          );
          params.advertisingIdentifier = nativeBridge.getSessionStoreItem(
            "advertisingIdentifier",
            ""
          );
          params.appName = nativeBridge.getSessionStoreItem("app_name", "");

          params.android_ad_tag = nativeBridge.getLocalStoreItem(
            "android_ad_tag",
            "dotstudiopro"
          );
          params.ios_ad_tag = nativeBridge.getLocalStoreItem(
            "ios_ad_tag",
            "dotstudiopro"
          );

          // console.log("Production build params:", params);

          return commands[type](params)
            .then(nativeBridge.sendResponse)
            .catch(nativeBridge.throwError);
        })
        .catch(nativeBridge.throwError);
    } catch (err) {
      parsedPluginConfiguration = pluginConfigurations;
    }
  } else {
    console.log("Development environment detecting, using fake data.");
    // development environment does not have pluginConfigurations, use hard coded API key
    return authenticate(
      nativeBridge,
      "566ee6d19fef04459d959b08349d6c07b3a309a2"
    )
      .then((authObj) => {
        params.token = authObj.token;
        params.cdn = authObj.cdn;
        if (params.cdn.indexOf("https://") === -1) {
          params.cdn = "https://" + params.cdn;
        }

        // dev build also missing nativeBridge.appData() method so hardcode this too
        params.deviceWidth = "1920";
        params.deviceHeight = "1080";
        params.platform = "android";
        params.deviceType = "phone";
        params.app_name = "Staging Environment";
        params.bundleIdentifier = "1234567890";
        params.advertisingIdentifier = "1234567890";
        params.android_ad_tag =
          "https://vid.springserve.com/vast/604131?w={{deviceWidth}}&h={{deviceHeight}}&cb={{cb}}&dnt=&app_bundle={{app_bundle}}&app_name={{app_name}}&us_privacy=&coppa=1";
        params.ios_ad_tag =
          "https://vid.springserve.com/vast/604130?w={{deviceWidth}}&h={{deviceHeight}}&cb={{cb}}&dnt=&app_bundle={{app_bundle}}&app_name={{app_name}}&us_privacy=&coppa=1";

        return commands[type](params)
          .then(nativeBridge.sendResponse)
          .catch(nativeBridge.throwError);
      })
      .catch(nativeBridge.throwError);
  }
};
