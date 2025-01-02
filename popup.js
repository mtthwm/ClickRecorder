// popup.js
let recording = false;

const btn = document.getElementById("toggleRecording");
btn.addEventListener("click", () => {
    recording = !recording;
    
    if (recording) {
        btn.innerText = "Stop";
    } else {
        btn.innerText = "Start";
    }
});
  