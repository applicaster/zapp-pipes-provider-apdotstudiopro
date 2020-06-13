export const manifest = {
  handlers: ['categories', 'channels', 'channel', 'video'],
  help: {
    categories: {
      description: 'retrieves a list of available categories',
      params: {
        api_key: 'api key'
      }
    },
    channels: {
      description: 'retrieves a list of channels in a category',
      params: {
        slug: 'category slug',
        api_key: 'api key'
      }
    },
    channel: {
      description: 'retrieves a single channel',
      params: {
        category: 'category slug',
        slug: 'channel slug',
        api_key: 'api key'
      }
    },
    video: {
      description: 'retrieves a specific video',
      params: {
        id: 'video ID',
        api_key: 'api key'
      }
    }
  }
};