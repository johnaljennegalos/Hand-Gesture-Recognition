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

    // canvasEl.width = 640;
    // canvasEl.height = 480;

    loadHandposeModel()
}

async function loadHandposeModel(){
    handposeModel = await ml5.handpose(videoEl)

    console.log("Model Ready")
    // handposeModel.play()
    handposeModel.on('predict', gotPrediction)
}

const ctx = canvasEl.getContext('2d')

function gotPrediction (predictions) {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
    ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height)

    if(predictions.length > 0) {
        const hand = predictions[0]
        const landmarks = hand.landmarks

        const handLabel = hand.label

        for(let i = 0; i < landmarks.length; i++) {
            const [x, y, z] = landmarks[i]
            ctx.beginPath()
            ctx.arc(x, y, 5, 0, 2 * Math.PI)
            ctx.fillStyle = 'black'
            ctx.fill()
        }

        const fingerCount = countFingers(landmarks, handLabel)

        updateFeedback(fingerCount)
    }
}

function countFingers(landmarks, handLabel) {
    let fingerCount = 0

    const fingerPairs = [
        [6, 8],
        [10, 12],
        [14,16],
        [18, 20]
    ]

    for(const pair of fingerPairs) {
        const Knuckle_Y = landmarks[pair[0]][1]
        const Tip_Y = landmarks[pair[1]][1]

        if(Tip_Y < Knuckle_Y){
            fingerCount++
        }
    }

    const thumbTipX = landmarks[4][0]
    const thumbBaseX = landmarks[2][0]

    if(handLabel === 'Right'){
        if(thumbTipX > thumbBaseX){
            fingerCount++
        }
    } else if(handLabel === 'Left'){
        if (thumbTipX < thumbBaseX){
            fingerCount++
        }
    }

    return fingerCount
}

let lastSpokenCount = -1
const synth = window.speechSynthesis

function updateFeedback(currentCount){
    gestureEl.textContent = `${currentCount} fingers detected!`

    if(currentCount !== lastSpokenCount && !synth.speaking){
        const utterance = new SpeechSynthesisUtterance(currentCount.toString())

        utterance.rate = 1.2

        synth.speak(utterance)

        lastSpokenCount = currentCount
    }
}

init()
