import React from 'react';

// Styles
import { COLOR, FONT_SIZE } from './../../styles/styleHelpers';

// Component
import HeaderDefaultComponent from '../../components/HeaderDefaultComponent';

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


