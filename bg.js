
var previousCpuInfo;
var highload = 0;
var number= 0;

function CpuUsage() {
    totaluse = 0;
  chrome.system.cpu.getInfo(function(cpuInfo) {
    for (var i = 0; i < cpuInfo.numOfProcessors; i++) {
        var usage = cpuInfo.processors[i].usage;
        var usedSectionWidth = 0;
      if (previousCpuInfo) {
        var oldUsage = previousCpuInfo.processors[i].usage;
        usedSectionWidth = Math.floor((usage.kernel + usage.user - oldUsage.kernel - oldUsage.user) / (usage.total - oldUsage.total) * 100);
        totaluse += usedSectionWidth;
      } else {
        usedSectionWidth = Math.floor((usage.kernel + usage.user) / usage.total * 100);
      }
    }
    previousCpuInfo = cpuInfo;
    totaluse = totaluse/cpuInfo.numOfProcessors;
    console.log('%c CPU USAGE: '+totaluse+'% ', 'background:#b7b7b7; color: red')
    if(totaluse > 50){
        highload++
        console.log('Countdown to CPU-alert: '+highload+'/30')
    }else{
        highload = 0;
    }
    if(highload === 30){
        chrome.storage.sync.get('notification', function(res){
            if(res.notification == true || res.notification == 'undefined'){
                fetch('https://raw.githubusercontent.com/andreas0607/CoinHive-blocker/master/ignore.json').then(function(response) {
                    response.json().then(function(ignore) {
                        var opt = {
                            type: "basic",
                            title: 'High CPU-usage detected',
                            message: 'Please click this notification so that we can look into it',
                            priority: 1,
                            'requireInteraction': true,
                            iconUrl: 'chrome-extension://ccagdbjcbhmcdcbbknfebhhdbolnfimo/128logo.png'
                        };
                        chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs){
                                var site = tabs[0].url;
                                chrome.notifications.clear("HIGHCPU")
                                console.log(ignore.length)
                            for(var i=0; i<ignore.length; i++){
                                if(site.indexOf(ignore[i]) !== -1){
                                        console.log('Cleared')
                                        break;
                                }else if(i == (ignore.length - 1)){
                                    chrome.notifications.create('HIGHCPU', opt);
                                    chrome.notifications.onClicked.addListener(function(res){
                                        if(res == "HIGHCPU"){
                                            chrome.notifications.clear('HIGHCPU')
                                                console.log('Reported: '+site)
                                                var xhr = new XMLHttpRequest();
                                                xhr.open('POST', 'https://docs.google.com/forms/d/1cB1urxRqau67pWoN5s1oSfUyi9t0G5T3dMT_txc-o3Q/formResponse', true);
                                                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                                var data = 'entry.2146017821='+site;
                                                xhr.send(data);
                                        }
                                    })
                                }
                            }
                        })
                    })
                }) 
            }  
        }); 
    }
  });
}
CpuUsage()
setInterval(function(){
    CpuUsage()
},10000)
function block(blacklist) {
    console.log('Ready to block')
        chrome.storage.sync.get('block', function(res){
            if(res.block){
                chrome.webRequest.onBeforeRequest.addListener(
                callback, { 
                    urls : blacklist}, ["blocking"]);
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
                        callback,{ 
                            urls : blacklist}, ["blocking"]);
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
    }

chrome.storage.onChanged.addListener(function(ress){
    if(ress.stat){
        number++;
        if(number == 10){
            chrome.storage.sync.get('feedback', function(res){
                console.log(res.feedback)
            if(res.feedback == null || res.feedback == 'undefined'){
                var inf = {
                type: "basic",
                title: 'Enjoy miner-free browsing?',
                message: 'Please consider leaving some feedback on our extension. Enjoy your mining-free browsing🎉',
                priority: 1,
                'requireInteraction': true,
                iconUrl: 'chrome-extension://ccagdbjcbhmcdcbbknfebhhdbolnfimo/128logo.png'
                };

                chrome.notifications.create('review', inf);
                chrome.notifications.onClicked.addListener(function(res){
                    if(res == "review"){
                        chrome.notifications.clear("review")
                        chrome.tabs.create({ url: 'https://chrome.google.com/webstore/detail/coin-hive-blocker/ccagdbjcbhmcdcbbknfebhhdbolnfimo/reviews' });
                    }
                    chrome.storage.sync.set({'feedback': true})
                })
            }else{
                console.log("Already prompted")
            }
            }); 
        }
    }
})

function start(){
    fetch('https://raw.githubusercontent.com/andreas0607/CoinHive-blocker/master/blacklist.json').then(function(response) {
        console.log(response.ok)
        if(!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json()
    }).then(block).catch(function(error) {
            console.log(error.message)
            //Retry in 10 sec
            console.log('Fetching local')
            fetch('blacklist.json').then(function(response) {
                return response.json()
            }).then(block)
        })
    
}


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
})
start()
