function modifiersMatch(modifierKeys, e) {
	var comboParts = modifierKeys
		.split("+")
		.map(key => key.trim());
	
	comboParts = comboParts.map(part => part.toLowerCase());

	if (comboParts.indexOf("ctrl") > 0 && !e.ctrlKey) {
		return false;
	}
	
	if (comboParts.indexOf("alt") > 0 && !e.altKey) {
		return false;
	}
	
	if (comboParts.indexOf("shift") > 0 && !e.shiftKey) {
		return false;
	}
	
	return true;
}

document.addAdvancedEventListener = function(modifiers, eventName, func) {
	document.addEventListener(eventName, e => {
		if (modifiersMatch(modifiers, e)) {
			func(e);
		}
	});
};