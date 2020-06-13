import axios from "axios";

export default (params) => {
  let { token } = params;
  const { api_key, category } = params;

  if (api_key) {
    const auth_url = `https://api.myspotlight.tv/token?key=${api_key}`;
    return axios
      .post(auth_url)
      .then((response) => {
        if (response.data && response.data.success) {
          token = response.data.token;
          const url = `https://api.myspotlight.tv/channels/US/${category}?token=${token}`;
          return axios.get(url);
        } else {
          throw "Could not obtain access token from Spotlight API, please check your API Key";
        }
      })
      .then((response) => {
        const { channels } = response.data;
        if (channels) {
          return handleChannelsResponse(channels, category);
        } else {
          throw "No channels found in category " + category;
        }
      })
      .catch((e) => Promise.reject(e));
  } else if (token) {
    const url = `https://api.myspotlight.tv/channels/US/${category}?token=${token}`;
    return axios
      .get(url)
      .then((response) => {
        const { channels } = response.data;
        if (channels) {
          return handleChannelsResponse(channels, category);
        } else {
          throw "No channels found in category " + category;
        }
      })
      .catch((e) => Promise.reject(e));
  } else {
    Promise.reject(
      "One of either API Key in query or Access Token in local storage is required"
    );
  }
};

function handleChannelsResponse(response, category) {
  const channels = [];

  response.forEach((channel) => {
    if (channel.childchannels.length) {
      // case 1 - parent so need to get children individually
      channel.childchannels.forEach((child) => {
        channels.push(parseChannel(child, category));
      });
    } else if (channel.playlist.length) {
      // case 2 - channel with a playlist
      channels.push(parseChannel(channel, category));
    } else if (channel.video) {
      channels.push(parseVideoChannel(channel));
    }
  });

  return {
    id: "channels",
    title: "Channels",
    type: {
      value: "feed",
    },
    entry: channels,
  };
}

function parseChannel(channel, category) {
  const { _id, title, slug } = channel;

  return {
    type: {
      value: "feed",
    },
    id: _id,
    title,
    media_group: [
      {
        type: "image",
        media_item: [
          {
            src: channel.spotlight_poster || channel.poster,
            key: "image_base",
            type: "image",
          },
        ],
      },
    ],
    extensions: {},
    content: {
      type: "atom",
      rel: "self",
      src: `apdotstudiopro://fetchData?type=channel&category=${category}&slug=${slug}`,
    },
    link: {
      rel: "self",
      type: "feed",
      href: `apdotstudiopro://fetchData?type=channel&category=${category}&slug=${slug}`,
    },
  };
}

function parseVideoChannel(channel) {
  const { _id, title, description } = channel;
  const video_id = channel.video._id;

  return {
    type: {
      value: "program",
    },
    id: _id,
    title,
    summary: description,
    media_group: [
      {
        type: "image",
        media_item: [
          {
            src: channel.spotlight_poster || channel.poster,
            key: "image_base",
            type: "image",
          },
        ],
      },
    ],
    extensions: {},
    content: {
      type: "video/hls",
      src: `apdotstudiopro://fetchData?type=video&id=${video_id}`,
    },
    link: {
      rel: "self",
      href: `apdotstudiopro://fetchData?type=video&id=${video_id}`,
    },
  };
}
