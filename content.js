const CLICK_DELAY = 1000;

function ClickAction (elementType, elementId, elementClass) {
    let qs = elementType;
    if (elementClass) {
        
        qs += `.${elementClass.split(" ").join(".")}`;
    }
    if (elementId) {
        qs += `#${elementId}`;
    }

    return {
        type: "click",
        target: {
            elementClass: elementClass,
            elementId: elementId,
            elementType: elementType,
            querySelector: qs
        }
    }
}

document.addEventListener("click", event => {
    let action = ClickAction(
        event.target.nodeName.toLowerCase(),
        event.target.id,
        event.target.className.trim()
    )
    chrome.runtime.sendMessage({ action: "clickAction", name: "Popup", extraInfo: {action: action}});
});

function cr_ext_replay_click (clickActionTarget) {
    const clickTarget = document.querySelector(clickActionTarget.querySelector);
    clickTarget.click();
}

function cr_ext_replay (recActions) {
    recActions.forEach((action, index) => setTimeout(() => {
        cr_ext_replay_click(action.target);
    }, CLICK_DELAY*index));
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {    
    if (message.action === "replayActions") {
        cr_ext_replay(message.extraInfo.recActions);
    }
});