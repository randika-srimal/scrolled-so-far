setBackground = function (message) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: message},
        function (response) { /* Ignore any response. */
        }
        );
    });

    if (message.imageUrl !== null)
    {
        localStorage.setItem('imageUrl', JSON.stringify(message.imageUrl));

        var getHistory = localStorage.getItem('history');

        var historyArray2 = JSON.parse(getHistory);

        if (historyArray2.indexOf(message.imageUrl) === -1)
        {
            historyArray2.unshift(message.imageUrl);
        }

        localStorage.setItem('history', JSON.stringify(historyArray2));

    }
}

resetBackground = function (message) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: message},
        function (response) { /* Ignore any response. */
        }
        );
    });

    localStorage.removeItem('imageUrl');
}

function sendHistory()
{
    var historySendArray = localStorage.getItem('history');
    var historySendObj = JSON.parse(historySendArray);

    return historySendObj;
}

function deleteHistory()
{
    localStorage.removeItem('history');
    localStorage.setItem('history', JSON.stringify([]));
}

chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.backgroundStatus === "require")
            {
                var ls = localStorage.getItem('imageUrl');
                var history = localStorage.getItem('history');

                var parseObj = JSON.parse(ls);
                var historyObj = JSON.parse(history);

                if (parseObj === null)
                {
                    sendResponse({imageUrl: null});
                } else
                {
                    sendResponse({imageUrl: parseObj});
                }

                if (historyObj === null)
                {
                    var historyArray = [];
                    localStorage.setItem('history', JSON.stringify(historyArray));
                }
            }

        });
