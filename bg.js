/*
    var callback = function deny(block) {

    	return {cancel: true}; 
	};

*/
var callback = function deny(block) {
    		chrome.storage.sync.get('stat', function(res){
    			if(res.stat === undefined){var obj = {}
    				chrome.storage.sync.set({'stat': obj}, function() {});
    			}else{
    				var obj = res.stat;
    				chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs){
				    	console.log(tabs[0].url)
				    	var site = tabs[0].url;
				    	if(!(site in obj)){
						var l = site;
						obj[l] = 1;
				    	 chrome.storage.sync.set({'stat': obj}, function() {});
				  					
					    }else{
					    	var l = site;
					    	obj[l] = obj[l] + 1;
					    	chrome.storage.sync.set({'stat': obj}, function() {});	
					    }
					});		
    			}
  	});
    		return {cancel: true}; 
		}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.storage.sync.get('stat', function(res){
  		var obj = res.stat
  		if(res.stat === null){
  			chrome.storage.sync.set({'stat': {}}, function() {});
  		}else{
			if(!(request.site in obj)){
				var l = request.site;
				obj[l] = 1;
		    	 chrome.storage.sync.set({'stat': obj}, function() {});
		  					
		    }else{
		    	var l = request.site;
		    	obj[l] = obj[l] + 1;
		    	chrome.storage.sync.set({'stat': obj}, function() {});	
		    }
  		}
		
  	});
  	
   
});


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
		chrome.browserAction.setBadgeText({text:'Stats'});
		chrome.browserAction.setPopup({
        	popup: 'popup.html'
        })
	}else if(result == 'Stats'){
		chrome.storage.sync.set({'block': false}, function() {
		console.log('Turn Off');
		chrome.browserAction.setPopup({
        	popup: ''
        })
		});
		
	}else if(result == 'Off'){
		chrome.storage.sync.set({'block': true}, function() {
		console.log('Turn On');
		chrome.browserAction.setPopup({
        	popup: ''
        })
        });
        
	}
	});
	
	
});
if(chrome.webRequest.onBeforeRequest.hasListener(callback)){
  console.log('Listning')
}
chrome.runtime.onInstalled.addListener(function (){
    chrome.tabs.create({url:chrome.extension.getURL("donate.html")},function(){})
})
