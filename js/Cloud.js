var cloudArray = [];

var Cloud = function(origin) {
	var initBound = new Size(700,1000); 
	var color = '#'+Math.floor(Math.random()*16777215).toString(16); 
	var numsides = 2;
	var subLevel = 4;
	var scalingFactor = new Point(1,initBound.height/initBound.width);
	var cloud = new Path.RegularPolygon({
		center: origin,
		sides: numsides,
		radius: initBound.width/2,
		strokeColor: color
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
	this.path = cloud;
	this.numSeg = numsides*Math.pow(2,subLevel);
	cloud.smooth();
}

Cloud.prototype.move = function() {
	//Major formation movement (single direction, whole shape)
		this.path.position = this.path.position + Math.random();
		
	//Point Movement (outward from center in semirandom direction)
		for(var i=0;i<this.numSeg;i++){
			var RoM = 4;
			var segment = this.path.segments[i];
		    var px = segment.point.x;
		    var py = segment.point.y;
		    var x = Math.floor(Math.random()*( (px+RoM)-(px-RoM)+1 ) + (px-RoM) );
		    var y = Math.floor(Math.random()*( (py+RoM)-(py-RoM)+1 ) + (py-RoM) );
			segment.point.x = x;
			segment.point.y = y;
		}	
}	

function checkIntersection(cloud) {	//accepts a PATH or COMPOUNDPATH
	for(var i=0;i<cloudArray.length;i++){			
		if(cloud !== cloudArray[i].path){		
			if(cloud.intersects(cloudArray[i].path)){		
				tmpGrp = [cloud,cloudArray[i].path];
				//groupClouds(tmpGrp);
			}
		}
	}
}

function groupClouds(tmpGrp){	
	console.log(tmpGrp);
	var compCloud = new CompoundPath({
		children: [tmpGrp], //NOT WORKING
		fillColor: 'blue'
	});
	console.log(compCloud);
	checkIntersection(compCloud);
}

for(var i=0;i<5;i++){
	cloud = new Cloud(new Point(view.size.width/2-400+(i*190),view.size.height/2));
	cloudArray.push(cloud);
}

for(var i=0;i<cloudArray.length;i++){
	//checkIntersection(cloudArray[i].path);

/*
	var cloudID = new PointText({
		point: cloudArray[i].path.position,
		content: cloudArray[i].path.id,
		fillColor: 'black'
	});
*/
}

function onFrame(event) {
	for(var i=0;i<cloudArray.length;i++){
		cloudArray[i].move();
	}
}
