# Packages
- Audio Player: https://github.com/react-native-kit/react-native-track-player 
- Audio Recording: https://github.com/dooboolab/react-native-audio-recorder-player 

# How to run project
- Step 1: `npm i`
- Step 2: `cd ios` & `pod install`
- Step 3: 

# Bug list fix
- Below is some bugs I have faced and how to fix them. 
  ### iOS
    - When build on xCode you might face a font duplicate commands. The best way to fix this is go to 1. Build Phase 2. Copy bundle resources 3. If there are tff file there remove them and rerun. 
    - `Found Xcode project TestProject.xcodeproj
      xcrun: error: unable to find utility "instruments", not a developer   
      tool or in PATHCommand failed: xcrun instruments -s
      xcrun: error: unable to find utility "instruments", not a developer 
      tool or in PATH` - If you encounter this issue on the build process try - https://medium.com/@randerson112358/setup-react-native-environment-for-ios-97bf7faadf77


# Recording Screen Functionality

- Currently the recording screen has two 'paths' of questions. 
  1. Master Questions - This can be either a yes or no question or a recording. 
  2. Sub Questions - Currently at for MVP this can only be a recording question.
- Some key notes to keep in mind when building out recording screen
  1. Ensure that `initialiseStream` is only called once per question.