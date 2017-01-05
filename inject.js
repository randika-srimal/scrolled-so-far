var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {

        chrome.runtime.sendMessage({msg: "start"},
        function (response) {

            var lastRealWorldHeight = response.realWorldItem;

            var dpiElement = document.createElement('div');
            document.body.appendChild(dpiElement);
            dpiElement.style.height = '1in';
            dpiElement.style.left = '-100%';
            dpiElement.style.position = 'absolute';
            dpiElement.style.top = '-100%';
            dpiElement.style.width = '1in';
            dpiElement.id = 'dpi-element';

            var dpi_y = document.getElementById('dpi-element').offsetHeight;

            var indicatorWrapper = document.createElement('div');
            indicatorWrapper.style.right = '32px';
            indicatorWrapper.style.top = '2px';
            indicatorWrapper.style.position = 'fixed';
            indicatorWrapper.style.zIndex = '9999';
            indicatorWrapper.style.textAlign = 'center';
            indicatorWrapper.id = 'indicator-wrapper';
            document.body.appendChild(indicatorWrapper);

            var scollLengthIndicator = document.createElement('div');
            scollLengthIndicator.style.fontSize = '18px';
            scollLengthIndicator.style.fontWeight = 'bold';
            scollLengthIndicator.style.color = 'red';
            scollLengthIndicator.id = 'indicator';
            scollLengthIndicator.textContent = ((Number(response.scrolled) / Number(dpi_y)) * 0.0254).toFixed(1) + " Meters";
            document.getElementById("indicator-wrapper").appendChild(scollLengthIndicator);

            if (lastRealWorldHeight != "")
            {
                $("<span id='real-life-height' style='color:white;font-weight:bold;'>Passed " + lastRealWorldHeight + "</span>").insertAfter("#indicator");
            }else
            {
                $("<span id='real-life-height' style='color:white;font-weight:bold;'></span>").insertAfter("#indicator");
            }

            var start;
            var end;
            var scrolledPixelsCount;

            var realWorldHeights = {
                5: "Giraffe",
                57: "Pisa Tower",
                300: "Eifel Tower",
                8848: "Everest Mountain",
                10994: "Mariana Hole",
                12742000: "Width of Earth",
                384400000: "Earth to Moon",
            };


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

                        chrome.runtime.sendMessage({msg: "start"},
                        function (response) {
                            var allScolledPixels = scrolledPixelsCount + Number(response.scrolled);
                            var meters = ((allScolledPixels / Number(dpi_y)) * 0.0254).toFixed(1);

                            document.getElementById("indicator").innerText = meters + " Meters";

                            if (Math.round(meters) in realWorldHeights)
                            {
                                lastRealWorldHeight = realWorldHeights[Math.round(meters)]
                                document.getElementById("real-life-height").innerText = lastRealWorldHeight;
                            } else
                            {
                                if (lastRealWorldHeight != '')
                                {
                                    document.getElementById("real-life-height").innerText = "Passed " + lastRealWorldHeight;
                                }
                            }

                            chrome.runtime.sendMessage({msg: 'save', allScolledPixels: allScolledPixels, realWorldItem: lastRealWorldHeight},
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
