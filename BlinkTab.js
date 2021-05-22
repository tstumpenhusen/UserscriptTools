function blinkTab(var message, var times, var milliseconds) {
	var originalWindowTitle = document.title;
	var count = 0;
	
	var interval = setInterval(() => {
		if (count === times)
		{
			clearInterval(interval);
			document.title = originalWindowTitle;
			return;
		}
		
		document.title = document.title == message ? originalWindowTitle : message;
		count++;
	}, duration);
}

window.blinkTab = blinkTab;

console.log("loaded");