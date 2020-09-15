import React from 'react';
import {Icon} from 'react-native-elements';
 

export default IconComponent = ({name, type, size, style, color, solid, disabledStyle, reverse, raised, reverseColor, onPress, disabled}) => {
  
  return (
    <Icon
      onPress={onPress}
      disabled={disabled}
      name={name}
      type={type}
      size={size}
      style={style}
      color={color}
      solid={solid}
      disabledStyle={disabledStyle}
      reverse={reverse ? reverse : false}
      raised={raised}
      reverseColor={reverseColor}
    />
  );
};