resetBackground = function (message) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: message},
        function (response) { /* Ignore any response. */
        }
        );
    });

    localStorage.setItem('pixels',0);
}

chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.status === "start")
            {
                var pixels = localStorage.getItem('pixels');
                sendResponse({scrolled: pixels});

            }

            if (typeof request.scrolledPixels != 'undefined')
            {
                localStorage.setItem('pixels',request.scrolledPixels);
            }

        });
