
    var callback = function deny(block) {
    	return {cancel: true}; 
	};

chrome.storage.sync.get('block', function(res){
	if(res.block){
		chrome.webRequest.onBeforeRequest.addListener(
	    callback, { 
	    	urls : ["*://*.coin-hive.com/*","*://*.jsecoin.com/*","*://*.coinhive.com/*"]  
	    }, ["blocking"]);
		chrome.browserAction.setBadgeText({text:'On'})		
			}else if(res.block == false){
				chrome.browserAction.setBadgeText({text:'Off'});
				chrome.webRequest.onBeforeRequest.removeListener(callback);
			}else if(res.block == null){
				chrome.browserAction.setBadgeText({text:'Off'});
			}

});
chrome.storage.onChanged.addListener(function(changes, namespace) {
       chrome.storage.sync.get('block', function(res){
			if(res.block){
		chrome.webRequest.onBeforeRequest.addListener(
	    callback, { 
	    	urls : ["*://*.coin-hive.com/*","*://*.jsecoin.com/*","*://*.coinhive.com/*"]  
	    }, ["blocking"]);
		chrome.browserAction.setBadgeText({text:'On'})		
			}else if(res.block == false){
				
				chrome.webRequest.onBeforeRequest.removeListener(callback);
			chrome.browserAction.setBadgeText({text:'Off'});
			}

		}); 
      });
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.browserAction.getBadgeText({}, function(result) {
    if(result == 'On'){
		chrome.storage.sync.set({'block': false}, function() {
		console.log('Turn Off');
		});
	}else{
		chrome.storage.sync.set({'block': true}, function() {
		console.log('Turn On');
        });
	}
	});
	
	
});
if(chrome.webRequest.onBeforeRequest.hasListener(callback)){
  console.log('Listning')
}