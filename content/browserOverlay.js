/**
 * GanymedeOrg namespace.
 */
if ("undefined" == typeof(GanymedeOrg)) {
  var GanymedeOrg = {};

  var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("TmpD", Components.interfaces.nsIFile);

  file.append("test.txt");

  var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
  outputStream.init(file, 0x04 | 0x08 | 0x10, 0644, 0);
};

/**
 * Controls the browser overlay for the Hello World extension.
 */
GanymedeOrg.BrowserOverlay = {

  findClassLabels : function(aEvent) {

    var console = window.content.document.console;

    let stringBundle = document.getElementById("classylocator-string-bundle");
    let message = stringBundle.getString("classylocator.greeting.label") + "(" + console + ")";

    var text = "Text to be written\n";

    outputStream.write(text, text.length);

    window.alert(message);
  }
};
