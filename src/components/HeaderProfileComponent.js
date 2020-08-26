import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

// Components
import AvatarComponent from './AvatarComponent';
import IconComponent from './IconComponent';

// Styles
import styles from './../styles/components/HeaderProfileComponent';
import { COLOR, ICON_SIZE } from './../styles/styleHelpers';

const HeaderProfileComponent = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarAndTextContainer}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <AvatarComponent
            isRounded={false}
            isSquare
            showEditButton={false}
            size="large"
            source={route.params.avatarURL}
          />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>{route.params.firstName} {route.params.lastName}</Text>
            <Text style={styles.subText}>{route.params.username}</Text>
          </View>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.touchableOpacityButton}>
            <IconComponent
              name="user-edit"
              type="font-awesome-5"
              size={ICON_SIZE.iconSizeSmall}
              color={COLOR.grey}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacityButton} onPress={() => navigation.navigate('Settings')}>
            <IconComponent
              name="cog"
              type="font-awesome-5"
              size={ICON_SIZE.iconSizeSmall}
              color={COLOR.grey}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
  }
};

export default connect(mapStateToProps)(HeaderProfileComponent);