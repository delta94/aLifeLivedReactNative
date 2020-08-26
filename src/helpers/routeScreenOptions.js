import React from 'react';

// Icon
import IconComponent from './../components/IconComponent';

// Styles
import {COLOR, ICON_SIZE} from './../styles/styleHelpers';

// The below sets the icon for drawer
export function screenOptions(route) {
  const screenOptions = {
    tabBarIcon: ({focused}) => {
      switch (route.name) {
        case 'Home':
          return (
            <IconComponent
              name="home"
              type="font-awesome-5"
              size={ICON_SIZE.iconSizeMedium}
              color={focused ? COLOR.limeGreen : COLOR.grey}
            />
          );
        case 'Notifications':
          return (
            <IconComponent
              name="bell"
              type="font-awesome-5"
              solid={true}
              size={ICON_SIZE.iconSizeMedium}
              color={focused ? COLOR.limeGreen : COLOR.grey}
            />
          );
        case 'Create Story':
          return (
            <IconComponent
              name="microphone"
              type="font-awesome-5"
              size={ICON_SIZE.iconSizeMedium}
              color={focused ? COLOR.limeGreen : COLOR.grey}
            />
          );
        case 'Search':
          return (
            <IconComponent
              name="search"
              type="font-awesome-5"
              size={ICON_SIZE.iconSizeMedium}
              color={focused ? COLOR.limeGreen : COLOR.grey}
            />
          );
        case 'Profile':
          return (
            <IconComponent
              name="user"
              solid={true}
              type="font-awesome-5"
              size={ICON_SIZE.iconSizeMedium}
              color={focused ? COLOR.limeGreen : COLOR.grey}
            />
          );
        case 'SignUp':
          const tabBarVisible = false;
          return tabBarVisible;
        default:
          break;
      }
    },
  };

  return screenOptions;
};
