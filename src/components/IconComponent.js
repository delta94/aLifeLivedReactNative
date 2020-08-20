import React from 'react';
import {Icon} from 'react-native-elements';
 

export default IconComponent = ({name, type, size, style, color, solid, disabledStyle}) => {
  
  return (
    <Icon
      name={name}
      type={type}
      size={size}
      style={style}
      color={color}
      solid={solid}
      disabledStyle={disabledStyle}
    />
  );
};