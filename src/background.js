(function(){

    var mainWindowId = undefined;

    var defaultWindowWidth = 400;
    var defaultWindowHeight = 500;

    function windowClosed(windowId) {
        if (mainWindowId === windowId) {
            mainWindowId = undefined;
        }
    }

    function mainWindowCreated(window) {
        mainWindowId = window.id;
    }

    function createMainWindow() {
        var windowWidth  = Number(localStorage.windowWidth) || defaultWindowWidth;
        var windowHeight = Number(localStorage.windowHeight) || defaultWindowHeight;
        var windowTop    = Number(localStorage.windowTop) || undefined;
        var windowLeft   = Number(localStorage.windowLeft) || undefined;
        chrome.windows.create({
            'url':   'index.html',
            'type':  'popup',
            'width':  windowWidth,
            'height': windowHeight,
            'top':    windowTop,
            'left':   windowLeft
        }, mainWindowCreated);
    }

    function focusMainWindow() {
        chrome.windows.update(mainWindowId, {'focused': true});
        chrome.windows.get(mainWindowId, function (window) {
            localStorage.windowWidth = window.width;
            localStorage.windowHeight = window.height;
            localStorage.windowTop = window.top;
            localStorage.windowLeft = window.left;
        });
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
