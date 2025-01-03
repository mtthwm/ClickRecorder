const btn = document.getElementById("toggleRecording");
const recordingEntry = (recActionList) => {

}

let recording = false;

function updateDisplay () {
    if (recording) {
        btn.innerText = "Stop";
    } else {
        btn.innerText = "Start";
    }
}

// ON POPUP SHOW
(async () => {
    const response = await chrome.runtime.sendMessage({ action: "requestRecordingStatus", name: "Popup" });
    recording = response.reply;
    updateDisplay();

    btn.addEventListener("click", () => {
        recording = !recording;
        chrome.runtime.sendMessage({ action: "toggleRecording", name: "Popup" });
        
        updateDisplay();
    });
})();