# Packages
- Audio Player: https://github.com/react-native-kit/react-native-track-player 
- Audio Recording: https://github.com/dooboolab/react-native-audio-recorder-player 

# Bug list fix
- Below is some bugs I have faced and how to fix them. 
### iOS
  - When build on xCode you might face a font duplicate commands. The best way to fix this is go to 1. Build Phase 2. Copy bundle resources 3. If there are tff file there remove them and rerun. 