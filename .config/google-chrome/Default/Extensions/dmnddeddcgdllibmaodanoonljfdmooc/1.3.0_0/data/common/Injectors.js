(function (WL) {

  if (window !== window.top || /\.xml$/.test(window.location.pathname)) {

    return;
  }

  if (!WL) {

    window.WL = {};
    WL = window.WL;
  }

  var addString = 'Add to Wunderlist';
  var buttonId = 'addToWunderlistButton';

  function generateGenericButton (className, element) {

    className = className || 'generic-button';
    element = element || '<div/>';

    var $button = $(element).addClass(className)
      .addClass(WL.browser)
      .attr('id', buttonId)
      .text(addString);

    var $icon = $('<span/>').addClass('wunderlist-icon');

    $button.prepend($icon);

    return $button;
  }

  function createGenericButtonBind (source) {

    // create generic button handler
    // prevent event bubbling, form submissions, etc.
    $('#' + buttonId).on('click', function (ev) {

      ev.stopPropagation();
      ev.preventDefault();

      WL.showOverlay({

        'source': source || window.location.host
      });

      return false;
    }).on('submit', function () {

      return false;
    });
  }

  function createGenericIndexButtonBind (element) {

    $('#' + buttonId, element).on('click', function (ev) {

      ev.stopPropagation();
      ev.preventDefault();

      WL.showOverlay({
        'source': window.location.host,
        'scraperTarget': element
      });

      return false;
    })
    .on('submit', function () {

      return false;
    });
  }

  function gmailQuickAdd () {

    var $target = $('[gh=mtb] div div:first');
    var $clone = $target.find('div:first').clone();

    $clone
      .addClass('gmail')
      .attr({
        'id':buttonId,
        'data-tooltip': addString,
        'aria-label': addString,
        'aria-haspopup': addString,
        'act': ''
        })
      .text(addString)
      .prepend('<span class="wunderlist-icon"/>')
      
    $target.append($clone);

    createGenericButtonBind();
  }

  function outlookQuickAdd () {

    var $cloneTarget = $('#Archive').parent();
    var $clone = $cloneTarget.clone();

    $clone.find('a').addClass('outlook')
      .attr('id', buttonId)
      .attr('title', addString)
      .attr('aid', 'wunderlist')
      .text(addString);

    var $span = $('<span/>').addClass('wunderlist-icon');
    $clone.find('a').prepend($span);

    $cloneTarget.before($clone);

    createGenericButtonBind();
  }

  function yahooQuickAdd () {

    var $cloneTarget = $('.btn-spam:visible');
    var $clone = $cloneTarget.clone().attr('id', buttonId)
      .addClass('yahoo')
      .removeClass('btn-spam');

    $clone.prepend($('<span/>').addClass('wunderlist-icon'));

    $clone.find('a')
      .addClass('yahoo')
      .attr('title', addString)
      .attr('data-action', '')
      .text(addString);

    $('#btn-msg-actions:visible').after($clone);

    createGenericButtonBind();
  }

  function amazonQuickAdd () {

    var $targetContainer = $('.GFTButtonCondo');
    var $button = generateGenericButton('amazon');
    $targetContainer.prepend($button);

    createGenericButtonBind();
  }

  function imdbQuickAdd () {

    var $targetContainer = $('#overview-bottom');
    var $button = generateGenericButton('imdb btn2 large primary');
    $targetContainer.append($button);

    createGenericButtonBind();
  }

  function youtubeQuickAdd () {

    var $target = $('.yt-uix-button-panel .yt-uix-button-subscription-container:visible').first();
    var $button = generateGenericButton('yt-uix-subscription-button yt-uix-button youtube');
    $target.after($button);

    createGenericButtonBind();
  }

  function wikipediaQuickAdd () {

    var $target = $('.firstHeading span');
    var $button = generateGenericButton('wkpedia');
    $target.after($button);

    createGenericButtonBind();
  }

  function ebayQuickAdd () {

    var $targetContainer = $('.drpdwnCmp, #dd_addToList').first();
    var $button = generateGenericButton('ebay');
    $targetContainer.append($button);

    createGenericButtonBind();
  }

  function asosQuickAdd () {

    var isMarketplace = /marketplace\./.test(window.location.hostname);

    var $targetContainer = $($('#variants, .product-buttons').get(0));
    var $button = generateGenericButton('asos button small grey' + (isMarketplace ? ' marketplace' : ''), '<a/>');
    $targetContainer.append($button);

    createGenericButtonBind();
  }

  function etsyQuickAdd () {

    var $targetContainer = $('#secondary-actions');
    var $button = generateGenericButton('etsy button-fave');
    $targetContainer.append($button);

    createGenericButtonBind();
  }

  function hackerNewsQuickAdd () {

    var $targetContainer = $('.subtext');
    var $button = generateGenericButton('hacker-news');
    var $divider = $('<span> | </span>');

    $button.text($button.text().toLowerCase());
    $targetContainer.append($divider).append($button);

    createGenericButtonBind();
  }

  function hackerNewsIndexQuickAdd () {

    var $targetContainer = $('.subtext');

    $targetContainer.each(function (index, element) {

      var $button = generateGenericButton('hacker-news');
      var $divider = $('<span> | </span>');

      $button.text($button.text().toLowerCase());
      $(element).append($divider).append($button);

      createGenericIndexButtonBind(element);
    });
  }

  function twitterIndexQuickAdd () {

    var $targetContainer = $('.more-tweet-actions .dropdown-menu');

    $targetContainer.each(function (index, element) {

      var $element = $(element);

      if ($element.hasClass('wl-button-added')) {
        return;
      }

      $element.addClass('wl-button-added');

      var $button = $('<li id="' + buttonId + '"><a href="#" title="' + addString + '">' + addString + '</a></li>');
      $(element).append($button);

      createGenericIndexButtonBind(element);
    });

    // since twitter adds new tweets all the time,
    // we need to keep on checking and re-adding buttons
    window.setTimeout(twitterIndexQuickAdd, 1000);
  }

  function yelpQuickAdd (){

    var $targetContainer = $('#bizActions');
    var $button = generateGenericButton('injected-yelp ybtn ybtn-tertiary ybtn-small');
    $targetContainer.prepend($button);

    createGenericButtonBind();
  }

  function tripadvisorQuickAdd (attempt) {

    var $existingButton = $('.savesWrap');

    attempt = attempt || 0;

    if (!$existingButton.length && attempt < 10) {

      attempt++;

      return setTimeout(function () {
        tripadvisorQuickAdd(attempt);
      }, 250);
    }

    var $button = $existingButton.clone();
    $button.attr('id', buttonId).addClass('tripadvisor');

    // clean the cloned button
    $button.find('.saves-hover-txt-saved, .saveAlert, .saveOptions, .sprite-suitcase_white').remove();

    $button.find('.saves-hover-txt').text(addString);

    $existingButton.after($button);

    createGenericButtonBind();
  }

  function injectQuickAddLink () {

    var hash = window.location.hash;
    var host = window.location.hostname;
    var path = window.location.pathname;
    var search = window.location.search;

    var $button = $('#' + buttonId);
    if ($button.length) {

      $button.remove();
    }

    if (/mail\.google\.com/.test(host) && hash.split('/')[1]) {

      gmailQuickAdd();
    }
    else if (/mail\.live\.com/.test(host) && (/&mid=/.test(hash) || /&mid=/.test(search))) {

      outlookQuickAdd();
    }
    else if (/mail\.yahoo\.com/.test(host)) {

      yahooQuickAdd();

      // hax since yahoo does not use stateful url changes at all
      $('body').off('click').on('click', function () {

        window.setTimeout(injectQuickAddLink, 500);
      });
    }
    else if (/amazon\./.test(host)) {

      amazonQuickAdd();
    }
    else if (/imdb\./.test(host)) {

      imdbQuickAdd();
    }
    else if (/youtube\.com/.test(host) && /\/watch/.test(path)) {

      youtubeQuickAdd();
    }
    else if (/wikipedia\.org/.test(host)) {

      wikipediaQuickAdd();
    }
    else if (/ebay\./.test(host)) {

      ebayQuickAdd();
    }
    // Asos has internal product pages with a set of products, where we shouldn't inject any button - example at http://www.asos.de/Asos/Asos-Slim-Fit-Tuxedo-Suit-Trousers/Prod/pgeproduct.aspx?iid=2431324&abi=1&clr=black&sgid=5337&r=2
    else if (/\.asos\./.test(host) && !(/\/Asos\//).test(path)) {

      asosQuickAdd();
    }
    else if (/\.etsy\./.test(host)) {

      etsyQuickAdd();
    }
    else if (/news\.ycombinator\.com/.test(host) && path === '/item') {

      hackerNewsQuickAdd();
    }
    else if (/news\.ycombinator\.com/.test(host)) {

      hackerNewsIndexQuickAdd();
    }
    else if (/twitter\.com/.test(host)) {

      twitterIndexQuickAdd();
    }
    else if (/yelp\.com/.test(host)) {

      yelpQuickAdd();
    }
    else if (/tripadvisor\./.test(host)) {

      tripadvisorQuickAdd();
    }
  }

  var lastLocation = window.location.hostname + window.location.pathname + window.location.search + window.location.hash;
  function checkLocation () {

    var host = window.location.hostname;
    var path = window.location.pathname;
    var hash = window.location.hash;
    var search = window.location.search;

    if (lastLocation !== host + path + search + hash) {

      lastLocation = host + path + search + hash;
      injectQuickAddLink();
    }
  }

  $(function () {

    var timeout = 100;
    var host = window.location.hostname;

    if (/mail\.google\.com/.test(host)) {

      timeout = 4000;
    }

    // takes a while for the dom to be really ready on gmail
    window.setTimeout(injectQuickAddLink, timeout);
    // simulate onhashchange for websites that are messing with pushstate and history
    window.setTimeout(function () {

      window.setInterval(checkLocation, 100);
    }, timeout);
  });

})(window.WL);