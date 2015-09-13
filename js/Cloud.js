//Box/Poly Recursive Method with Motion
var clouds = [];
var grps = [];

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
	this.path = cloud;
}

Cloud.prototype.checkIntersection = function() {
	for(var i=0;i<clouds.length;i++){
		if(this.path !== clouds[i].path){
			if(this.path.intersects(clouds[i].path)){
				tmpGrp = [this.path,clouds[i].path]; // need sorted groups
				groupClouds(tmpGrp);
			}
		}
	}
}

function groupClouds(tmpGrp){
	if(grps.length > 0){
		for(var i=0;i<grps.length;i++){
			if(tmpGrp !== grps[i]){ //if tmp group doesn't match any other existing group
				grps[i] = tmpGrp;
			}
		}
	}else{
		grps[0] = tmpGrp;
	}
	console.log(grps);
}

for(var i=0;i<2;i++){
	cloud = new Cloud(new Point(view.size.width/2-200+(i*100),view.size.height/2));
	clouds.push(cloud);
}

for(var i=0;i<clouds.length;i++){
	clouds[i].checkIntersection();
}

