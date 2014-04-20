var d = document;

var Vec2D        = require('./vec2d.js');
var cssTransform = require('./csstransform.js')(d);
var reqAnimFrame = require('./reqAnimFrame.js')(window);
var ease         = require('./ease.js').inOutQuad;
var Rotator      = require('./rotator.js');


var initializeApplication = function() {
	var el = d.querySelector('.card');

	if (!el) {
		return;
	}

	rotator = new Rotator(Vec2D, reqAnimFrame, Date.now);

	rotator.onUpdate(function(position) {
		el.style[cssTransform] = 'rotateX(' + -position.y%360 + 'deg) rotateY(' + position.x%360 + 'deg)';
	});

	var blockInteraction = false;

	var intro = function() {
		var info = d.querySelector('.intro');

		var toggleClass = function(toggle) {
			info.classList.toggle('show', toggle);
		};

		rotator.start(0, 0);
		toggleClass(true);
		blockInteraction = true;

		var step = 0;
		var duration = 50;
		var pos = 0;

		function anim() {
			++step;
			pos = ease(this, step, 0, duration, duration);

			rotator.move(pos * 2, pos / 2);

			info.style[cssTransform] = 'translate3d(' + pos + 'px,' + pos / 4 + 'px, 10px)';

			if (step < duration) {
				reqAnimFrame(anim);
			} else {
				blockInteraction = false;
				rotator.end();
				setTimeout(toggleClass, 1000, false);
			}
		}
		setTimeout(reqAnimFrame, 1000, anim);
	};

	var introTimeout = setTimeout(intro, 5000);

	d.addEventListener('mousedown', function(e) {
		if (introTimeout) {
			clearTimeout(introTimeout);
			introTimeout = false;
		}
		rotator.start(e.pageX, e.pageY);
	});

	d.addEventListener('mousemove', function(e) {
		!blockInteraction && rotator.move(e.pageX, e.pageY);
	});

	d.addEventListener('mouseup', rotator.end);

	d.addEventListener('touchstart', function(e) {
		if (introTimeout) {
			clearTimeout(introTimeout);
			introTimeout = false;
		}

		if (e.touches.length == 1) {
			!blockInteraction && rotator.start(e.touches[0].pageX, e.touches[0].pageY);
		}
	});

	d.addEventListener('touchmove', function(e) {
		if (e.touches.length == 1) {
			e.preventDefault();
			rotator.move(e.touches[0].pageX, e.touches[0].pageY);
		}
	});

	d.addEventListener('touchend', rotator.end);

};

d.addEventListener('DOMContentLoaded', initializeApplication);
