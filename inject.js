var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {

        chrome.runtime.sendMessage({status: "start"},
        function (response) {
            var scrolled = response.scrolled;

            console.log("Started");

            window.onscroll = function (e) {
                var body = document.body,
                        html = document.documentElement;

                var height = Math.max(body.scrollHeight, body.offsetHeight,
                        html.clientHeight, html.scrollHeight, html.offsetHeight);
                        
                        console.log(height);
            }
//            if (scrolled !== null)
//            {
//                document.body.style.color = "red";
//            } else
//            {
//                document.body.style.color = "green";
//            }
        });

        clearInterval(readyStateCheckInterval);
    }
}, 10);
