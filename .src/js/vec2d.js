var Vec2D = function(x, y) {
	this.x = x || 0;
	this.y = y || 0;

	this.add = function(vec) {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	}.bind(this);

	this.sub = function(vec) {
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	}.bind(this);

	this.mult = function(i) {
		this.x *= i;
		this.y *= i;
		return this;
	}.bind(this);

	this.div = function(i) {
		this.x /= i;
		this.y /= i;
		return this;
	}.bind(this);

	this.mag = function() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}.bind(this);

	this.normalize = function() {
		var mag = this.mag();
		if (mag !== 0) {
			this.div(mag);
		}
		return this;
	}.bind(this);

	this.equals = function(vec) {
		return this.x === vec.x && this.y === vec.y;
	}.bind(this);

	/**
	 * Clone Vector
	 * @return {Vec2D} Cloned vector
	 */
	this.clone = function() {
		return new Vec2D(this.x, this.y);
	}.bind(this);

	this.toString = function() {
		return this.x + ", " + this.y;
	}.bind(this);


};

Vec2D.sum = function(v1, v2) {
	return new Vec2D(v1.x + v2.x, v1.y + v2.y);
};

Vec2D.diff = function(v1, v2) {
	return new Vec2D(v1.x - v2.x, v1.y - v2.y);
};

Vec2D.product = function(v1, v2) {
	return new Vec2D(v1.x * v2.x, v1.y * v2.y);
};


module.exports = Vec2D;
