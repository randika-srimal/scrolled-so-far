var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {

        chrome.runtime.sendMessage({status: "start"},
        function (response) {
            var scrolled = response.scrolled;

            console.log("Started");


            function myFunction() {
                console.log("You scrolled in div.");
            }
            
            document.getElementById("contentArea").addEventListener("scroll", myFunction);
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
