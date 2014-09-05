var default_configuration = {
  IFRAME_WIDTH:25,
  STARTUP_PAGE:"https://www.wunderlist.com/#/lists/all",
  EXPAND_ON_HOVER:false,
  SHOW_ON_GMAIL: true,
  SHOW_ON_CALENDAR: true
};

if(!localStorage["configuration"]){
  localStorage["configuration"] = JSON.stringify(default_configuration);
}

if(!localStorage["isVisible"]){
    localStorage["isVisible"] = JSON.stringify(true);
}

chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.action == "loadConfiguration") {
        var res = JSON.parse(localStorage["configuration"]);
        res.gearPath = chrome.extension.getURL('gear.png');
        res.isVisible =  JSON.parse(localStorage["isVisible"]);
        sendResponse(res);
    }else if (request.action == "saveConfiguration") {
      localStorage["configuration"] = JSON.stringify(request.configuration);
    } else if (request.action == "openOptions"){
        openOptions();
    } else if (request.action == "visibleChange"){
        localStorage["isVisible"] = JSON.stringify(request.e);
    }
    else {
      chrome.tabs.sendMessage(sender.tab.id, request, function (response) {
        console.log(response);
      });
    }
  }
);

// Show options page on install and update

function onInstall() {
  openOptions();
}

function onUpdate() {
  localStorage["firstOpenAfterUpdate"] = "yes";
  openOptions();
}

function getVersion() {
  var details = chrome.app.getDetails();
  return details.version;
}

// Check if the version has changed.
var currVersion = getVersion();
var prevVersion = localStorage['version'];

if (currVersion != prevVersion) {
  // Check if we just installed this extension.
  if (typeof prevVersion == 'undefined') {
    onInstall();
  } else {
    // Discard build number (e.g. 0.50.3 -> 0.50)
    var majorOldVersion = prevVersion.split(".").slice(0,2).join(".");
    var majorNewVersion = currVersion.split(".").slice(0,2).join(".");

    if(majorOldVersion != majorNewVersion){
      onUpdate();
    }
  }
  localStorage['version'] = currVersion;
}

function openOptions() {
  var id = chrome.i18n.getMessage("@@extension_id") + "/options.html";

  chrome.tabs.getAllInWindow(undefined, function (tabs) {
    for (var i = 0, tab; tab = tabs[ i ]; i++) {
      if (tab.url && tab.url.indexOf(id) != -1) {
        chrome.tabs.update(tab.id, {selected:true});
        return;
      }
    }

    chrome.tabs.create({'url':chrome.extension.getURL('options.html') },
      function (tab) {
      }
    );
  });
}

