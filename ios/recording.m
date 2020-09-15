//
//  recording.m
//  aLifeLived
//
//  Created by Max Kelly on 15/7/20.
//

// #import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_REMAP_MODULE(RNRecording, recording, NSObject)
  RCT_EXTERN_METHOD(startRecording: (RCTResponseSenderBlock)callback)
@end