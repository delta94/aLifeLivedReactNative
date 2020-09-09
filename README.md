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
    - `RCTBridge required dispatch_sync to load RCTDevLoadingView. This may lead to deadlocks`
      - https://stackoverflow.com/questions/62790300/rctbridge-require-dispatch-sync-to-load-rctdevloadingview - This helped by going into xCode, AppDelegate.m and adding the code.
    - If you encounter the following error `Use of undeclared identifier 'FlipperClient'` or `Use of undeclared identifier 'Client'` 
      - Paste this code into Pod File - https://www.gitmemory.com/issue/facebook/react-native/28406/604792832 - NOTE: This may lead to another build error.
      ```
        # Post Install processing for Flipper
        def flipper_post_install(installer)
          installer.pods_project.targets.each do |target|
            if target.name == 'YogaKit'
              target.build_configurations.each do |config|
                config.build_settings['SWIFT_VERSION'] = '4.1'
              end
            end
          end
          file_name = Dir.glob("*.xcodeproj")[0]
          app_project = Xcodeproj::Project.open(file_name)
          app_project.native_targets.each do |target|
            target.build_configurations.each do |config|
              cflags = config.build_settings['OTHER_CFLAGS'] || '$(inherited) '
              unless cflags.include? '-DFB_SONARKIT_ENABLED=1'
                puts 'Adding -DFB_SONARKIT_ENABLED=1 in OTHER_CFLAGS...'
                cflags << '-DFB_SONARKIT_ENABLED=1'
              end
              config.build_settings['OTHER_CFLAGS'] = cflags
            end
            app_project.save
          end
          installer.pods_project.save
        end
      ```


# Recording Screen Functionality

- Currently the recording screen has two 'paths' of questions. 
  1. Master Questions - This can be either a yes or no question or a recording. 
  2. Sub Questions - Currently at for MVP this can only be a recording question.
- Some key notes to keep in mind when building out recording screen
  1. Ensure that `initialiseStream` is only called once per question.