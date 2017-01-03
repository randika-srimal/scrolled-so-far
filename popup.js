document.addEventListener('DOMContentLoaded', function () {
    var set = document.getElementById('setButton');
    var reset = document.getElementById('resetButton');
    var resetHistory = document.getElementById('resetHistory');

    var historyList = chrome.extension.getBackgroundPage().sendHistory();

    var historyHtml = "";

    for (var i = 0; i < 4; i++)
    {
        if (typeof historyList[i] !== "undefined")
        {
            historyHtml += "<img class='history-thumbnail' src='" + historyList[i] + "' style='border: 2px solid #000000;margin:3px;cursor:pointer;width:140px;height:100px;'>";
        }

    }

    document.getElementById('history-list').innerHTML = historyHtml;

    set.addEventListener('click', function () {
        var location = document.getElementById('url').value;
        var bg = chrome.extension.getBackgroundPage();
        bg.setBackground({imageUrl: location});
    });

    reset.addEventListener('click', function () {
        var bg = chrome.extension.getBackgroundPage();
        bg.resetBackground({imageUrl: null});
    });
    
    resetHistory.addEventListener('click', function () {
        var bg = chrome.extension.getBackgroundPage();
        bg.deleteHistory();
    });

    var historyThumbnails = document.getElementsByClassName("history-thumbnail");

    for (var i = 0; i < historyThumbnails.length; i++) {
        historyThumbnails[i].addEventListener('click', function () {
            var bg = chrome.extension.getBackgroundPage();
            bg.setBackground({imageUrl: this.src});
        });
    }
});
