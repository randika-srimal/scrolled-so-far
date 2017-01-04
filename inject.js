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

            var scollLengthIndicator = document.createElement('div');
            document.body.appendChild(scollLengthIndicator);
            scollLengthIndicator.style.right = '32px';
            scollLengthIndicator.style.top = '10px';
            scollLengthIndicator.style.position = 'fixed';
            scollLengthIndicator.style.zIndex = '9999';
            scollLengthIndicator.style.fontSize = '20px';
            scollLengthIndicator.style.fontWeight = 'bold';
            scollLengthIndicator.style.color = 'red';
            scollLengthIndicator.id = 'scrolled-km';

            var start;
            var end;

            $(window)
                    .on("scrollstart", function () {
                        console.log("start");
                        start = $(window).scrollTop();
                        // Paint the world yellow when scrolling starts.
                        //$(document.body).css({background: "yellow"});
                    })
                    .on("scrollstop", function () {
                        console.log("end");
                        end = $(window).scrollTop();
                        if (end > start)
                        {
                            console.log((end - start) + "down");
                        } else if (end < start)
                        {
                            console.log((start - end) + "up");

                        }
                        // Paint it all green when scrolling stops.
                        //$(document.body).css({background: "green"});
                    })


            window.onscroll = function (e) {
                //console.log($("window").scrollTop());
//                var doc = document.documentElement;
//                var scrolledPixels = Number(response.scrolled) + (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
//                document.getElementById("scrolled-km").innerText = ((scrolledPixels / Number(dpi_y)) * 0.0254).toFixed(1) + " Meters";
//                chrome.runtime.sendMessage({scrolledPixels: scrolledPixels},
//                function (response) {
//                    //console.log(response.farewell); 
//                });
            }
        });

        clearInterval(readyStateCheckInterval);
    }
}, 10);
