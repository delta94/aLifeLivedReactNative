import React from 'react';
import {View} from 'react-native';

// Components 
import ButtonComponent from './ButtonComponent';

// Styles
import styles from '../styles/components/YesOrNoQuestionComponent';

const StoryButtonsComponent = ({questionIndex, questions, isLoading, playerState, skipOption, onNextButton, setQuestionIndex, isYesOrNo}) => {

  // The below handles what text will display on the button
  const onNextButtonText = () => {
    if (questionIndex === questions.length - 1) {
      return "Finish"
    } else if (skipOption) {
      return "Skip"
    } else {
      return "Next"
    }
  };

  // The Below handles what buttons display. 
  const handleYesOrNoQuestion = () => {
    switch (isYesOrNo) {
      case true:
        return (
          <View style={styles.footerButtonContainer}>
            <ButtonComponent
              title="No"
              buttonSize="small"
              onButtonPress={() => console.log('NO')}
            />
            <ButtonComponent
              title="Yes"
              buttonSize="small"
              onButtonPress={() => onNextButton()}
            />
          </View>
        );
      case false:
        return (
          <View style={styles.footerButtonContainer}> 
            {questionIndex <= 0 ? (
              <View></View>
            ) : (
              <ButtonComponent
                title={'Back'}
                buttonSize="small"
                onButtonPress={() => setQuestionIndex()}
                disabled={playerState === 'playing' || playerState === 'RECORDING' ? true : false}
              />
            )}
            <ButtonComponent
              title={onNextButtonText()}
              buttonSize="small"
              onButtonPress={() => onNextButton()}
              disabled={playerState === 'playing' || playerState === 'RECORDING' ? true : false}
              isLoading={isLoading}
            />
          </View>
        );
      default:
        break;
    }
  };

  return (
    <>
     {handleYesOrNoQuestion()}
    </>
  );
};

export default StoryButtonsComponent;