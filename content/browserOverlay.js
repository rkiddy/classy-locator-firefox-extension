
if ("undefined" == typeof(GanymedeOrg)) {

  var GanymedeOrg = {};

  var file = null;
  var oStream = null;
};

GanymedeOrg.BrowserOverlay = {

  startRecording : function(anEvent) {

    if (file == null) {

      file = Components.classes["@mozilla.org/file/directory_service;1"].
                 getService(Components.interfaces.nsIProperties).
                 get("TmpD", Components.interfaces.nsIFile);
      file.append("test.txt");

      oStream = Components.classes["@mozilla.org/network/file-output-stream;1"].
                 createInstance(Components.interfaces.nsIFileOutputStream);
      oStream.init(file, 0x04 | 0x08 | 0x10, 0644, 0);

      var msg = "\nStart of recoding: " + Date() + " *******\n\n";

      oStream.write(msg, msg.length);

      gBrowser.addEventListener("load", this.findClassLabelsInPage, true);
      // gBrowser.addEventListener("onclick", this.findClassLabelsInClick, true);
      // gBrowser.addEventListener("onchange", this.findClassLabelsInChanged, true);

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

    gBrowser.removeEventListener("load", this.findClassLabelsInPage, true);
    // gBrowser.removeEventListener("onclick", this.findClassLabelsInClick, true);
    // gBrowser.removeEventListener("onchange", this.findClassLabelsInChanged, true);

    window.alert("stopping...");
  },

  logg : function(str) {
    oStream.write(str, str.legnth);
  },

  classMatches : function(aString) {
      var aMatch = 1;
      var next = aString;
      if (next === '') return 0;
      while (aMatch > 0 && next !== '') {
          if (next.search(/^[A-Z][a-z]+/) == 0) {
              next = next.replace(/^[A-Z][a-z]+/, "");
          } else {
              aMatch = 0;
          }
      }
      return aMatch;
  },

  findClassLabelsInClick  : function(anEvent) {

      // oStream.write("click\n", 6);
      var button = anEvent.currentTarget;

      var txt = "  // onclick: target = " + button + "\n";
      oStream.write(txt, txt.length);

      var classNames = button.className.split(" ");

      for (var jdx = 0; jdx < classNames.length; jdx++) {
          var aMatch = 1;
          var next = classNames[jdx];
          if (next === '') aMatch = 0;
          while (aMatch > 0 && next !== '') {
              if (next.search(/^[A-Z][a-z]+/) == 0) {
                  next = next.replace(/^[A-Z][a-z]+/, "");
              } else {
                  aMatch = 0;
              }
          }
          if (aMatch > 0) {
              var txt = "  findAndClick(\"" + classNames[jdx] + "\");\n";
              oStream.write(txt, txt.length);
          }
      }
  },

  findClassLabelsInPage : function(anEvent) {

    var doc = window.gBrowser.contentWindow.document;

    var text = "  // Page = '" + doc.title + "' At " + Date() + "\n";

    oStream.write(text, text.length);

    var tags = doc.getElementsByTagName("*");

    for (var idx = 0; idx < tags.length; idx++) {

        var tag = tags[idx];

        //var str = " // tag: '" + tag.tagName + "' -> class: '" + tag.className + "'\n";
        //oStream.write(str, str.length);

        // First check the className attribute of the elements and record them if desired.
        //
        var classNames = tag.className.split(" ");

        for (var jdx = 0; jdx < classNames.length; jdx++) {
            var aMatch = 1;
            var next = classNames[jdx];
            if (next === '') aMatch = 0;
            while (aMatch > 0 && next !== '') {
                if (next.search(/^[A-Z][a-z]+/) == 0) {
                    next = next.replace(/^[A-Z][a-z]+/, "");
                } else {
                    aMatch = 0;
                }
            }
            if (aMatch > 0) {
                var txt = "  waitFor(\"" + classNames[jdx] + "\");\n";
                oStream.write(txt, txt.length);
            }
        }

        // Now I will add the button listeners I need. Is there a more general way to do this?

        //var txt = "checking tag '" + tag.tagName + "' and type '" + tag.getAttribute("type") + "'\n";
        //oStream.write(txt, txt.length);

        if (tag.tagName.toLowerCase() == 'input' && tag.hasAttribute('type') && tag.getAttribute('type').toLowerCase() == 'submit') {
            //oStream.write("button\n", 7);
            tag.onclick = this.findClassLabelsInClick;
        }
    }

    var txt = "\n// DONE\n\n";
    oStream.write(txt, txt.length);
  },

  findClassLabelsInChanged : function(anEvent) {

      var target = anEvent.currentTarget;

      var txt = "  // onclick: target = " + target + "\n";
      oStream.write(txt, txt.length);

      var classNames = target.className.split(" ");

      for (var jdx = 0; jdx < classNames.length; jdx++) {
          var aMatch = 1;
          var next = classNames[jdx];
          if (next === '') aMatch = 0;
          while (aMatch > 0 && next !== '') {
              if (next.search(/^[A-Z][a-z]+/) == 0) {
                  next = next.replace(/^[A-Z][a-z]+/, "");
              } else {
                  aMatch = 0;
              }
          }
          if (aMatch > 0) {
              var txt = "  findAndSelect(\"" + classNames[jdx] + "\");\n";
              oStream.write(txt, txt.length);
          }
      }
  }
};
