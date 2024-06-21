//data variables
let vaccinationData; // variable to hold JSON file
let vaccinationHK; // variable to hold Hong Kong vaccination data (JSON)
let vaccinationUK; // variable to hold United Kingdom vaccination data (JSON)
let total_deathsData; // variable to hold total deaths in HK and UK (CSV)

//p5 canvas variables
let lineDimensions = [400];
let lineXPositions = [650, 700, 750, 800, 850, 900, 950, 1000];
let lineYPositions = [100, 200, 150, 250, 300, 350, 400];

// connect to pen plotter
const axi = new axidraw.AxiDraw();
let connected = false;


// preload() JSON data (vaccinations data)
function preload() {
  vaccinationData = loadJSON('vaccinations.json');

// preload() CSV data (total deaths)
  total_deathsData = loadTable('total_deaths.csv', "csv", "header"); 
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('IBM Plex Mono');
  textSize(13);

//----- PRINTING JSON DATA (VACCINATIONS) ------//
// Hong Kong vaccination data 
console.log(vaccinationData);
console.log(vaccinationData[93].country);
console.log(vaccinationData[93].data[0]);
// Hong Kong total vaccinations 2021-02-22
console.log(vaccinationData[93].data[0].total_vaccinations);
// printing all data within Hong Kong (variable for HK data)
vaccinationHK = vaccinationData[93].data; //ONLY HK vaccination data
console.log(vaccinationHK);
console.log(vaccinationHK[90].total_vaccinations);
console.log(vaccinationHK[50].total_vaccinations);
console.log(vaccinationHK[4].total_vaccinations/250);
console.log(vaccinationHK[559].total_vaccinations);

// United Kingdom vaccination data
  console.log(vaccinationData[221].country);
  console.log(vaccinationData[221].data[3]);
  console.log(vaccinationData[221].data[0].total_vaccinations);
  console.log(vaccinationData[221].data[4].total_vaccinations);
  // printing all data within United Kingdom
  vaccinationUK = vaccinationData[221].data; //ONLY UK vaccination data
  console.log(vaccinationUK);

//----- PRINTING CSV DATA (TOTAL DEATHS) ------//
console.log(total_deathsData);
console.log(total_deathsData.rows[0].obj.Hong_Kong);
console.log(total_deathsData.rows[90].obj.Hong_Kong);

// **This is for me to see how the data is formated and if data is taken correctly
// and how I can take individual pieces of data out from a large dataset

//(FINAL DATA SELECTION)
//* data values are too big to be plotted onto pen plotter - based on movement
//* selecting final 'date' for both data sets * (date: 2021-05-23)
console.log(vaccinationHK[90].total_vaccinations); // hk vaccination
console.log(total_deathsData.rows[90].obj.Hong_Kong); // hk death
console.log(vaccinationUK[133].total_vaccinations) //UK vaccination
console.log(total_deathsData.rows[90].obj.United_Kingdom); //uk death

}


function mouseClicked() {
  if (!connected) {
    // Note: connect() must be called from a user gesture (e.g. a mouse click) due to
    // browser security restrictions
    axi.connect().then(() => {
      connected = true;
    });
    
  }


//PEN UP AND DOWN = number of vaccinations - slow speed = uncertainty of breakthrough vaccination
//FRONT AND BACK = number of total deaths - fast speed = increasing number of death cases

//PEN PLOTTER - FINAL CODE
//(HONG KONG) total vaccinations:
const vaccCountHK = vaccinationHK[90].total_vaccinations;
const numberOfJabs = map(vaccCountHK, 0, vaccinationHK[90].total_vaccinations, 0, 30);
  for(let i = 0; i < numberOfJabs; i++) {
    axi.penDown();
    axi.moveTo(0,0);
    axi.penUp();
  }

  setInterval(2000,axi.penUp());

 //(HONG KONG) total Deaths:
  const totalDeathsHK = total_deathsData.rows[90].obj.Hong_Kong;
  const numberOfDeaths = map(totalDeathsHK, 0, total_deathsData.rows[90].obj.Hong_Kong, 0, 30);
  for(let i = 0; i < numberOfDeaths; i++) {
  axi.setSpeed(210);
  axi.moveTo(0,50);
  setInterval(2000,axi.penDown());
  axi.moveTo(0,0);
}
  setInterval(2000,axi.penUp());

//COPY THIS CODE ONTO ANOTHER P5.JS SKETCH - HAVE ANOTHER LAPTOP
//(UNITED KINGDOM) total vaccinations:
const vaccCountUK = vaccinationUK[133].total_vaccinations;
const numberOfJabs2 = map(vaccCountUK, 0, vaccinationUK[133].total_vaccinations, 0, 40);
  for(let i = 0; i < numberOfJabs2; i++) {
    axi.penDown();
    axi.moveTo(0, 0);
    axi.penUp();
  }

  setInterval(2000,axi.penUp());

  //(UNITED KINGDOM) total Deaths:
   const totalDeathsUK = total_deathsData.rows[90].obj.United_Kingdom;
   const numberOfDeaths2 = map(totalDeathsUK, 0, total_deathsData.rows[90].obj.United_Kingdom, 0, 40);
   for(let i = 0; i < numberOfDeaths2; i++) {
   axi.setSpeed(210);
   axi.moveTo(0,50);
   setInterval(2000,axi.penDown());
   axi.moveTo(0,0);
 }
}

// ---- DRAWING DATA AND VISUALS ON P5.JS SKETCH ---- //
function draw() {
  background(0,0,255);

  fill(255,0,0);
  stroke(0);
  
  text('COVID VACCINATIONS IN UNITED KINGDOM AND HONG KONG:', 70, 40);
  //HONG KONG//
  //printing vaccination country (Hong Kong) onto canvas
  text(vaccinationData[93].country, 55, 90);
  text(vaccinationHK[90].date, 50, 110);
  fill(255);
  text('total vaccinations:', 30, 400);
  text('total deaths:', 30, 450);
  // date: 2021-05-23, total vaccinations printed (2146663)
  text(vaccinationHK[90].total_vaccinations,30,420);
  text(total_deathsData.rows[90].obj.Hong_Kong, 30,470);

  // draw a circle based on the total vaccinations (for one date)
  // testing circle size (dividing the value to make the circle visible)
  fill(255,0,0);
  stroke(0);
  circle(100,250,vaccinationHK[90].total_vaccinations/20000);
  rect(30,490, total_deathsData.rows[90].obj.Hong_Kong/150);

//------------------------------------------------//

 //UNITED KINGDOM//
  fill(0,255,0);
  stroke(0);
  //printing vaccination country (United Kingdom) onto canvas
  text(vaccinationData[221].country, 350, 90);
  text(vaccinationUK[133].date, 365, 110);
  fill (255);
  text('total vaccinations:',330, 400);
  text('total deaths:', 330, 450);
  text(vaccinationUK[133].total_vaccinations,330,420);
  text(total_deathsData.rows[90].obj.United_Kingdom,330,470);
  
  fill(0,255,0);
  stroke(0);
  circle(410,250,vaccinationUK[133].total_vaccinations/300000);
  rect(330,490, total_deathsData.rows[90].obj.United_Kingdom/3000);

  //CALENDAR DIAGRAM - Mark data based on date on 'calendar' (visual representation)
  stroke(255);
  for (let i = 0; i < lineXPositions.length; i++) {
    line(lineXPositions[i], lineYPositions[0], lineXPositions[i], lineDimensions[0]);
}
  
  for (let i = 0; i < lineYPositions.length; i++) {
    line(lineXPositions[0], lineYPositions[i], lineXPositions[lineXPositions.length - 1], lineYPositions[i]);
}

stroke(0);
text('Covid Data Calendar', 650,430);
text('YEAR: 2021', 650, 89);
text('MONTH: MAY', 925, 89);
fill(255);
text('1', 985, 117);


for (let i = 2; i <= 8; i++) {
  let x = 685 + (i - 2) * 50.5; // Adjust the x-coordinate based on the index
  text(i.toString(), x, 165);
}

for (let i = 9; i <= 15; i++) {
  let x = 685 + (i - 9) * 48.8 // Adjust the x-coordinate based on the index
  text(i.toString(), x, 215);
}

for (let i = 16; i <= 22; i++) {
  let x = 685 + (i - 16) * 48.8 // Adjust the x-coordinate based on the index
  text(i.toString(), x, 265);
}

for (let i = 24; i <= 29; i++) {
  let x = 733 + (i - 24) * 48.8 // Adjust the x-coordinate based on the index
  text(i.toString(), x, 313);
}

for (let i = 30; i <= 31; i++) {
  let x = 683 + (i - 30) * 48.8 // Adjust the x-coordinate based on the index
  text(i.toString(), x, 363);
}

fill(255,0,0);
text('23', 680, 315);
textStyle(BOLD);

// Circle marker with Data Information
let circleX = 675;
let circleY = 330;
let circleRadius = 13;

// Check if the mouse is over the circle
let d = dist(mouseX, mouseY, circleX, circleY);
if (d < circleRadius) {
  fill(255);
  stroke(0);
  ellipse(circleX, circleY, circleRadius);

  // Display text when hovering over the circle
  stroke(2);
  fill(255);
  rect(700, 280, 130, 80);
  fill(0);
  noStroke();
  text('HK:(V)', circleX + 20 + 13, 300);
  text('HK:(D)', circleX + 20 + 13, 315);
  text(vaccinationHK[90].total_vaccinations, circleX + 70 + 13, 300);
  text(total_deathsData.rows[90].obj.Hong_Kong, circleX + 70 + 13, 315);
  text('UK:(V)', circleX + 20 + 13, 335);
  text('UK:(D)', circleX + 20 + 13, 350);
  text(vaccinationUK[133].total_vaccinations, circleX + 70 + 13, 335);
  text(total_deathsData.rows[90].obj.United_Kingdom, circleX + 70 + 13, 350);
  
} else {
  // Draw the circle without hover effect
  fill(255, 0, 0);
  stroke(0);
  ellipse(circleX, circleY, circleRadius);
}
}
//CODE ENDS HERE



/* (EXPERIMENTATION) PEN PLOTTER POSITIONING TESTING
----- PEN PLOTTER LINE TEST 1 ----- 
Draw a diagonal line:
axi.penUp(); //pen goes up
axi.penDown(); //pen down on paper
axi.moveTo(10, 90);//pen draws line on paper (x = 10, y = 90)
axi.penUp(); //pen goes back up
axi.moveTo(30, 90);//pen moves position in air
axi.penDown(); //pen goes back down onto paper
axi.moveTo(40, 10);//pen draws line on paper

----- PEN PLOTTER LINE TEST 2 -----
axi.moveTo(30, 30); // A
axi.penDown(); //pen down on paper
axi.penUp(); //pen goes up
axi.moveTo(30, 10); // B

//----- PEN PLOTTER DATA TEST 3 ----- 
// [x = 45, y = 18780172]

vaccinationHK = vaccinationData[93].data; //HONG KONG VACCINATION DATA
axi.penUp();
axi.penDown();
axi.moveTo(vaccinationHK[0].total_vaccinations/600000,vaccinationHK[559].total_vaccinations/600000);
axi.penUp();
//axi.penDown();
//setTimeout(axi.penDown, (vaccinationHK[559].total_vaccinations - vaccinationHK[0].total_vaccinations)/600000);

vaccinationUK = vaccinationData[221].data;
axi.penDown();
//axi.moveTo(30, 10); // B
axi.moveTo(vaccinationUK[43].total_vaccinations/6000000,vaccinationUK[602].total_vaccinations/6000000);
axi.penUp();
axi.penDown();
//setTimeout(axi.penDown, (vaccinationUK[602].total_vaccinations - vaccinationUK[43].total_vaccinations)/600000);
*/