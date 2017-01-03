chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.message.imageUrl !== null) {
                var imageUrl = request.message.imageUrl;
                document.body.style.background = "url(" + imageUrl + ") no-repeat center center fixed";
                document.body.style.backgroundSize = "cover";
            } else {
                document.body.style.background = "";
                document.body.style.backgroundColor = "#e9eaed";
            }
        }
);

var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {

        chrome.runtime.sendMessage({backgroundStatus: "require"},
        function (response) {
            var imageUrl = response.imageUrl;
            if (imageUrl !== null)
            {
                document.body.style.background = "url(" + imageUrl + ") no-repeat center center fixed";
                document.body.style.backgroundSize = "cover";
            }
        });

        clearInterval(readyStateCheckInterval);
    }
}, 10);
