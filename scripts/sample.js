mode = "pencil"
isDragging = false;

var startX; 
var startY;
var mouseX;
var mouseY;
var startXArray = new Array();
var startYArray = new Array();
var widthArray = new Array();
var heightArray = new Array();
var modes = new Array();
init();



//listener for clear
function init(){
	var clr = document.getElementById("clear");
	if(clr.addEventListener)
		clr.addEventListener("click",clear,false);
	else
		cle.attachEvent('onClick',clear);
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



function clear(){

	ctx.clearRect(0,0, canvas.width, canvas.height);
	startXArray.length =0;
	startYArray.length =0;
	widthArray.length =0;
	heightArray.length =0;
	modes.length = 0;
	console.log("clear");
}


canvas.onmousedown = function(e){


    startX = e.pageX - this.offsetLeft;
    startY = e.pageY - this.offsetTop;
    console.log(startX, startY);

    //stores starting position 
    startXArray.push(startX);
    startYArray.push(startY);


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
	    ctx.clearRect(0,0, canvas.width, canvas.height);
	    draw();

	}
	drawOldShapes();

}

function draw(){

	switch(mode){
		case "rectangle":
		    console.log(startX, startY, mouseX, mouseY);
		    ctx.beginPath();
		    ctx.rect(startX, startY, mouseX, mouseY);
		    ctx.stroke();
		    break;

		case "square":
		    ctx.beginPath();
		    ctx.rect(startX, startY, mouseX, mouseX);
		    ctx.stroke();
		    break;

		case "circle":
		    ctx.beginPath();
		    ctx.arc(startX,startY,Math.abs(startX-mouseX),0, 2*Math.PI);  //context.arc(x,y,radius,sAngle,eAngle,counterclockwise);
		    ctx.stroke();
		    break;

		case "line":
		    ctx.beginPath();
		    ctx.moveTo(startX, startY);
		    ctx.lineTo(mouseX, mouseY);
		    ctx.stroke();
		    break;
	}
}

function drawOldShapes(){

	console.log("Drawing old shapes");
	console.log(startYArray.length);
	for( var i= 0; i< startYArray.length ;i++){
		switch(modes[i]){

			case "rectangle":
			    console.log("rect");
		        ctx.beginPath();
		        ctx.rect(startXArray[i], startYArray[i], widthArray[i], heightArray[i]);
		        ctx.stroke();
		        break;

		    case "square":
		        console.log("squareeee", mode);
		        ctx.beginPath();
		        ctx.rect(startXArray[i], startYArray[i],widthArray[i], widthArray[i]);
		        ctx.stroke();
		        break;


		    case "circle":
		        console.log("circle");
		        ctx.beginPath();
		        ctx.arc(startXArray[i], startYArray[i], Math.abs(startXArray[i] -widthArray[i]), 0, 2*Math.PI);
		        ctx.stroke();
		        break;


		    case "line":
		        console.log("line", startXArray[i],startYArray[i], widthArray[i], heightArray[i]);
		        ctx.beginPath();
		        ctx.moveTo(startXArray[i], startYArray[i]);
		        ctx.lineTo(widthArray[i], heightArray[i]);
		        ctx.closePath();
		        break;
		}
	}
}