import getCategories from './getCategories';
import getChannel from './getChannel';
import getChannels from './getChannels';
import getVideo from './getVideo';

export const commands = {
  categories: getCategories,
  channel: getChannel,
  channels: getChannels,
  video: getVideo
};