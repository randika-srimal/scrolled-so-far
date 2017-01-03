var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {

        chrome.runtime.sendMessage({status: "start"},
        function (response) {
            var scrolled = response.scrolled;

            console.log("Started");

            window.onscroll = function (e) {
               var doc = document.documentElement;
var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
                        
                        console.log(top);
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
