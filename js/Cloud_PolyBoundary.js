//Box/Poly Method

var outerBound = new Size(300,220);
var outerBoundBox = new Path.Rectangle(new Point(view.size.width/2-outerBound.width/2,view.size.height/2-outerBound.height/2),outerBound);

var center = new Point(outerBoundBox.bounds.center.x,outerBoundBox.bounds.center.y);
var numSides = 15;
var RoM = 10;

var poly = new Path.RegularPolygon(center,numSides,outerBound.width/2);
var scalingFactor = new Point(1,outerBound.height/outerBound.width);
poly.scaling = scalingFactor;

for(var i=0;i<numSides;i++){
    var px = poly.segments[i].point.x;
    var py = poly.segments[i].point.y;

    var x = Math.floor(Math.random()*( (px+RoM)-(px-RoM)+1 ) + (px-RoM) );
    var y = Math.floor(Math.random()*( (py+RoM)-(py-RoM)+1 ) + (py-RoM) );

    var tmpP = new Point(x,y);
    poly.segments[i].point = tmpP;
}

poly.strokeColor = 'black';
outerBoundBox.strokeColor = 'red';

//poly.smooth();


/*
Stages of subdivision. Each iteration will have a lower RoM from there. More complex, organic shapes.
*/