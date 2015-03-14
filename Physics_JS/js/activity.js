define(function (require) {

var activity = require("sugar-web/activity/activity");

                    /* Manipulate the DOM only when it is ready. */
               require(['domReady!'], function (doc) {

                    /*Initialize the activity. */
                   activity.setup();
        
       

/*Method to return my DOM by Id */
var doM= function( id ) { return document.getElementById( id ); };     


/*declare all the variables... */
var wheel_canvas = doM("wheel_canvas"),
    ctx = wheel_canvas.getContext("2d");
    wheel_canvas.width = 120;
    wheel_canvas.height = 120;
   
var mass_exp_canvas=doM('mass_exp_canvas'),
    ctx2=mass_exp_canvas.getContext('2d');
    mass_exp_canvas.width=window.innerWidth*0.6;
    mass_exp_canvas.height=window.innerHeight;

var polySide = 10,
    polygons = [],
    windowCX = 55,
    windowCY = 55,
    windowA = 0,
    angularVelo=10,
   

    wheel_timer,
    mass_timer,
    start=true,

    mass1=10,
    mass2=10,

    mass_array=[];

    planet_surfaces=new Array('#55b527','red','#BA8816',
    	                        'rgba(180, 44, 2, 0.98)','#E9D3DB',
    	                        'blue','yellow'),
    surface_color_index=0,
    planets=new Array('Earth','Mars','Venus',
    	              'Jupitar','Moon','Saturn',
    	               'Mercury'),
    acclGravities = new Array(10,1.62,3.71,24.79,1.22,0.5,14.3),
    i_planet=0,
    time=0,
    gravity_factor=10;
    current_gravity=acclGravities[0];

    current_planet=planets[i_planet];

var pulley1_X = 500,
	Pulley2_X = 700,
	pulley_Y = 105,
	pulley_dist = 40,
	angulardisplacement = 0;    





    InitialColors = new Array("#97834a", "#97834a", "#EEEEEE");
	FinishingColor = new Array("#FAEBD7", "#FAEBD7", "#FFFFFF");

/* End of variables declaration */



/* Increase or Decrease number of spokes in wheel*/
function changeSpoke(spokes){
   polySide+=spokes;
}

/*  Increase or Decrease angular speed of wheel */
function changeAngularSpeed(speed){
	angularVelo+=speed;
}

/* Polygon/Wheel Object */
function polygonPar() {
    this.x = windowCX;
    this.y = windowCY;
    this.r = 50;
    this.c = "rgba(0,0,0,1)"; 
    this.w = 3; 
}

/*Wheel Object is being pushed to polygons array */
polygons.push(new polygonPar());


/* Redering Hnadler of polygons in wheel */
function polygonRender() {

   	for(var i=0;i<1;i++) {
       
        for(var j=0;j<polySide;j++) {
            ctx.beginPath();
			ctx.moveTo(windowCX,windowCY);
            ctx.lineTo(windowCX+polygons[i].r*Math.cos((windowA+j*360/polySide)*Math.PI/180),
            	windowCY+polygons[i].r*Math.sin((windowA+j*360/polySide)*Math.PI/180));

            ctx.arc(windowCX,windowCY,polygons[i].r,(windowA+j*360/polySide)*Math.PI/180,
            	   (windowA+(j+1)*360/polySide)*Math.PI/180);

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

/*Call render & do rendering */
function render() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	polygonRender();
	windowA++;
}







/* Mass A Object  */
function massA(){
	this.x=mass_exp_canvas.width/3;
	this.y=100;
	this.r=30;
	this.mass=10;
}

/*Mass B Object */
function massB(){
	this.x=mass_exp_canvas.width/3+100;
	this.y=100;
	this.r=30;
	this.mass=10;
}

mass_array.push(new massA());
mass_array.push(new massB());
m1=mass_array[0];
m2=mass_array[1];


/*Draw Mass A */
function drawMass1(){
	
	ctx2.beginPath();
    ctx2.arc(m1.x,m1.y,m1.r,0,2*Math.PI);
    ctx2.fillStyle="#343C41";
    ctx2.fill();
    ctx2.fillStyle='white';
    ctx2.font='bold 15px Arial';
    ctx2.textAlign='center';
    ctx2.fillText(m1.mass+'kg',m1.x,m1.y);

}

/* Draw Mass B */
function drawMass2(){
	
	var x=mass_exp_canvas.width/3+100;
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

/* Creating Two Pulleys  */
function DrawPulleys(){
	ctx2.lineWidth = 10;
	//ctx2.strokeStyle = "#000000";
	ctx2.strokeStyle='#1D142F'
	ctx2.save();
	ctx2.translate(pulley1_X, pulley_Y);
	ctx2.rotate(angulardisplacement);
	ctx2.beginPath();
	ctx2.arc(0, 0, pulley_dist, 0, 2*Math.PI);
	ctx2.moveTo(0, 0-pulley_dist);
	ctx2.lineTo(0, 0+pulley_dist);
	ctx2.moveTo(0-pulley_dist, 0);
	ctx2.lineTo(0+pulley_dist, 0);
	ctx2.moveTo(0-pulley_dist*Math.cos(Math.PI/4), 0-pulley_dist*Math.sin(Math.PI/4));
	ctx2.lineTo(0+pulley_dist*Math.cos(Math.PI/4), 0+pulley_dist*Math.cos(Math.PI/4));
	ctx2.moveTo(0-pulley_dist*Math.cos(Math.PI/4), 0+pulley_dist*Math.sin(Math.PI/4));
	ctx2.lineTo(0+pulley_dist*Math.cos(Math.PI/4), 0-pulley_dist*Math.cos(Math.PI/4));
	ctx2.stroke();
	ctx2.closePath();
	ctx2.restore();
	
	ctx2.save();
	ctx2.translate(pulley1_X, pulley_Y);
	ctx2.rotate(angulardisplacement);
	ctx2.beginPath();
	ctx2.arc(0, 0, pulley_dist, 0, 2*Math.PI);
	ctx2.moveTo(0, 0-pulley_dist);
	ctx2.lineTo(0, 0+pulley_dist);
	ctx2.moveTo(0-pulley_dist, 0);
	ctx2.lineTo(0+pulley_dist, 0);
	ctx2.moveTo(0-pulley_dist*Math.cos(Math.PI/4), 0-pulley_dist*Math.sin(Math.PI/4));
	ctx2.lineTo(0+pulley_dist*Math.cos(Math.PI/4), 0+pulley_dist*Math.cos(Math.PI/4));
	ctx2.moveTo(0-pulley_dist*Math.cos(Math.PI/4), 0+pulley_dist*Math.sin(Math.PI/4));
	ctx2.lineTo(0+pulley_dist*Math.cos(Math.PI/4), 0-pulley_dist*Math.cos(Math.PI/4));
	ctx2.stroke();
	ctx2.closePath();
	ctx2.restore();
	
	//ctx2.fillStyle = "#000000";
	ctx2.fillStyle="#242C2C";
	ctx2.fillRect(pulley1_X-.1*pulley_dist, pulley_Y-0.3*pulley_dist, 1.3*pulley_dist, 0.6*pulley_dist);
	ctx2.fillRect(pulley2_X-1.2*pulley_dist, pulley_Y-0.3*pulley_dist, 1.3*pulley_dist, 0.6*pulley_dist);
	ctx2.fillRect(pulley1_X+1.2*pulley_dist, pulley_Y-0.15*pulley_dist, pulley2_X - pulley1_X - 1.4*pulley_dist, 0.3*pulley_dist);
	
	ctx2.fillStyle = "#c0c0c0";
	ctx2.beginPath();
	ctx2.arc(Pulley1_X, pulley_Y, 4, 0, 2*Math.PI);
	ctx2.closePath();
	ctx2.fill();
	ctx2.beginPath();
	ctx2.arc(Pulley2_X, pulley_Y, 4, 0, 2*Math.PI);
	ctx2.closePath();
	ctx2.fill();

}





/* Draw Planet Surface */
function drawPlanetSurface(surface_color_index){
	var gravity_index=surface_color_index;
	ctx2.fillStyle=planet_surfaces[surface_color_index];
	ctx2.fillRect(0,450,mass_exp_canvas.width,mass_exp_canvas.height);
	
	current_gravity=acclGravities[gravity_index];
}




/* Draw mass_exp_canvas */
 function drawPlay2(){
    drawPlanetSurface(i_planet%7);
  
    
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


/* This is called when drop button is cliked */
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
    m1.y+=0.5*(current_gravity/gravity_factor)*time*time;



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

    m2.y+=0.5*(current_gravity/gravity_factor)*time*time;

    if(m1.y+30>=450 || m2.y+30>=450){
	   m1.y=440;m2.y=440;
    }

   time+=0.10;

}

/* This is called when Reser button is clicked */
function resetPhysics(){
  
 clearInterval(mass_timer);
 m1.y=100;
 m2.y=100;
 time=0;

 drawPlay2();

}

/* Invoke functions.. */
wheel_timer=setInterval(render,angularVelo);
drawPlay2();
DrawPulleys();
/*End of calling functions */



/*Set of eventListeners for click etc */

// what happens when Drop button is clicked ?
doM('dropmasses').addEventListener('click',function(){
   time=0;
 mass_timer=setInterval(dropMasses,10);

});

//what happens when Reset button is clicked
doM('resetmasses').addEventListener('click',function(){
    resetPhysics();
      
});

//what happens when you increase no. of spokes?
doM('spokeP').addEventListener('click',function(){
changeSpoke(1);
});

//what happens when you decrease no. of spokes?
doM('spokeM').addEventListener('click',function(){
changeSpoke(-1);
});

//what happens when Stop button of wheel is clicked ?
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

//what happens when you increase speed of wheel ?
doM('speedP').addEventListener('click',function(){

angularVelo--;
});

//what happens when you decrease speed of wheel ?
doM('speedM').addEventListener('click',function(){
angularVelo++;
});

//what happens when you increase mass A
doM('massAP').addEventListener('click',function(){
   m1.mass++;
   drawMass1();
});

//what happens when u decrease mass A
doM('massAM').addEventListener('click',function(){
	 
    if(m1.mass>=1)
      m1.mass--;
   

   drawMass1();
});

//what happens when you increase mass B
doM('massBP').addEventListener('click',function(){

  m2.mass++;
  drawMass2();
});

//what happens when you decrease mass B
doM('massBM').addEventListener('click',function(){
 	
 	if(m2.mass>=1)
 		m2.mass--;
   
   drawMass2();
});

//what happens when planets are switched
doM('planet').innerHTML=current_planet;
doM('planet').addEventListener('click',function(){

i_planet++;
current_planet=planets[i_planet%7];
doM('planet').innerHTML=current_planet;

resetPhysics();

//drawPlanetSurface(i_planet%7);
})

/* End of event listeners list */





    });

});
