//Box/Poly Recursive Method with Motion
var Clouds = new Group();


var Cloud = function(point) {
	
	this.originCenter = point;
	this.initBound = new Size(500,500); 
	
	var color = '#'+Math.floor(Math.random()*16777215).toString(16); 
	var numsides = 6;
	var subLevel = 2;
	var scalingFactor = new Point(1,this.initBound.height/this.initBound.width);

	var cloud = new Path.RegularPolygon({
		center: this.originCenter,
		sides: numsides,
		radius: this.initBound.width/2,
		strokeColor: 'black'
		//fillColor: color
	});

	cloud.scaling = scalingFactor;

	var initBoundBox = new Path.Rectangle({
		point: new Point(point.x-this.initBound.width/2,point.y-this.initBound.height/2),
		size: this.initBound,
		strokeColor: 'red'
	});

	for(var i=0;i<subLevel;i++){
		var RoM = cloud.curves[i].length/2;

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

	var thisCloud = Clouds.addChild(cloud);
	cloud.fullySelected = true;
	//cloud.smooth();	
	//console.log(thisCloud.index);

	//for(var i=0;i<Clouds.)
	//var intersection = cloud.getIntersections();
}



new Cloud(new Point(view.size.width/2-200,view.size.height/2));
new Cloud(new Point(view.size.width/2+200,view.size.height/2));

console.log(Clouds);