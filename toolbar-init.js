function minimizeToolbar() {
    let frame = document.querySelector("#alterdot-toolbar-qa2r");
    frame.style.height = "20px";
    frame.style.width = "28px";
}

function maximizeToolbar() {
    let frame = document.querySelector("#alterdot-toolbar-qa2r");
    frame.style.height = "36px";
    frame.style.width = "270px";
}

function hideToolbar() {
    let frame = document.querySelector("#alterdot-toolbar-qa2r");
    frame.style.display = "none";
}

function showToolbar() {
    let frame = document.querySelector("#alterdot-toolbar-qa2r");
    frame.style.display = "block";
}

function updateToolbar(newState) {
    switch (newState) {
        case "minimized": // if it gets minimized then it is already displayed
            minimizeToolbar();
            break;
        case "maximized":
            maximizeToolbar();
            showToolbar(); // show it in case it was previously hidden instead of minimized
            break;
        case "hidden":
            hideToolbar();
            break;
        default:
            break;
    }
}

function init() {
    var iframe = document.createElement("iframe");
    iframe.src = chrome.extension.getURL('toolbar.html');
    iframe.id = "alterdot-toolbar-qa2r";
    
    document.body.append(iframe);
    hideToolbar();

    chrome.storage.sync.get("toolbarState", function(result) {
        if (result && "toolbarState" in result) {
            updateToolbar(result["toolbarState"]);
        }
    });
    
    chrome.storage.onChanged.addListener(function(changes, area) {
        if (area == "sync" && "toolbarState" in changes) {
            updateToolbar(changes["toolbarState"].newValue);
        }
    });
}

init();
