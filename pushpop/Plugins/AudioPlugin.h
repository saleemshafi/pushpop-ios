//
//  AudioPlugin.h
//  pushpop
//
//  Created by Asha D Patel on 7/18/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#ifdef CORDOVA_FRAMEWORK
#import <Cordova/CDVPlugin.h>
#else
#import "CDVPlugin.h"
#endif
#import <AudioToolbox/AudioToolbox.h>

@interface AudioPlugin : CDVPlugin

- (void) play:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end
