let recording = false;
let clicks = [];

function handleRecordingStart () {

}

function replay (clicks) {
    useCurrentTabId (id => {
        chrome.tabs.sendMessage(id, {action: "replayActions", name: "Background", extraInfo: {clicks: clicks}});
    });
}

function handleRecordingEnd () {
    replay(clicks);
    clicks = [];
}

function useCurrentTabId (cb) {
    chrome.tabs.query(
        { currentWindow: true, active: true },
        function (tabList) {
            cb(tabList[0].id)
        }
    );
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {    
    if (message.action === "toggleRecording") {
        recording = !recording;
        if (recording) {
            handleRecordingStart();
        } else {
            handleRecordingEnd();
        }
    } else if (message.action === "requestRecordingStatus") {
        sendResponse({reply: recording});
    } else if (message.action === "clickAction") {
        if (recording) {
            const clickAction = message.extraInfo.action;
            clicks.push(clickAction)
        }
    }

    return false;
});