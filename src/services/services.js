import TrackPlayer from 'react-native-track-player';

module.exports = async function trackPlayerServices () {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

  TrackPlayer.addEventListener('playback-track-changed', () => {});

  TrackPlayer.addEventListener('playback-state', (state) => {});

  TrackPlayer.addEventListener('playback-queue-ended', async () => {})
};
