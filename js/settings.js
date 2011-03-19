
System.Gadget.onSettingsClosing = settingsClosing;

function loadedSetting() {
    feedURL.value = System.Gadget.Settings.readString("feedURL");
}

function settingsClosing(event) {
    if (event.closeAction == event.Action.commit) {
        System.Gadget.Settings.write("feedURL", feedURL.value);
    }
    event.cancel = false;
}
