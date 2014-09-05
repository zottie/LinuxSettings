var default_configuration = {
  IFRAME_WIDTH:25,
  STARTUP_PAGE:"https://www.wunderlist.com/#/lists/all",
  EXPAND_ON_HOVER:false,
  SHOW_ON_GMAIL: true,
  SHOW_ON_CALENDAR: true,

};

// Saves options to localStorage.
function save_options() {
  var configuration = {};

  configuration.IFRAME_WIDTH = $("#initialWidth").val();
  configuration.STARTUP_PAGE = $("#startupPage").val();
  configuration.EXPAND_ON_HOVER = $("#expandOnHover").is(":checked");
  configuration.SHOW_ON_GMAIL = $("#showInGmail").is(":checked");
  configuration.SHOW_ON_CALENDAR = $("#showInGCalendar").is(":checked");

  localStorage["configuration"] = JSON.stringify(configuration);

  // Update status to let user know options were saved.
  var status = $("#status");
  status.html("Options Saved. Reload pages with WunderlistGmail to have the changes applied.");
  status.show();

  setTimeout(function () {
    status.fadeOut(500);
  }, 10000);
}

// Restores select box state to saved value from localStorage.

function setChecked(input, checked){
  if(checked)
    input.attr("checked", "checked");
  else
    input.removeAttr("checked");
}

function restore_options() {
  var configuration = default_configuration;
  try {
    $.extend(configuration, JSON.parse(localStorage["configuration"]));
  }
  catch (err) {
    console.warn("Problem loading saved configuration: " + err);
  }

  $("#initialWidth").val(configuration.IFRAME_WIDTH);
  $("#startupPage").val(configuration.STARTUP_PAGE);

  setChecked($("#expandOnHover"), configuration.EXPAND_ON_HOVER);
  setChecked($("#showInGCalendar"), configuration.SHOW_ON_CALENDAR);
  setChecked($("#showInGmail"), configuration.SHOW_ON_GMAIL);
}

$(window).load(function () {
  if(localStorage["firstOpenAfterUpdate"])
  {
    localStorage["firstOpenAfterUpdate"] = "";
    $('#updateNotice').fadeIn(1000);
  }
  $('#save').click(save_options);
  restore_options();
});
