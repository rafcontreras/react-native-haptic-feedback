
#import "RNReactNativeHapticFeedback.h"
#import <UIKit/UIKit.h>
#import <sys/utsname.h>
#import "DeviceUtils.h"
#import <AudioToolbox/AudioToolbox.h>
#import <AudioToolbox/AudioServices.h>

@implementation RNReactNativeHapticFeedback
@synthesize bridge = _bridge;

- (void)setBridge:(RCTBridge *)bridge
{
    _bridge = bridge;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
    return @{ @"isHapticFeedbackAvailable": [NSNumber numberWithBool:[self supportsHaptic]] };
}

RCT_EXPORT_METHOD(
    trigger: (NSDictionary*)options
    resolver:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject)
{
    if ([self supportsHaptic]) {
        NSString* type = options[@"type"];
        
        if ([type isEqual: @"impactLight"]) {
            [self generateImpactFeedback:UIImpactFeedbackStyleLight];
        } else if ([type isEqual:@"impactMedium"]) {
            [self generateImpactFeedback:UIImpactFeedbackStyleMedium];
        } else if ([type isEqual:@"impactHeavy"]) {
            [self generateImpactFeedback:UIImpactFeedbackStyleHeavy];
        } else if ([type isEqual:@"notificationSuccess"]) {
            [self generateNotificationFeedback:UINotificationFeedbackTypeSuccess];
        } else if ([type isEqual:@"notificationWarning"]) {
            [self generateNotificationFeedback:UINotificationFeedbackTypeWarning];
        } else if ([type isEqual:@"notificationError"]) {
            [self generateNotificationFeedback:UINotificationFeedbackTypeError];
        } else {
            [self generateSelectionFeedback];
        }
        
        resolve(nil);
        
    } else if (options[@"enableVibrateFallback"]) {
        AudioServicesPlaySystemSound(kSystemSoundID_Vibrate);
        resolve(@"fallback");
    } else {
        reject(@"not_available", @"Haptic feedback is not available", nil);
    }
}

-(Boolean)supportsHaptic {
    return [[UIDevice currentDevice] systemVersion].floatValue >= 10.0 && [DeviceUtils deviceVersion:@"iPhone"] > 7;
}

-(void)generateSelectionFeedback{
    UISelectionFeedbackGenerator *generator = [[UISelectionFeedbackGenerator alloc] init];
    [generator prepare];
    [generator selectionChanged];
    generator = nil;
}

-(void)generateImpactFeedback:(UIImpactFeedbackStyle)style{
    UIImpactFeedbackGenerator *generator = [[UIImpactFeedbackGenerator alloc] initWithStyle:style];
    [generator prepare];
    [generator impactOccurred];
    generator = nil;
}

-(void)generateNotificationFeedback:(UINotificationFeedbackType)notificationType{
    UINotificationFeedbackGenerator *generator = [[UINotificationFeedbackGenerator alloc] init];
    [generator prepare];
    [generator notificationOccurred:notificationType];
    generator = nil;
}


@end
