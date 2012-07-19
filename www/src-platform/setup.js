window.pushPopUi.downloadPremium = function() {
    window.open("http://itunes.apple.com/us/app/ocarina/id293053479?mt=8");
}

$(window).load(function() { 
   document.addEventListener("deviceready", onDeviceReady, false);
   document.getElementById("puzzle").addEventListener("touchmove", function(e) { 
                                                      if (e.currentTarget.className != "help-text") {
                                                        e.preventDefault(); 
                                                      }
											 }, false);
});


/* When this function is called, Cordova has been initialized and is ready to roll */
/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
 see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
 for more details -jm */
function onDeviceReady()
{
	if (window.plugins && window.plugins.iAdPlugin) {
		// listen for orientation changes
		window.addEventListener("orientationchange", onOrientationChange, false);
		// listen for the "iAdBannerViewDidLoadAdEvent" that is sent by the iAdPlugin
		document.addEventListener("iAdBannerViewDidLoadAdEvent", iAdBannerViewDidLoadAdEventHandler, false);
		// listen for the "iAdBannerViewDidFailToReceiveAdWithErrorEvent" that is sent by the iAdPlugin
		document.addEventListener("iAdBannerViewDidFailToReceiveAdWithErrorEvent", iAdBannerViewDidFailToReceiveAdWithErrorEventHandler, false);
		
		setTimeout(function() {
				   window.plugins.iAdPlugin.prepare(true); // by default, ad is at Top
				   window.plugins.iAdPlugin.orientationChanged(true);//trigger immediately so iAd knows its orientation on first load
				   window.plugins.iAdPlugin.showAd(true);
				   }, 1000);
	}
}


var gTimerId = null;

function onOrientationChange()
{
	window.plugins.iAdPlugin.orientationChanged(true);
}

function iAdBannerViewDidFailToReceiveAdWithErrorEventHandler(evt)
{
	window.plugins.iAdPlugin.showAd(false);
}

function iAdBannerViewDidLoadAdEventHandler(evt)
{
	window.plugins.iAdPlugin.showAd(true);
	if (gTimerId) {
		clearInterval(gTimerId);
	}
	gTimerId = setInterval(function() { window.plugins.iAdPlugin.showAd(true); } , 1000);
}










/*     
 
 Cordova v1.5.0 Support added 2012 @RandyMcMillan
 README.md for install notes
 
 Cordova v1.6.0 Support added @shazron
 */

// /////////////////////////
(function() {
 // /////////////////////////
 
 // get local ref to global PhoneGap/Cordova/cordova object for exec function
 var cordovaRef = window.PhoneGap || window.Cordova || window.cordova; // old to new fallbacks
 
/**
 * Constructor
 */
 function AudioPlugin()
 {
 }
 
/**
 * show - true to show the ad, false to hide the ad
 */
 AudioPlugin.prototype.play = function(sound)
 {
    cordovaRef.exec("AudioPlugin.play", sound);
 }
 
/**
 * Install function
 */
 AudioPlugin.install = function()
 {
 if ( !window.plugins ) {
 window.plugins = {};
 } 
 if ( !window.plugins.AudioPlugin ) {
 window.plugins.AudioPlugin = new AudioPlugin();
 }
 }
 
 console.log("just checking");
/**
 * Add to Cordova constructor
 */
 if (cordovaRef && cordovaRef.addConstructor) {
    cordovaRef.addConstructor(AudioPlugin.install);
 } else {
 console.log("AudioPlugin could not be installed.");
 return null;
 }
 
 
 // /////////////////////////
 })();
// /////////////////////////

PushPopUI.prototype.playSound = function(soundName) {
    if (this.sound) {
        window.plugins.AudioPlugin.play(soundName);
    }
};
