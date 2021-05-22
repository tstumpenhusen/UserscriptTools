var storage = (function() {

	return function Storage(id) {
		var _id = id;

		// Initialisierung der Storage für diesen Kontext
		if (!localStorage[_id]) {
			localStorage[_id] = JSON.stringify({});
		}

		function _keyExists(key) {
			var keys = key.split(".");
			var lastKeyIndex = keys.length-1;

			return keys.reduce((obj, val, index) => {
				if (!obj[val] || val === false) {
					return false;
				} else {
					if (index < lastKeyIndex) {
						return obj[val];
					} else {
						return true;
					}
				}
			}, JSON.parse(localStorage[_id]));
		}

		// Läd Daten aus der Storage, erstellt den Pfad des Schlüssels, wenn er nicht existiert
		// @param {*} key - Der Schlüssel des zu ladenden Wertes
		// @param {*} defaultValue - ein Standardwert, falls der Schlüssel nicht gefunden wurde
		//
		// Beispiel:
		//     _getData("a");
		//         > Gibt den Wert aus localStorage[_id].a zurück, oder {}
		//
		//     _getData("b", "")
		//         > Gibt den Wert aus localStorage[_id].b zurück, oder ""
		//
		//     _getData("c.d")
		//         > Gibt den Wert aus localStorage[_id].c.d zurück, oder {}
		//
		//     Nicht existierender Pfad:
		//     _getData("test.pfad.den.ich.aussuchte")
		//         > Erstellt den Pfad localStorage[_id].test.pfad.den.ich.aussuchte und liefert {} zurück
		function _getData(key, defaultValue) {
			if (typeof key !== "string") {
				return JSON.parse(localStorage[_id]);
			}

			var keys = key.split(".");
			var lastKeyIndex = keys.length-1;

			return keys.reduce((obj, val, index) => {
				if (!obj[val]) {
					if (index < lastKeyIndex) {
						obj[val] = {};
					} else {
						return defaultValue;
					}
				}

				return obj[val];
			}, JSON.parse(localStorage[_id]));
		}

		// Speichert Daten in der Storage
		// @param {*} key - Der Schlüssel für den der Wert gespeichert werden soll
		// @param {*} value - Der Wert, der gespeichert werden soll
		function _setData(key, value, override = false) {
			var keys = key.split(".")
			var lastKeyIndex = keys.length-1;
			var storageObj = JSON.parse(localStorage[_id]);

			keys.reduce((obj, partialKey, index) => {
				if (index === lastKeyIndex) {
					obj[partialKey] = value;
				} else if (override || obj[partialKey] === undefined) {
					obj[partialKey] = {};
				}

				return obj[partialKey];
			}, storageObj);

			localStorage[_id] = JSON.stringify(storageObj);
		}

		function _delete(key) {
			var storageObj = JSON.parse(localStorage[_id]);
			delete storageObj[key];
			localStorage[_id] = JSON.stringify(storageObj);
		}
		
		function _clear() {
			delete localStorage[_id];
		}

		function Storage() {}

		Storage.prototype = {
			keyExists: _keyExists,
			getData: _getData,
			setData: _setData,
			delete: _delete,
			clear: _clear
		}

		return new Storage();
	}
})();
window.StorageHelper = storage;
window.Storage = storage;