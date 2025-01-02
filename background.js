let recording = false;
let clicks = [];

function handleRecordingStart () {

}

function handleRecordingEnd () {
    clicks = [];
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