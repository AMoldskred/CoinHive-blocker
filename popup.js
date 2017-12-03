chrome.storage.sync.get('stat', function(res){
	for(site in res.stat){
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var span1 = document.createElement("span");
		span1.innerHTML = site;
		var td2 = document.createElement("td");
		var span2 = document.createElement("span");
		span2.innerHTML = res.stat[site];
		td1.appendChild(span1)
		td2.appendChild(span2)
		tr.appendChild(td1)
		tr.appendChild(td2)
		document.getElementById('stats').appendChild(tr)
	}
});
chrome.browserAction.setPopup({
        	popup: ''
        })
document.getElementById('donate').onclick = function(){
	chrome.tabs.create({url:chrome.extension.getURL("donate.html")},function(){})
}
