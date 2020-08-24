import React from 'react';
import {View, Text} from 'react-native';

// Components
import AvatarComponent from './AvatarComponent';
import ButtonComponent from './ButtonComponent';
import IconComponent from './IconComponent';

// Styles
import styles from './../styles/components/HeaderProfileComponent';

export function HeaderProfileComponent({route}) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarAndTextContainer}>
        <AvatarComponent 
          isRounded={false}
          isSquare
          showEditButton={false}
          size="medium"
          source={""}
        />
        <View style={styles.textContainer}>
          <Text>{route.params.user}</Text>
          <Text>Username</Text>
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
            buttonSize="small"
          />
        </View>

      </View>

    </View>    
  )
};