
if ("undefined" == typeof(GanymedeOrg)) {

  var GanymedeOrg = {};

  var file = null;
  var oStream = null;
};

GanymedeOrg.BrowserOverlay = {

  startRecording : function(anEvent) {

    if (file == null) {

      file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("TmpD", Components.interfaces.nsIFile);
      file.append("test.txt");

      oStream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
      oStream.init(file, 0x04 | 0x08 | 0x10, 0644, 0);

      var msg = "\nStart of recoding: " + Date() + " *******\n\n";

      oStream.write(msg, msg.length);

      //window.addEventListener('load', findClassLabels, false);

      window.alert("starting...");

    } else {
      window.alert("already started.");
    }
  },

  stopRecording : function(anEvent) {

    var msg = "\nStopped recoding: " + Date() + " *******\n\n";

    oStream.write(msg, msg.length);

    oStream.close();

    oStream = null;

    file = null;

    window.removeEventListener('load', findClassLabels, false);

    window.alert("stopping...");
  },

  findClassLabels : function(anEvent) {

    oStream.write("ok\n", 3);

    let doc = event.originalTarget;

    // Make sure the doc is not in a frame, is top doc.
    if (doc instanceof HTMLDocument) {
      if (doc.defaultView.frameElement) {
        while (doc.defaultView.frameElement) {
          doc = doc.defaultView.frameElement.ownerDocument;
        }
      }
    }

    var text = "At " + Date() + ", Page = " + doc.title + "\n";

    oStream.write(text, text.length);

    window.alert("page!");
  }
};
