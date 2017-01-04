document.addEventListener('DOMContentLoaded', function () {
    var reset = document.getElementById('resetButton');
    
    reset.addEventListener('click', function () {
        var bg = chrome.extension.getBackgroundPage();
        bg.resetScrolledPixels();
        window.close();
    });
});
