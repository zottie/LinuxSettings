wunderlistgmailActive = true;

console.log("WunderlistGmail extension loading for '" + document.URL + "'...");

chrome.extension.sendMessage({action: "loadConfiguration"}, function (configuration) {
    var ANIMATION_SPEED = 0;
    var CURRENT_WIDTH = configuration.IFRAME_WIDTH || 25;
    var HOVER_WIDTH = configuration.HOVER_WIDTH || "70%";
    var EXPAND_ON_HOVER = configuration.EXPAND_ON_HOVER || false;
    var STARTUP_PAGE = configuration.STARTUP_PAGE || "https://www.wunderlist.com/#/lists/today";
    var gearPath = configuration.gearPath;
    var isVisible = configuration.isVisible;

    var gmailHtml;
    var outerframe;

    var globalPageX = 0;

    var handle = $("<div>", {"class": "wunderDragHandle"});
    var resizingBox = $("<div>", {"class": "wunderResizingBox"});

    try {
        if ((document.URL.match(/mail.google/) && configuration.SHOW_ON_GMAIL && !document.URL.match(/view=(pt|btop|cm|cv)/))
            || (document.URL.match(/calendar/) && configuration.SHOW_ON_CALENDAR && !document.URL.match(/printevent/))) {
            addResizeHandle();
            loadWunderlist();
            addShowHideButton();
            if(!isVisible)
                hideWunderlist();
        }
    }
    catch (error) {
        console.warn("WunderlistGmail extension failed.")
    }



    function addResizeHandle(){
      resizingBox.hide();
      handle.css("right", CURRENT_WIDTH+"%");
      $("html body").append(handle);
      $("html body").append(resizingBox);

      var resizing = false;
      var startPosition = null;
      var baseWidth = null;

      $(document).mousemove(function(e){
        if(resizing){
          if(!startPosition){
            startPosition = e.pageX;
          }
          var diff = (e.pageX || globalPageX) - startPosition;
          var windowWidth = $(document).outerWidth();

          CURRENT_WIDTH = Math.max(baseWidth - 100 * (diff || 0) / windowWidth, 100*100/windowWidth);

          handle.css("right", CURRENT_WIDTH+"%");
          if(baseWidth <= CURRENT_WIDTH){
            resizingBox.css({
              right: baseWidth+"%",
              width: CURRENT_WIDTH-baseWidth+"%"
            });
          } else {
            resizingBox.css({
              right: (CURRENT_WIDTH)+"%",
              width: (baseWidth-CURRENT_WIDTH)+"%"
            });
          }
          //resizeIframe();
        }
      });

      handle.mousedown(function(e){
        resizing = true;
        resizingBox.css("width", 0);
        resizingBox.show();
        baseWidth = CURRENT_WIDTH || 25;
        e.preventDefault();
        $(document).css("cursor", "move");
      });

      $(document).mouseup(function(e){
        if(resizing){
          resizing = false;
          startPosition = null;
          resizingBox.hide();
          e.preventDefault();
          resizeIframe();
          $("body").css("cursor", "auto");

          // Save configuration
          configuration.IFRAME_WIDTH = CURRENT_WIDTH;
          chrome.extension.sendMessage({action: "saveConfiguration", configuration: configuration});
        }
      });
    }

    function addShowHideButton() {
        $("html body").append(
                $("<div>", {"class": "wunderlistgmail"}).append(
                $("<a>", {"class": "onoff", text: "Hide Wunderlist", href: "javascript:void(0)"})
            ).append(
                        $("<a>", {"class": "options", html: "<img src='"+gearPath+"'>", href: "javascript:void(0)"}).append()
            ));

        $(".wunderlistgmail .onoff").click(function () {
            toggleIFrame();
        });

        $(".wunderlistgmail .options").click(function(){
            chrome.extension.sendMessage({action:"openOptions"}, function (response) {});
        });
    }

    function loadWunderlist() {
        gmailHtml = $("html");
        wunderlistgmailActive = true;

        outerframe = $("#wunderframe");

        if (outerframe.length == 0) {
            outerframe = $("<div>", {id: 'wunderframe'});
            var iframe = $("<iframe>", {src: STARTUP_PAGE, id: 'iframewunder', name: 'iframewunder'});
            outerframe.append(iframe);

            resizeIframe();

            $("html body").prepend(outerframe);

            var collapseIframe = function () {
                if (EXPAND_ON_HOVER) {
                    alreadyInside = false;
                    outerframe.stop(true, false);
                    outerframe.animate({"width": CURRENT_WIDTH + "%"}, 0);
                }
            };

            gmailHtml.mouseenter(collapseIframe);
            outerframe.mouseout(collapseIframe);
        }
        else {
            resizeIframe();
            outerframe.toggleClass("oculto", false);
        }
        handle.show();
        $(".wunderlistgmail .onoff").text("Hide Wunderlist");
        chrome.extension.sendMessage({action:"visibleChange", e: true}, function (response) {});
    }

    function resizeIframe(){
      var IFRAME_WIDTH = CURRENT_WIDTH + "%";
      var GMAIL_WIDTH = (100 - CURRENT_WIDTH) + "%";

      gmailHtml.css({"width": GMAIL_WIDTH});
      outerframe.css({"width": IFRAME_WIDTH});
    }

    function hideWunderlist() {
        wunderlistgmailActive = false;

        var gmailHtml = $("html");
        var iframe = $("#wunderframe");


        gmailHtml.css({"width": "100%"});
        iframe.toggleClass("oculto", true);
        handle.hide();

        $(".wunderlistgmail .onoff").text("Show Wunderlist");

        chrome.extension.sendMessage({action:"visibleChange", e: false}, function (response) {});
    }

    alreadyInside = false;

    function toggleIFrame() {
        alreadyInside = false;
        if (wunderlistgmailActive)
            hideWunderlist();
        else
            loadWunderlist();
    }

    chrome.extension.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.action == "mousemove"){
              var iframe = $("#wunderframe");
              if(EXPAND_ON_HOVER) {
                if (wunderlistgmailActive) {
                    if (!alreadyInside && request.e.pageX > 50 && HOVER_WIDTH > CURRENT_WIDTH) {
                        alreadyInside = true;
                        iframe.stop(true, false);
                        iframe.animate({"width": HOVER_WIDTH}, ANIMATION_SPEED);

                    }
                }
              }
              globalPageX = request.e.pageX + iframe.position().left;
              $(document).trigger('mousemove');

            } else if (request.action == "mouseup"){
              $(document).mouseup();
            }
        });

    console.log("WunderlistGmail Iframe finished loading.");
});

