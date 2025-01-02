let recording = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {    
    if (message.action === "toggleRecording") {
        recording = !recording;
    } else if (message.action === "requestRecordingStatus") {
        console.log(message);
        sendResponse({reply: recording});
    }

    return false;
});