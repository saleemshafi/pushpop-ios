//
//  AudioPlugin.m
//  pushpop
//
//  Created by Asha D Patel on 7/18/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "AudioPlugin.h"

@implementation AudioPlugin

- (void) play:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
    //get the callback id
    NSString *sound = [arguments pop];
    
    CFBundleRef mainBundle = CFBundleGetMainBundle();
    CFURLRef soundFileUrlRef = CFBundleCopyResourceURL(mainBundle, (CFStringRef)sound, CFSTR("mp3"), NULL);
    UInt32 soundId;
    AudioServicesCreateSystemSoundID(soundFileUrlRef, &soundId);
    AudioServicesPlaySystemSound(soundId);

}

@end
