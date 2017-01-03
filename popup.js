document.addEventListener('DOMContentLoaded', function () {
    var reset = document.getElementById('resetButton');

    document.getElementById('indicator').value = 10000;

    reset.addEventListener('click', function () {
        var bg = chrome.extension.getBackgroundPage();
        bg.resetBackground({imageUrl: null});
    });
});
