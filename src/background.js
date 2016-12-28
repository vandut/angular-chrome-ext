(function(){

    var mainWindowId = undefined;

    var defaultWidth = 400;
    var defaultHeight = 500;

    function windowClosed(windowId) {
        if (mainWindowId === windowId) {
            mainWindowId = undefined;
        }
    }

    function mainWindowCreated(window) {
        mainWindowId = window.id;
    }

    function createMainWindow() {
        chrome.windows.create({'url': 'index.html', 'type': 'popup', 'width': defaultWidth, 'height': defaultHeight}, mainWindowCreated);
    }

    function focusMainWindow() {
        chrome.windows.update(mainWindowId, {'focused': true});
    }

    function browserActionClicked() {
        if (mainWindowId === undefined) {
            createMainWindow();
        } else {
            focusMainWindow();
        }
    }

    chrome.browserAction.onClicked.addListener(browserActionClicked);
    chrome.windows.onRemoved.addListener(windowClosed);

})();
