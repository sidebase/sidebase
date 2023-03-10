import { MusicClient } from 'youtubei'

export default eventHandler(() => {
  const youtube = new MusicClient()
  const getVideo = async function () {
    const videos = await youtube.search('nSqFQQWyOU0')
    return videos
  }
  return getVideo()
})
