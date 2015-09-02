//Box/Poly Method w/ Objects
var colorb = '#'+Math.floor(Math.random()*16777215).toString(16); 
var background = new Shape.Rectangle({
    rectangle: view.bounds,
    fillColor: colorb
});
//Width is slightly off because the radius of the cloud refers to the distance to the points
var Cloud = function(point) {
	this.origin = point;
	this.initBound = new Size(800,600); 
	
	var color = '#'+Math.floor(Math.random()*16777215).toString(16); 
	var numsides = 6;
	var scalingFactor = new Point(1,this.initBound.height/this.initBound.width);

	var cloud = new Path.RegularPolygon({
		center: this.origin,
		sides: numsides,
		radius: this.initBound.width/2,
		strokeColor: 'black',
		fillColor: color
	});

	cloud.scaling = scalingFactor;

	var initBoundBox = new Path.Rectangle({
		point: new Point(point.x-this.initBound.width/2,point.y-this.initBound.height/2),
		size: this.initBound
		//strokeColor: 'red'
	});

	var subLevel = 10;

	for(var i=0;i<subLevel;i++){
		
		var RoM = cloud.curves[i].length/1.5;
		//starts by checking the original length, before subdivision

		//RANDOMIZE
		for(var j=0;j<cloud.segments.length-1;j++){
		    var px = cloud.segments[j].point.x;
		    var py = cloud.segments[j].point.y;

		    var x = Math.floor(Math.random()*( (px+RoM)-(px-RoM)+1 ) + (px-RoM) );
		    var y = Math.floor(Math.random()*( (py+RoM)-(py-RoM)+1 ) + (py-RoM) );

		    var tmpP = new Point(x,y);
		    cloud.segments[j].point = tmpP;
		}

		for(var j=0;j<cloud.segments.length;j+=2){	
			cloud.curves[j].divide();
		}	
	}

	//cloud.fullySelected = true;
	cloud.smooth();
}

new Cloud(new Point(view.size.width/2,view.size.height/2));
new Cloud(new Point(300,500));
new Cloud(new Point(700,800));
new Cloud(new Point(500,200));