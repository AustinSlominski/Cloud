//Box/Poly Method w/ Objects

//Width is slightly off because the radius of the cloud refers to the distance to the points
var Cloud = function(point) {
	this.origin = point;
	this.initBound = new Size(600,200); 
	this.RoM = 40;

	var numsides = 6;
	var scalingFactor = new Point(1,this.initBound.height/this.initBound.width);

	var cloud = new Path.RegularPolygon({
		center: this.origin,
		sides: numsides,
		radius: this.initBound.width/2,
		strokeColor: 'black'
	});

	cloud.scaling = scalingFactor;

	var initBoundBox = new Path.Rectangle({
		point: new Point(point.x-this.initBound.width/2,point.y-this.initBound.height/2),
		size: this.initBound,
		strokeColor: 'red'
	});

	for(var i=0;i<numsides;i++){
	    var px = cloud.segments[i].point.x;
	    var py = cloud.segments[i].point.y;

	    var x = Math.floor(Math.random()*( (px+this.RoM)-(px-this.RoM)+1 ) + (px-this.RoM) );
	    var y = Math.floor(Math.random()*( (py+this.RoM)-(py-this.RoM)+1 ) + (py-this.RoM) );

	    var tmpP = new Point(x,y);
	    cloud.segments[i].point = tmpP;
	}

	for(var i=0;i<cloud.segments.length-1;i++){
		var mdPnt = new Point((cloud.segments[i].point.x+cloud.segments[i+1].point.x)/2,(cloud.segments[i].point.y+cloud.segments[i+1].point.y)/2);	
		cloud.add(i,mdPnt);	//breaking here
	}	

	//cloud.smooth();
}

new Cloud(new Point(500,300));