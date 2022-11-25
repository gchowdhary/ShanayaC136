status1 = "";
input_text = "";
objects = [];

function preload() {}

function setup() {
    // canvas = createCanvas(900, 900); too big and distorting the image
    canvas = createCanvas(400, 400);
    // canvas.position(480,250); not required 
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
    // video.size(900,900);
}


function start() {
    // objectDetector = ml5.objectDetector = ml5.objectDetector("cocossd", modelLoaded); wrong way to initialize model

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
    // input_text= document.getElementById("input_id").value; id is wrong. form control is created
    input_text = document.getElementById("object_name").value;
}


function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status1 = true;
}


function draw() {
    image(video, 0, 0, 500, 500);
    if (status1 != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            console.log("i-0 loop");
            document.getElementById("status").innerHTML = "Status: Objects detected";
            console.log(objects.length);
            fill("#ffff00");
            percentage = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ffff00");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == input_text) {
                video.stop();
                // object_detector.detect(gotResults); wrong code
                objectDetector.detect(gotResult)
                document.getElementById("object_is_found").innerHTML = input_text + "Found!";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text + "Found!");
                synth.speak(utterThis);
            } else {
                document.getElementById("object_is_found").innerHTML = input_text + "Not Found!";
            }
        }
    }

}