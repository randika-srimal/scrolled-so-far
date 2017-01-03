var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {

        chrome.runtime.sendMessage({status: "start"},
        function (response) {
            
            console.log("Started");

            window.onscroll = function (e) {
                var doc = document.documentElement;
                var scrolledPixels =Number(response.scrolled)+(window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
                chrome.runtime.sendMessage({scrolledPixels: scrolledPixels},
                function (response) {
                    //console.log(response.farewell); 
                });
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
