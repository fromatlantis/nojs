function Star(id, x, y, ctx){
	this.id = id;
	this.x = x;
	this.y = y;
	this.r = Math.floor(Math.random()*2)+1;
	var alpha = (Math.floor(Math.random()*10)+1)/10/2;
	this.color = "rgba(255,255,255,"+alpha+")";
	this.ctx = ctx;
}

Star.prototype.draw = function() {
	this.ctx.fillStyle = this.color;
	this.ctx.shadowBlur = this.r * 2;
	this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
	this.ctx.closePath();
	this.ctx.fill();
}

Star.prototype.move = function() {
	this.y -= .15;
	if (this.y <= -10) this.y = document.documentElement.clientHeight + 10;
	this.draw();
}

Star.prototype.die = function() {
    stars[this.id] = null;
    delete stars[this.id];
}
module.exports = Star;