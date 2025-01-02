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
        event.target.classList
    )
    chrome.runtime.sendMessage({ action: "clickAction", name: "Popup", extraInfo: {action: action}});
});

