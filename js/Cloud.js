var outSize = new Size(600,600);
var inSize = new Size(200,200);

var numPoints = 200;

var outerLimit = new Path.Rectangle(new Point(view.size.width/2-outSize.width/2,view.size.height/2-outSize.height/2),outSize);
var innerLimit = new Path.Rectangle(new Point(view.size.width/2-inSize.width/2,view.size.height/2-inSize.height/2),inSize);
outerLimit.selected = true;
innerLimit.selected = true;
innerLimit.fillColor = '#e9e9ff';

var path = new Path();

for(var i=0;i<numPoints;i++){
    var x = Math.floor(Math.random()*(outerLimit.bounds.right-outerLimit.bounds.left+1)+outerLimit.bounds.left);
    var y = Math.floor(Math.random()*(outerLimit.bounds.bottom-outerLimit.bounds.top+1)+outerLimit.bounds.top);

    while(x > innerLimit.bounds.left && x < innerLimit.bounds.right && y > innerLimit.bounds.top && y < innerLimit.bounds.bottom){
        x = Math.floor(Math.random()*(outerLimit.bounds.right-outerLimit.bounds.left+1)+outerLimit.bounds.left);
        y = Math.floor(Math.random()*(outerLimit.bounds.bottom-outerLimit.bounds.top+1)+outerLimit.bounds.top);
    }
    
    var point = new Point(x,y);
    var pointLoc = new Path.Rectangle(new Point(point.x-2,point.y-2),new Size(4,4));
    pointLoc.fillColor = 'black';
    pointLoc.smooth();
    //path.add(point);
}
//path.smooth();
path.strokeColor = 'black';