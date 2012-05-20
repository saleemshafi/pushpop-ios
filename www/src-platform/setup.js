$(window).load(function() { 
   document.addEventListener("deviceready", onDeviceReady, false);
   document.addEventListener("touchmove", function(e) { 
											 e.preventDefault(); 
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

