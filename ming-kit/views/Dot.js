function Dot(id, x, y, ctx, dots) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.r = Math.floor(Math.random()*5)+1;
	this.maxLinks = 2;
	this.speed = .5;
	this.a = .5;
	this.aReduction = .005;
	this.color = "rgba(255,255,255,"+this.a+")";
	this.linkColor = "rgba(255,255,255,"+this.a/4+")";
	this.ctx = ctx;
	this.dir = Math.floor(Math.random()*140)+200;
}

Dot.prototype.draw = function() {
	this.ctx.fillStyle = this.color;
	this.ctx.shadowBlur = this.r * 2;
	this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
	this.ctx.closePath();
	this.ctx.fill();
}

Dot.prototype.link = function() {
	if (this.id == 0) return;
	var previousDot1 = getPreviousDot(this.id, 1);
	var previousDot2 = getPreviousDot(this.id, 2);
	var previousDot3 = getPreviousDot(this.id, 3);
	if (!previousDot1) return;
	this.ctx.strokeStyle = this.linkColor;
	this.ctx.moveTo(previousDot1.x, previousDot1.y);
	this.ctx.beginPath();
	this.ctx.lineTo(this.x, this.y);
	if (previousDot2 != false) this.ctx.lineTo(previousDot2.x, previousDot2.y);
	if (previousDot3 != false) this.ctx.lineTo(previousDot3.x, previousDot3.y);
	this.ctx.stroke();
	this.ctx.closePath();
}

function getPreviousDot(id, stepback) {
	if (id == 0 || id - stepback < 0) return false;
	if (typeof window['dots'][id - stepback] != "undefined") return window['dots'][id - stepback];
	else return false;//getPreviousDot(id - stepback);
}

Dot.prototype.move = function() {
	this.a -= this.aReduction;
	if (this.a <= 0) {
		this.die();
		return
	}
	this.color = "rgba(255,255,255,"+this.a+")";
	this.linkColor = "rgba(255,255,255,"+this.a/4+")";
	this.x = this.x + Math.cos(degToRad(this.dir))*this.speed,
	this.y = this.y + Math.sin(degToRad(this.dir))*this.speed;

	this.draw();
	this.link();
}

Dot.prototype.die = function() {
    window['dots'][this.id] = null;
    delete window['dots'][this.id];
}

function degToRad(deg) {
	return deg * (Math.PI / 180);
}

module.exports = Dot;