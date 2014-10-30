/**
 * GanymedeOrg namespace.
 */
if ("undefined" == typeof(GanymedeOrg)) {
  var GanymedeOrg = {};
};

/**
 * Controls the browser overlay for the Hello World extension.
 */
GanymedeOrg.BrowserOverlay = {

  /**
   * Says 'Hello' to the user.
   */
  findClassLabels : function(aEvent) {

    let stringBundle = document.getElementById("classylocator-string-bundle");
    let message = stringBundle.getString("classylocator.greeting.label");
    window.alert(message);
  }
};
