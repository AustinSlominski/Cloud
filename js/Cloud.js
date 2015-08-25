//Box/Poly Method w/ Objects

var Cloud = function(point) {
	//Center Point
	this.origin = point;
	this.outerBound = new Size(300,200);
	this.RoM = 10;

	var numsides = 15;
	var scalingFactor = new Point(1,this.outerBound.height/this.outerBound.width);

	var cloud = new Path.RegularPolygon({
		center: this.origin,
		sides: numsides,
		radius: this.outerBound.width/2,
		strokeColor: 'black'
	});

	cloud.scaling = scalingFactor;

	for(var i=0;i<numsides;i++){
	    var px = cloud.segments[i].point.x;
	    var py = cloud.segments[i].point.y;

	    var x = Math.floor(Math.random()*( (px+this.RoM)-(px-this.RoM)+1 ) + (px-this.RoM) );
	    var y = Math.floor(Math.random()*( (py+this.RoM)-(py-this.RoM)+1 ) + (py-this.RoM) );

	    var tmpP = new Point(x,y);
	    cloud.segments[i].point = tmpP;
	}
}

new Cloud(new Point(300,300));
//poly.smooth();