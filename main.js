song = "";
lwristy="";
rwristy="";
lwristx="";
rwristx="";
lscore="";
rscore="";
function preload(){
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(500, 390);
    canvas.position(390, 202);
    video = createCapture(VIDEO);
    video.hide();
    video.size(500, 390);
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on("pose", gotPoses);
}
function modelloaded() {
    console.log("poseNet is initialised!");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        lwristy = results[0].pose.leftWrist.y;
        rwristy = results[0].pose.rightWrist.y;
        lwristx = results[0].pose.leftWrist.x;
        rwristx = results[0].pose.rightWrist.x;
        lscore = results[0].pose.keypoints[10].score;
        rscore = results[0].pose.keypoints[10].score;
    }
}
function draw(){
    image(video, 0, 0, 500, 390);
    fill("red");
    stroke("blue");
    circle(lwristx, lwristy, 20);
    fill("blue");
    stroke("red");
    circle(rwristx, rwristy, 20);
    Intlwristy = Number(lwristy);
    noDecimalIntlwristy = floor(Intlwristy);
    vol = noDecimalIntlwristy/390;
    tofixedvol = vol.toFixed(3);
    document.getElementById("volume").innerHTML = tofixedvol;
    song.setVolume(vol);
    // 0-78
   
    if (rwristy <= 78) {
        song.rate(0.5);
        document.getElementById("speed").innerHTML = "0.5";
    }
    if (rwristy >= 79 && rwristy <= 156) {
        song.rate(1);
        document.getElementById("speed").innerHTML = "1";
    }   
    if (rwristy >= 157 && rwristy <=234) {
        song.rate(1.5);
        document.getElementById("speed").innerHTML = "1.5";
    }
    if (rwristy >= 235 && rwristy <=312) {
        song.rate(2);
        document.getElementById("speed").innerHTML = "2";
    }
    if (rwristy >= 313 && rwristy <= 390) {
        song.rate(2.5);
        document.getElementById("speed").innerHTML = "2.5";
    }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop() {
    song.stop();
}