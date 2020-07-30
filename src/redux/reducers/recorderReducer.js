import { PLAYER_STATE, RESET_RECORDER_STATE} from './../actions/allActions';


const recorderDefaultState = {
  playerState: "IDLE",
};

const recorderReducer = (state = recorderDefaultState, action) => {
  switch (action.type) {
    case PLAYER_STATE:
      return {
        playerState: action.payload.playerState
      }
    case RESET_RECORDER_STATE: 
      return recorderDefaultState;
    default:
      return state
  }
};

export default recorderReducer;