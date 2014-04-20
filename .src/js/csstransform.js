var cached;

var cssTransform = function(document, forceRetest) {
	if (cached && !forceRetest) return cached;
	var prefixes = ['transform', 'webkitTransform', 'mozTransform', 'oTransform', 'msTransform'];
	var el = document.createElement('div');
	var transform;
	var i = 0;
	while (transform === undefined) {
		transform = el.style[prefixes[i]] !== undefined ? prefixes[i] : undefined;
		i++;
	}
	cached = transform;
	return cached;
};

module.exports = cssTransform;
