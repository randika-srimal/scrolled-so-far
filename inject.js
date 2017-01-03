var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {

        chrome.runtime.sendMessage({status: "start"},
        function (response) {

            console.log("Started");

            var div = document.createElement('div');
            document.body.appendChild(div);
            div.style.right = '32px';
            div.style.top = '10px';
            div.style.position = 'fixed';
            div.style.zIndex = '9999';
            div.style.fontSize = '20px';
            div.style.color = 'red';
            div.id = 'scrolled-km';

            window.onscroll = function (e) {
                var doc = document.documentElement;
                var scrolledPixels = Number(response.scrolled) + (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
                document.getElementById("scrolled-km").innerText = scrolledPixels;
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
