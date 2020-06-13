import axios from 'axios';

export default (params) => {
  let { token } = params;
  const { id, api_key } = params;

  if (api_key) {
    const auth_url = `https://api.myspotlight.tv/token?key=${api_key}`;

    return axios.post(auth_url)
    .then((response) => {
      if (response.data && response.data.success) {
        token = response.data.token;
        const url = `https://api.myspotlight.tv/video/play2/${id}?token=${token}`;
        return axios.get(url)
      } else {
        throw "Could not obtain access token from Spotlight API, please check your API Key";
      }
    })
    .then((response) => {
      if (response.data) {
        return handleVideoResponse(response.data, params);
      } else {
        throw "Video " + id + " not found";
      }
    })
    .catch(e => Promise.reject(e));
  } else if (token) {
    const url = `https://api.myspotlight.tv/video/play2/${id}?token=${token}`;
    return axios.get(url)
    .then((response) => {
      if (response.data) {
        return handleVideoResponse(response.data, params);
      } else {
        throw "Video " + id + " not found";
      }
    })
    .catch(e => Promise.reject(e));
  } else {
    Promise.reject("One of either API Key in query or Access Token in local storage is required")
  }
};

function handleVideoResponse(response, params) {
  const entry = parseVideo(response, params);
  return {
    id: 'video',
    title: 'Video',
    type: {
      value: 'video'
    },
    entry: [ entry ]
  };
}

function parseVideo(video, params) {
  const { _id, title, description, company_id } = video;
  const { cdn, deviceWidth, deviceHeight, platform, device_ifa } = params;

  const url = `${cdn}/files/company/${company_id}/assets/videos/${_id}/vod/${_id}.m3u8`;

  const vmap_url = `https://api.myspotlight.tv/vmap/${_id}/${deviceWidth}/${deviceHeight}?device_type=${platform}&device_ifa=${device_ifa}`;

  return {
    type: {
      value: 'video'
    },
    id: _id,
    title,
    summary: description,
    media_group: [
        {
            "type": "image",
            "media_item": [
                {
                    "type": "image",
                    "key": "image_base",
                    "src": video.thumb
                }
            ]
        }
    ],
    "content": {
        "type": "video/hls",
        "src": url 
    },
    "extensions": {
      "video_ads": vmap_url
    }
  };
}