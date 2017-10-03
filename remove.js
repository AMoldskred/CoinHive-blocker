
function deleteElements(selector) {
    // in case the content script was injected after the page is partially loaded
    doDelete(document.querySelectorAll(selector));

    var mo = new MutationObserver(process);
    mo.observe(document, {subtree:true, childList:true});
    document.addEventListener('DOMContentLoaded', function() { mo.disconnect() });

    function process(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var nodes = mutations[i].addedNodes;
            for (var j = 0; j < nodes.length; j++) {
                var n = nodes[j];
                if (n.nodeType != 1) // only process Node.ELEMENT_NODE
                    continue;
                doDelete(n.matches(selector) ? [n] : n.querySelectorAll(selector));
            }
        }
    }
    function doDelete(nodes) {
        [].forEach.call(nodes, function(node) { node.remove() });
    }
}



chrome.storage.sync.get('block', function(res){
    console.log('Block mining:'+res.block)
    if(res.block){
      console.log('Removed items')
deleteElements('script[src="https://coin-hive.com/lib/coinhive.min.js"]','script[src="coinhive.min.js"]','script[src="https://coinhive.com/lib/coinhive.min.js"]')  
    }else{
        console.log('Did not remove anything')
    }

});
chrome.storage.onChanged.addListener(function(changes, namespace) {
       chrome.storage.sync.get('block', function(res){
            if(res.block){
              
deleteElements('script[src="https://coin-hive.com/lib/coinhive.min.js"]','script[src="coinhive.min.js"]','script[src="https://coinhive.com/lib/coinhive.min.js"]')  

                }

        }); 
      });
