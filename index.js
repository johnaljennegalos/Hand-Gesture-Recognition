let videoEl = document.getElementById('video');
let canvasEl = document.getElementById('canvas');
let gestureEl = document.getElementById('gesture');

let handposeModel;


async function cameraAccess(constraints) {
    let access = null

    try{
        access =  await navigator.mediaDevices.getUserMedia(constraints)
    } catch (error) {
        console.log(error)
    }

    videoEl.srcObject = access
    videoEl.play()
}

async function init(){
    await cameraAccess({video:true})
    console.log("Camera Started")
    loadHandposeModel()
}

async function loadHandposeModel(){
    handposeModel = await ml5.handpose(videoEl)

    console.log("Model Ready")
    handposeModel.play()
    handposeModel.on('predict', gotPrediction)
}

function gotPrediction(){

}


init()
