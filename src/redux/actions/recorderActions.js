import { PLAYER_STATE, RESET_RECORDER_STATE } from './allActions';

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
