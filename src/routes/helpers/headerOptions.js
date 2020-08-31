import React from 'react';

// Styles
import { COLOR, FONT_SIZE } from './../../styles/styleHelpers';

// Component
import HeaderDefaultComponent from '../../components/HeaderDefaultComponent';
import HeaderProfileComponent from '../../components/HeaderProfileComponent';


// DEFAULT HEADER
export const DEFAULT_HEADER_OPTION = (props) => ({
  title: "A Life Lived",
  headerTitleAlign: 'left',
  headerRight: () => (
    <HeaderDefaultComponent {...props} />
  ),
  headerStyle: {
    backgroundColor: COLOR.limeGreen,
    shadowOffset: { height: 0 },
  },
  headerTitleStyle: {
    color: COLOR.grey,
    fontSize: FONT_SIZE.largeSize,
  },
  headerStatusBarHeight: 60,
  cardStyle: { backgroundColor: COLOR.limeGreen }
});

// STORY CREATE HEADER
export const CREATE_STORY_HEADER = () => ({
  headerTitleAlign: 'left',
  headerStyle: {
    backgroundColor: COLOR.limeGreen,
    shadowOffset: { height: 0 },
  },
  headerTitleStyle: {
    color: COLOR.grey,
    fontSize: FONT_SIZE.largeSize,
  },
  headerStatusBarHeight: 80,
  cardStyle: { backgroundColor: COLOR.limeGreen }
});

export const PROFILE_HEADER = (props) => ({
  headerTitleAlign: 'left',
    headerStyle: {
    backgroundColor: COLOR.limeGreen,
      shadowOffset: { height: 0 },
    height: 200
  },
  cardStyle: { backgroundColor: COLOR.limeGreen },
  headerTitle: () => <HeaderProfileComponent {...props} />
})

