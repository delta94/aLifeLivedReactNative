import { PLAYER_STATE, RESET_RECORDER_STATE, SET_RECORDED_AUDIO_FILEPATH } from './allActions';

export const setPlayerState = (playerState) => {
  return {
    type: PLAYER_STATE,
    payload: {playerState}
  }
};

export const resetRecorderState = () => {
  return {
    type: RESET_RECORDER_STATE
  }
};


export const setRecordedAudioFilepath = (filePath) => {
  return {
    type: SET_RECORDED_AUDIO_FILEPATH,
    payload: {filePath}
  }
};