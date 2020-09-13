import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';

// Components
import AvatarComponent from './AvatarComponent';
import IconComponent from './IconComponent';

// Styles
import styles from './../styles/components/HeaderProfileComponent';
import { COLOR, ICON_SIZE } from './../styles/styleHelpers';

const HeaderProfileComponent = ({route, navigation, userReducer}) => {
  // The below handles the display. If there is no params then it will display the user reducer as it assumes that its the own user viewing, else if there is params it assumes the user is viewing another profile.
  const userData = route.params ? route.params : userReducer;
  console.log(userData);
  return (
    <View style={styles.container}>
      <View style={styles.avatarAndTextContainer}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <AvatarComponent
            isRounded={false}
            isSquare
            showEditButton={false}
            size="large"
            source={userData.avatarURL}
          />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>{userData.firstName} {userData.lastName}</Text>
            <Text style={styles.subText}>{userData.username}</Text>
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