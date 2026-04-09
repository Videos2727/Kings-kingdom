var requestSent = false;

function usrdct(e, url) {

	if (requestSent) {
		return;
	}

	requestSent = true;

	if (!e) e = window.event;

	var params = "";

	if (e && e.clientX && e.clientY) {
		params = "MOUSE:" + e.clientX + "," + e.clientY;
	}
	if (e && e.srcElement && e.srcElement.nodeName) {
		params = "SOURCE:" + e.srcElement.nodeName;
	}

	ajaxPost(url, params);
}