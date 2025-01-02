function ClickAction (elementType, elementId, elementClass) {
    return {
        elementClass: elementClass,
        elementId: elementId,
        elementType: elementType,
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

function cr_ext_replay (clickActions) {
    clickActions.forEach(action => {
        let qs = action.elementType;
        if (action.elementClass) {
            
            qs += `.${action.elementClass.split(" ").join(".")}`;
        }
        if (action.elementId) {
            qs += `#${action.elementId}`;
        }

        const clickTarget = document.querySelector(qs);
        console.log(clickTarget);
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {    
    if (message.action === "replayActions") {
        cr_ext_replay(message.extraInfo.clicks);
    }
});