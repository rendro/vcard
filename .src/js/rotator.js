var Rotator = function(Vec2D, reqAnimFrame, dateNow, opts) {
	opts = opts || {};

	var lastPos;
	var currPos;
	var lastTick;
	var dt;
	var dPos;
	var now;
	var callbacks = [];
	var defaultOptions = {
		animationThreshold: 0.01,
		resistance: 0.65,
		friction: 0.1
	};

	/**
	 * Object with current options
	 * @type {Object}
	 */
	this.options = {};

	/**
	 * is dragging state
	 * @type {Boolean}
	 */
	this.isDragging = false;

	/**
	 * Current position
	 * @type {Vec2D}
	 */
	this.position = new Vec2D();

	/**
	 * Current velocity
	 * @type {Vec2D}
	 */
	this.velocity = new Vec2D();


	// merge parameter options with default options
	for (var i in defaultOptions) {
		if (defaultOptions.hasOwnProperty(i)) {
			this.options[i] = typeof opts[i] !== 'undefined' ? opts[i] : defaultOptions[i];
		}
	}

	/**
	 * Decelarate with given friction until the animation threshold is reached
	 */
	var decelerate = function() {
		// break if user is dragging again
		if (this.isDragging) { return; }

		now = dateNow();
		dt  = now - lastTick;

		// reduce velocity
		this.velocity.mult(1 - this.options.friction);

		// update position
		this.position.add(this.velocity.clone().mult(dt).mult(1 - this.options.resistance));

		// update element
		this.updateEl();

		lastTick = now;
		lastPos = this.position.clone();
		currPos = this.position.clone();

		// recall decelarate if velocity is above threshold
		if (Math.abs(this.velocity.x) > this.options.animationThreshold || Math.abs(this.velocity.y) > this.options.animationThreshold) {
			reqAnimFrame(decelerate);
		}
	}.bind(this);

	/**
	 * Handle dragging and call decelarate if dragging ended
	 * @return {[type]} [description]
	 */
	var frame = function() {

		// do nothing if the position has not changed
		if (this.isDragging && currPos.equals(lastPos)) {
			reqAnimFrame(frame);
			return;
		}

		now  = dateNow();
		dt   = now - lastTick;
		dPos = Vec2D.diff(currPos, lastPos);

		// decelarate if user is not dragging any more
		if (!this.isDragging && dt < 1e2) {
			reqAnimFrame(decelerate);
			return;
		}

		// prevent velocity to be Infinity
		if (dt !== 0) {
			this.velocity = dPos.clone().div(dt);
		}

		// update position
		this.position.add(dPos.mult(1 - this.options.resistance));

		// update position
		this.updateEl();

		lastTick = now;
		lastPos = currPos.clone();

		// recall frame
		reqAnimFrame(frame);
	}.bind(this);

	/**
	 * Start the dragging process
	 * @param  {Number} x Position on the x axis
	 * @param  {Number} y Position on the y axis
	 */
	this.start = function(x, y) {
		this.isDragging = true;

		currPos  = new Vec2D(x, y);
		lastPos  = currPos.clone();
		lastTick = dateNow();

		reqAnimFrame(frame);
	}.bind(this);

	/**
	 * Update the position
	 * @param  {Number} x Position on the x axis
	 * @param  {Number} y Position on the y axis
	 */
	this.move = function(x, y) {
		if (this.isDragging) {
			currPos = new Vec2D(x, y);
		}
	}.bind(this);

	/**
	 * Stop dragging process
	 */
	this.end = function() {
		this.isDragging = false;
	}.bind(this);

	/**
	 * Register a callback that is called on update of the position
	 */
	this.onUpdate = function(cb) {
		callbacks.push(cb);
	};

	/**
	 * Update the style of the element
	 * @return {[type]} [description]
	 */
	this.updateEl = function() {
		callbacks.forEach(function(cb) {
			cb(this.position, this.velocity);
		}.bind(this));
	}.bind(this);

};

module.exports = Rotator;
