let recording = false;
let recActions = [];

function handleRecordingStart () {

}

function replay (recActions) {
    useCurrentTabId (id => {
        chrome.tabs.sendMessage(id, {action: "replayActions", name: "Background", extraInfo: {recActions: recActions}});
    });
}

function handleRecordingEnd () {
    replay(recActions);
    recActions = [];
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
            recActions.push(clickAction)
        }
    }

    return false;
});