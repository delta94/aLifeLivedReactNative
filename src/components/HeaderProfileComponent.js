import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';

// Components
import AvatarComponent from './AvatarComponent';
import ButtonComponent from './ButtonComponent';
import IconComponent from './IconComponent';

// Styles
import styles from './../styles/components/HeaderProfileComponent';
import { COLOR, ICON_SIZE } from './../styles/styleHelpers';

const HeaderProfileComponent = ({ userReducer, route, navigation, navigation: { setParams }}) => {

  // When the user firsts logs in it sets the params. Also allows use to reuse this screen for user profiles
  useEffect(() => {
    setParams(userReducer)
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarAndTextContainer}>
        <AvatarComponent 
          isRounded={false}
          isSquare
          showEditButton={false}
          size="large"
          source={route.params.avatarURL}
        />
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>{route.params.firstName}</Text>
          <Text style={styles.subText}>{route.params.username}</Text>
        </View>
      </View>


      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <ButtonComponent
            icon={
              <IconComponent
                name="user-edit"
                type="font-awesome-5"
                size={15}
                color="white"
              />
            }
            onButtonPress={() => console.log("MAX")}
            buttonSize="small"
          />
        </View>

        <View style={styles.button}>
          <ButtonComponent
            icon={
              <IconComponent
                name="cog"
                type="font-awesome-5"
                size={15}
                color="white"
              />
            }
            onButtonPress={() => navigation.navigate("Settings")}
            buttonSize="small"
          />
        </View>
      </View>
    </View>    
  )
};

function mapStateToProps(state) {
  return {
    userReducer: state.userReducer,
  }
};

export default connect(mapStateToProps)(HeaderProfileComponent);