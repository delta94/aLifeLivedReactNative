import store from './../redux/store';

// Actions
import { saveAllQuestions, incrementQuestionIndex, resetQuestionIndex, saveSubQuestions, setSubQuestionActiveTrue } from './../redux/actions/questionActions';

export const handleYesDecision = () => {

  // console.log(subQuestions);
  // // Filters the array and sees if there are any yes decision types
  // const filteredSubQuestions = subQuestions.filter(
  //   (subQuestion) => {
  //     return subQuestion.decisionType == 'YES';
  //   },
  // );

  // if (filteredSubQuestions.length <= 0) {
  //   return incrementQuestionIndex();
  // };

  // console.log(store.dispatch(saveSubQuestions(filteredSubQuestions)));
  // return store.dispatch(saveSubQuestions(filteredSubQuestions));
  return "YES"
};

export const handleNoDecision = (subQuestions) => {

  console.log(subQuestions);
  // Filters the array and sees if there are any yes decision types
  const filteredSubQuestions = subQuestions.filter((subQuestion) => {
    return subQuestion.decisionType == 'NO';
  });

  store.dispatch(saveSubQuestions(filteredSubQuestions));
  console.log(store.dispatch(setSubQuestionActiveTrue()))
  // saveSubQuestions(filteredSubQuestions);
};