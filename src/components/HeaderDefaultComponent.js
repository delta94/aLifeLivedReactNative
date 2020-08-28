import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import { connect } from 'react-redux';

// Component
import IconComponent from './IconComponent';

// Styles
import {ICON_SIZE, COLOR} from '../styles/styleHelpers';

const HeaderDefaultComponent = (props) => {

  const handleNotLoggedIn = () => {
    if (!props.userReducer.id) {
      return props.navigate('authNavigator', {
        screen: 'authStack',
        params: {
          screen: 'Login'
        }
      })
    } else {
      return props.navigate('Profile')
    }
  }
  return (
    <View style={{margin: 10, marginBottom: 20}}>
      <TouchableOpacity onPress={() => handleNotLoggedIn()}>
        <IconComponent
          name="user"
          type="font-awesome-5"
          color={COLOR.grey}
          size={ICON_SIZE.iconSizeXSmall}
          color={COLOR.white}
          reverse={true}
          reverseColor={COLOR.grey}
          raised={false}
        />
      </TouchableOpacity>
    </View>
  )
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
  }
};


export default connect(mapStateToProps)(HeaderDefaultComponent);