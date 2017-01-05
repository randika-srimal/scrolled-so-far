reset = function (message) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: message},
        function (response) { /* Ignore any response. */
        }
        );
    });

    localStorage.setItem('pixels', 0);
    localStorage.setItem('realWorldItem', '');
}

chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.msg === "start")
            {
                var pixels = localStorage.getItem('pixels');
                var realWorldItem = localStorage.getItem('realWorldItem');

                if (pixels == null)
                {
                    localStorage.setItem('pixels', 0);
                    pixels = 0;
                }

                if (realWorldItem == null)
                {
                    localStorage.setItem('realWorldItem', '');
                    realWorldItem = '';
                }

                sendResponse({scrolled: pixels, realWorldItem: realWorldItem});

            }

            if (request.msg == 'save')
            {
                localStorage.setItem('pixels', request.allScolledPixels);
                localStorage.setItem('realWorldItem', request.realWorldItem);
            }

        });
