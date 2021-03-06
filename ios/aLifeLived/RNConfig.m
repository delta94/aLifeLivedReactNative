//
//  RNConfig.m
//  aLifeLived
//
//  Created by Max Kelly on 1/9/20.
//

#import "RNConfig.h"

@implementation RNConfig
  RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
  #if DEV
    NSString *env = @"dev";
    NSString *baseUrl = @"http://192.168.1.47:8080";
    NSString *audioBaseUrl =@"http://192.168.1.47:4000";
  #elif BETA
    NSString *env = @"beta";
    NSString *baseUrl = @"https://a-life-lived-staging.herokuapp.com";
    NSString *audioBaseUrl = @"https://a-life-lived-audio-server-stag.herokuapp.com";
  #else
    NSString *env = @"prod";
    NSString *baseUrl = @"https://a-life-lived-live.herokuapp.com";
    NSString *audioBaseUrl = @"https://a-life-lived-audio-server-live.herokuapp.com";
  #endif
  return @{ @"env": env, @"baseUrl": baseUrl, @"audioUrl": audioBaseUrl};
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

@end
