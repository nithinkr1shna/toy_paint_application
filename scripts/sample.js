mode = "pencil"
isDragging = false;

var startX; 
var startY;
var mouseX;
var mouseY;
var curColor = "black";
var startXArray = new Array();
var startYArray = new Array();
var widthArray = new Array();
var heightArray = new Array();
var pencilClickX = new Array();
var pencilClickY = new Array();
var pencilDrag = new Array();
var modes = new Array();
init();



//Event listener for clear
function init(){
  document.getElementById("clear").addEventListener("click",clear,false);
	
	
}


var canvas = document.getElementById("b");
if(!canvas){
	console.log("no canvas found");
}else{
    var ctx = canvas.getContext('2d');
    ctx.lineWidth= 2;   

    
}

//setting mode as per selection
//c hange this to some thig more convenient



function set_color(colour){
	console.log("color setting to", colour);
	color = curColor;
}

function set_rect(){
	    mode = "rectangle";
}

function set_circle(){
    mode= "circle";
}
function set_line(){
	mode = "lin";
}

function set_sqr(){
    mode= "square";
}
function set_pencil(){
	mode = "pencil";
}



function clear(){

	ctx.clearRect(0,0, canvas.width, canvas.height);
	startXArray.length =0;
	startYArray.length =0;
	widthArray.length =0;
	heightArray.length =0;
	modes.length = 0;
	pencilClickX.length  =0;
	pencilClickY.length =0;
	pencilDrag.length = 0;
	console.log("clear");
}


canvas.onmousedown = function(e){


    startX = e.pageX - this.offsetLeft;
    startY = e.pageY - this.offsetTop;
    console.log(startX, startY);

    //stores starting position 
    startXArray.push(startX);
    startYArray.push(startY);
    if(mode == "pencil"){
    	addClick(startX, startY);
    }


    isDragging = true;
    console.log(isDragging);

}

canvas.onmouseup = function(e){
	isDragging = false;
	console.log(isDragging);

	//storing last position @mouseup
	widthArray.push(mouseX);
	heightArray.push(mouseY);
	modes.push(mode);
}

canvas.onmousemove = function(e){

	console.log("move");
	if(isDragging){
		mouseX = (e.pageX - this.offsetLeft)- startX;
	    mouseY = (e.pageY - this.offsetTop) - startY;
	    if(mode == "pencil"){
	    	addClick(mouseX+startX, mouseY+startY, true);

	    }
	    ctx.clearRect(0,0, canvas.width, canvas.height);
	    draw();

	}
	drawOldShapes();

}


function addClick(mouseX, mouseY, dragging){
	pencilClickX.push(mouseX);
	pencilClickY.push(mouseY);
	pencilDrag.push(dragging);

}

function draw(){

	switch(mode){
		case "rectangle":
		    drawRectangleOrSquare(startX, startY, mouseX, mouseY);
		    break;

		case "square":
		    drawRectangleOrSquare(startX, startY, mouseX, mouseX);
		    break;

		case "circle":
		    drawCircle(startX,startY,Math.abs(startX-mouseX));  //context.arc(x,y,radius,sAngle,eAngle,counterclockwise);
		    break;


		case "pencil" :
		    drawPencil();
		    break;

	}
}

function drawOldShapes(){

	console.log("Drawing old shapes");
	console.log(startYArray.length);
	for( var i= 0; i< startYArray.length ;i++){
		switch(modes[i]){

			case "rectangle":
			    
		        drawRectangleOrSquare(startXArray[i], startYArray[i], widthArray[i], heightArray[i]);
		        break;

		    case "square":
		        drawRectangleOrSquare(startXArray[i], startYArray[i],widthArray[i], widthArray[i]);
		        break;


		    case "circle":
		        drawCircle(startXArray[i], startYArray[i], Math.abs(startXArray[i] -widthArray[i]));
		        break;


		    case "pencil":
		        drawPencil();
		        break;




		}
	}
	

}


function drawCircle(x,y,radius){
	console.log("circle");
	ctx.beginPath();
	ctx.arc(x,y,radius, 0, 2*Math.PI);
	ctx.stroke();

}


function drawRectangleOrSquare(x, y, width, height){

	console.log("rectangle");
	ctx.beginPath();
	ctx.rect(x,y, width, height);
	ctx.stroke();
}

function drawPencil(){

    console.log("pencil");

    

    for( var i=0; i<pencilClickX.length; i++){
    	ctx.beginPath();
    	if(pencilDrag[i] && i){
    		ctx.moveTo(pencilClickX[i-1], pencilClickY[i-1]);
    	}else{
    		ctx.moveTo(pencilClickX[i] -1, pencilClickY[i] -1);
    	}
    	ctx.lineTo(pencilClickX[i], pencilClickY[i]);
    	ctx.closePath();
    	ctx.stroke();
    }
	    

}

