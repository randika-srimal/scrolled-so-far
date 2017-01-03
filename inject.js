var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {

        chrome.runtime.sendMessage({status: "start"},
        function (response) {


            var dpiElement = document.createElement('div');
            document.body.appendChild(dpiElement);
            dpiElement.style.height = '1in';
            dpiElement.style.left = '-100%';
            dpiElement.style.position = 'absolute';
            dpiElement.style.top = '-100%';
            dpiElement.style.width = '1in';
            dpiElement.id = 'dpi-element';
            
            var dpi_y = document.getElementById('dpi-element').offsetHeight;

            console.log(dpi_y);


            console.log("Started");

            var scollLengthIndicator = document.createElement('div');
            document.body.appendChild(scollLengthIndicator);
            scollLengthIndicator.style.right = '32px';
            scollLengthIndicator.style.top = '10px';
            scollLengthIndicator.style.position = 'fixed';
            scollLengthIndicator.style.zIndex = '9999';
            scollLengthIndicator.style.fontSize = '20px';
            scollLengthIndicator.style.color = 'red';
            scollLengthIndicator.id = 'scrolled-km';



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
