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
            var scrolledPixelsCount;

            $(window)
                    .on("scrollstart", function () {
                        start = $(window).scrollTop();
                    })
                    .on("scrollstop", function () {
                        end = $(window).scrollTop();

                        if (end > start)
                        {
                            scrolledPixelsCount = end - start;
                        } else if (end < start)
                        {
                            scrolledPixelsCount = start - end;
                        }

                        chrome.runtime.sendMessage({status: "start"},
                        function (response) {
                            var allScolledPixels = scrolledPixelsCount + Number(response.scrolled);

                            var doc = document.documentElement;
                            document.getElementById("scrolled-km").innerText = ((allScolledPixels / Number(dpi_y)) * 0.0254).toFixed(1) + " Meters";
                            chrome.runtime.sendMessage({scrolledPixels: allScolledPixels},
                            function (response) {
                                //console.log(response.farewell); 
                            });
                        });
                    })


            window.onscroll = function (e) {
                //console.log($("window").scrollTop());

            }
        });

        clearInterval(readyStateCheckInterval);
    }
}, 10);
