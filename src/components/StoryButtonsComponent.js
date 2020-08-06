import React from 'react';
import {View} from 'react-native';

// Components 
import ButtonComponent from './ButtonComponent';

// Styles
import styles from '../styles/components/YesOrNoQuestionComponent';

const StoryButtonsComponent = ({
  questionIndex,
  questions,
  playerState,
  skipOption,
  onNextButton,
  onBackButton, 
  isYesOrNo,
  subQuestionActive,
  handleEndOfQuestions,
  handleOnYes,
  handleOnNo,
  handleOnSkip
}) => {
  // The below handles what text will display on the button
  const onNextButtonText = () => {
    if (questionIndex === questions.length - 1) {
      return 'Finish';
    } else if (skipOption) {
      return 'Skip';
    } else {
      return 'Next';
    }
  };

  // The Below handles what buttons display.
  const handleYesOrNoQuestion = () => {

    // If its the last question
    if (questionIndex === questions.length - 1) {
      return (
        <View style={styles.footerButtonContainer}>
          {questionIndex <= 0 && !subQuestionActive ? (
            <View></View>
          ) : (
            <ButtonComponent
              title={'Back'}
              buttonSize="small"
              onButtonPress={() => onBackButton()}
              disabled={
                playerState === 'playing' || playerState === 'RECORDING'
                  ? true
                  : false
              }
            />
          )}
          <ButtonComponent
            title={onNextButtonText()}
            buttonSize="small"
            onButtonPress={() => handleEndOfQuestions()}
            disabled={
              playerState === 'playing' || playerState === 'RECORDING'
                ? true
                : false
            }
          />
        </View>
      );
    };

    //  If the question is a yes or no
    if (isYesOrNo === true && subQuestionActive === false) {
      return (
        <View style={styles.footerButtonContainer}>
          <ButtonComponent
            title="No"
            buttonSize="small"
            onButtonPress={() => handleOnNo()}
          />
          <ButtonComponent
            title="Yes"
            buttonSize="small"
            onButtonPress={() => handleOnYes()}
          />
        </View>
      )
    } else if (isYesOrNo === false || subQuestionActive === true) {
      return (
        <View style={styles.footerButtonContainer}>
          {questionIndex <= 0 && !subQuestionActive ? (
            <View></View>
          ) : (
            <ButtonComponent
              title={'Back'}
              buttonSize="small"
              onButtonPress={() => onBackButton()}
              disabled={playerState === 'playing' || playerState === 'RECORDING' ? true : false}
            />
          )}
          <ButtonComponent
            title={onNextButtonText()}
            buttonSize="small"
            onButtonPress={() => skipOption ? handleOnSkip () : onNextButton()}
            disabled={
              playerState === 'playing' || playerState === 'RECORDING'
                ? true
                : false
            }
          />
        </View>
      );
    }
  };

  return <>{handleYesOrNoQuestion()}</>;
};

export default StoryButtonsComponent;