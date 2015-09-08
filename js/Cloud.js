//Box/Poly Recursive Method with Motion
var Clouds = [];

var Cloud = function(point) {
	var originCenter = point;
	var initBound = new Size(500,500); 
	
	var color = '#'+Math.floor(Math.random()*16777215).toString(16); 
	var numsides = 6;
	var subLevel = 2;
	var scalingFactor = new Point(1,initBound.height/initBound.width);

	var cloud = new Path.RegularPolygon({
		center: originCenter,
		sides: numsides,
		radius: initBound.width/2,
		strokeColor: 'black'
	});

	cloud.scaling = scalingFactor;

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

	cloud.fullySelected = true;
	//cloud.smooth();	
	this.path = cloud;
}

Cloud.prototype.checkIntersections = function() {
	for(var i=0;i<Clouds.length;i++){
		if(this.path !== Clouds[i].path){ //prevents from checking intersections on itself
			var intersections = this.path.getIntersections(Clouds[i].path);
			console.log(intersections[0].path);
			return intersections;
		}
	}
}

function compoundClouds(clouds,intersections) { // group of clouds and the collection of intersections

}

for(var i=0;i<2;i++){
	cloud = new Cloud(new Point(view.size.width/2-200+(i*100),view.size.height/2));
	Clouds.push(cloud);
}

//function onFrame(event) {
	for(var i=0;i<Clouds.length;i++){
		var intersection = Clouds[i].checkIntersections();
		if(intersection.length > 0){
			compoundClouds();
		}
	}
//}


