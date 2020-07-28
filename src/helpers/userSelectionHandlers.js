import store from './../redux/store';

// Actions
import { saveAllQuestions, incrementQuestionIndex, resetQuestionIndex, saveSubQuestions, setSubQuestionActiveTrue } from './../redux/actions/questionActions';

export const handleYesDecision = (subQuestions) => {

  // Filters the array and sees if there are any yes decision types
  const filteredSubQuestions = subQuestions.filter(
    (subQuestion) => {
      return subQuestion.decisionType == 'YES';
    },
  );

  return filteredSubQuestions;
};

export const handleNoDecision = (subQuestions) => {
  // Filters the array and sees if there are any yes decision types
  const filteredSubQuestions = subQuestions.filter((subQuestion) => {
    return subQuestion.decisionType == 'NO';
  });

  return filteredSubQuestions;
};