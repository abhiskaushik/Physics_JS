define(function (require) {
    var activity = require("sugar-web/activity/activity");

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();
        
        //returns my DOM by Id 
var doM= function( id ) { return document.getElementById( id ); };     


var canvas = doM("playground1");
var ctx = canvas.getContext("2d");




canvas.width = 120;
canvas.height = 120;

var polySide = 10;
var polygons = [];
var windowCX = 55;
var windowCY = 55;
var windowA = 0;
var angularVelo=10;


    InitialColors = new Array("#97834a", "#97834a", "#EEEEEE");
	FinishingColor = new Array("#FAEBD7", "#FAEBD7", "#FFFFFF");


function changeSpoke(spokes){
   polySide+=spokes;
}
function changeAngularSpeed(speed){
	angularVelo+=speed;
}

function polygonPar() {
    this.x = windowCX;
    this.y = windowCY;
    this.r = 50;//5 * entity.r;
    this.c = "rgba(0,0,0,1)"; //lineColour
    this.w = 3;  //width
}

polygons.push(new polygonPar());

function polygonRender() {
	for(var i=0;i<1;i++) {
        for(var j=0;j<polySide;j++) {
            ctx.beginPath();
			ctx.moveTo(windowCX,windowCY);
            ctx.lineTo(windowCX+polygons[i].r*Math.cos((windowA+j*360/polySide)*Math.PI/180),windowCY+polygons[i].r*Math.sin((windowA+j*360/polySide)*Math.PI/180));

            ctx.arc(windowCX,windowCY,polygons[i].r,(windowA+j*360/polySide)*Math.PI/180,(windowA+(j+1)*360/polySide)*Math.PI/180);

			ctx.lineTo(windowCX,windowCY);
            ctx.strokeStyle = polygons[i].c;
            ctx.lineWidth = polygons[i].w;
            ctx.stroke();
			ctx.fillStyle = (j%2)?"rgb(0,0,0)":"rgb(255,255,255)";
			ctx.fill();
            ctx.closePath();
        }
	}
}

function render() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	polygonRender();
	windowA++;
}

var wheel_timer=setInterval(render,angularVelo);

//wheel variable..
var start=true;

doM('spokeP').addEventListener('click',function(){
changeSpoke(1);
});
doM('spokeM').addEventListener('click',function(){
changeSpoke(-1);
});
doM('stop_wheel').addEventListener('click',function(){
if(start==true){
clearInterval(wheel_timer);
doM('stop_wheel').innerHTML='Start Wheel';
start=false;
}
else{
doM('stop_wheel').innerHTML='Stop Wheel';
 wheel_timer=setInterval(render,angularVelo);
 start=true;
}
});
doM('speedP').addEventListener('click',function(){

angularVelo--;
});
doM('speedM').addEventListener('click',function(){
angularVelo++;

});


var canvas2=doM('playground2'),
    ctx2=canvas2.getContext('2d');
    canvas2.width=window.innerWidth*0.6;
    canvas2.height=window.innerHeight;


var mass1=10;
var mass2=10;

var mass_array=[];

function massA(){
	this.x=canvas2.width/3;
	this.y=100;
	this.r=30;
	this.mass=10;
}

function massB(){
	this.x=canvas2.width/3+100;
	this.y=100;
	this.r=30;
	this.mass=10;
}

mass_array.push(new massA());
mass_array.push(new massB());
var m1=mass_array[0];
var m2=mass_array[1];

function drawMass1(){
	//var m1=mass_array[0];
	var x=canvas2.width/3;
	var y=100;
	ctx2.beginPath();
    ctx2.arc(m1.x,m1.y,m1.r,0,2*Math.PI);
    ctx2.fillStyle="#343C41";
    ctx2.fill();
    ctx2.fillStyle='white';
    ctx2.font='bold 15px Arial';
    ctx2.textAlign='center';
    ctx2.fillText(m1.mass+'kg',m1.x,m1.y);

}

function drawMass2(){
	//var m2=mass_array[1];
	var x=canvas2.width/3+100;
	var y=100;
	ctx2.beginPath();
    ctx2.arc(m2.x,m2.y,m2.r,0,2*Math.PI);
    ctx2.fillStyle="#343C41";
    ctx2.fill();
    ctx2.fillStyle='white';
    ctx2.font='bold 15px Arial';
    ctx2.textAlign='center';
    ctx2.fillText(m2.mass+'kg',m2.x,m2.y);


 }

var planet_surfaces=new Array('#55b527','#55b527','red','#BA8816','rgba(180, 44, 2, 0.98)','#E9D3DB','blue','yellow','pink');
var surface_color_index=0;
function drawPlanetSurface(surface_color_index){
	
	ctx2.fillStyle=planet_surfaces[surface_color_index];
	ctx2.fillRect(0,450,canvas2.width,canvas2.height);
}





 function drawPlay2(){
      drawPlanetSurface(0);
  
    
    var skyIndex=0;
	var TopSkyColor = new Array("#82CAFF", "#82CAFF", "#82CAFF");
	var BottomSkyColor = new Array("#CCFFFF", "#FFCC00", "#FFFFFF");
  
    var grd=ctx2.createLinearGradient(0,0,0,500);
	grd.addColorStop(0,TopSkyColor[skyIndex]);
	grd.addColorStop(1,BottomSkyColor[skyIndex]);

	ctx2.fillStyle=grd;
	ctx2.fillRect(0,0,930,470)
 drawMass1();
 drawMass2();

}








drawPlay2();

doM('massAP').addEventListener('click',function(){
  //mass1++;
   m1.mass++;
   drawMass1();
});
doM('massAM').addEventListener('click',function(){
  //mass1--;
   m1.mass--;
   drawMass1();

});
doM('massBP').addEventListener('click',function(){
  //mass2++; 
  m2.mass++;
  drawMass2();

});
doM('massBM').addEventListener('click',function(){
  //mass2--;
  m2.mass--;
   drawMass2();

})

//switch planets on click..

var planets=new Array('Earth','Mars','Venus','Jupitar','Moon','Saturn','Neptune','Mercury');
var i_planet=0;
doM('planet').innerHTML=planets[i_planet++];
doM('planet').addEventListener('click',function(){

 if(i_planet>7)
 	 i_planet=0;

doM('planet').innerHTML=planets[i_planet++];
//i_planet++;


drawPlanetSurface(i_planet);

})
// v=gt;
var time=0;
function dropMasses(){

      drawPlay2();
    var skyIndex=0;
	var TopSkyColor = new Array("#82CAFF", "#82CAFF", "#82CAFF");
	var BottomSkyColor = new Array("#CCFFFF", "#FFCC00", "#FFFFFF");
  
    var grd=ctx2.createLinearGradient(0,0,0,500);
	grd.addColorStop(0,TopSkyColor[skyIndex]);
	grd.addColorStop(1,BottomSkyColor[skyIndex]);

	ctx2.fillStyle=grd;
	ctx2.fillRect(m1.x-m1.r,m1.y-m1.r,60,60);



ctx2.beginPath();
ctx2.arc(m1.x,m1.y,m1.r,0,2*Math.PI);
ctx2.fillStyle="#343C41";
ctx2.fill();
ctx2.fillStyle='white';
ctx2.font='bold 15px Arial';
ctx2.textAlign='center';
ctx2.fillText(m1.mass+'kg',m1.x,m1.y);
//m1.x++;
m1.y+=0.5*1*time*time;



     ctx2.fillStyle=grd;
	ctx2.fillRect(m2.x-m2.r,m2.y-m2.r,60,60);

ctx2.beginPath();
ctx2.arc(m2.x,m2.y,m2.r,0,2*Math.PI);
ctx2.fillStyle="#343C41";
ctx2.fill();
ctx2.fillStyle='white';
ctx2.font='bold 15px Arial';
ctx2.textAlign='center';
ctx2.fillText(m2.mass+'kg',m2.x,m2.y);

m2.y+=0.5*1*time*time;

if(m1.y+30>=450 || m2.y+30>=450){
	m1.y=440;m2.y=440;
}

time+=0.10;

}


function resetPhysics(){
  
 clearInterval(mass_timer);
 m1.y=100;
 m2.y=100;
 time=0;

 drawPlay2();


}


var mass_timer;
doM('dropmasses').addEventListener('click',function(){
  
mass_timer=setInterval(dropMasses,10);

});

doM('resetmasses').addEventListener('click',function(){
    resetPhysics();  
});



    });

});
