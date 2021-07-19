var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database,height;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  console.log(database);
  createCanvas(1200,600);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  var balloonRef = database.ref('height');
  balloonRef.on("value", readPosition, showError);
  textSize(20); 
  database.ref('height').set({
    'x':200,
    'y':450
  })
}

// function to display UI
function draw() {
  background(bg);
  
      if(keyDown(UP_ARROW)) 
      {
        if(height.y>0)
        {
          updateHeight(0,-10);
          balloon.addAnimation("hotAirBalloon",balloonImage2);
          balloon.scale=balloon.scale-0.01;
        }
      } 
      if(keyDown(DOWN_ARROW)) 
      {
        if(height.y<500)
        {
          updateHeight(0,10);
          balloon.addAnimation("hotAirBalloon",balloonImage2);
          balloon.scale=balloon.scale+0.01;
        }
      } 
      if(keyDown(LEFT_ARROW)) 
      {
        if(height.x>0)
        {
          updateHeight(-10,0);
          balloon.addAnimation("hotAirBalloon",balloonImage2);
        }
      } 
      if(keyDown(UP_ARROW)) 
      {
        if(height.x<1200)
        {
          updateHeight(10,0);
          balloon.addAnimation("hotAirBalloon",balloonImage2);
          
        }
      } 
  
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",40,40);
  drawSprites();
}

function updateHeight(x,y)
{ database.ref('height').set({
  'x':height.x+x,
  'y':height.y+y
})
}


function readPosition(data)
{
  height=data.val();
  console.log(height);
  balloon.x=height.x;
  balloon.y=height.y;
}
function showError()
{
  console.log("Error in writing in the database");
}