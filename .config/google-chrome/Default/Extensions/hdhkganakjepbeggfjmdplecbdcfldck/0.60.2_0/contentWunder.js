//if ($("body").attr("class")) {
  console.log("Wunderlist content script loading...");
  try {
    var actualCode = '(' + codeToBeExecutedInsideWunderlist + ')();';
    var script = document.createElement('script');
    script.textContent = actualCode;
    (document.head || document.documentElement).appendChild(script);
    script.parentNode.removeChild(script);

  }
  catch (error) {
    console.warn("WunderlistGmail extension failed.");
  }
  console.log("WunderlistGmail content script finished loading.");

  $("html").mousemove(function (e) {
    chrome.extension.sendMessage({action:"mousemove", e:{pageX:e.pageX, pageY:e.pageY}}, function (response) {
    });
  });

  $("html").mouseup(function (e) {
    chrome.extension.sendMessage({action:"mouseup"}, function (response) {
    });
  });

  // Wunderlist detects it is a frame, causing problems. Fix the problem
  $("body").attr("id", "wunderlist-base");
  $(".external.authentication").attr("target", "_blank")
//}

function codeToBeExecutedInsideWunderlist() {

}