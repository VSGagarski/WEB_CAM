var stream;
var video;

function startVideo() {

    video = document.getElementById('video');

    navigator.mediaDevices.enumerateDevices().then(function (devices) {

        var audioDefaultDev;
        devices.forEach((item) => {
            if (item.label === "USB 2.0 PC Camera, USB Audio-Default Audio Device") {
                audioDefaultDev = item;
            }
        });
        console.log(audioDefaultDev);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: {
                    deviceId: audioDefaultDev.deviceId,
                    autoGainControl: true,
                    echoCancellation: true,
                    noiseSuppression: true
                }
            }).then(function (stream) {
                try {
                    video.srcObject = stream;
                } catch (error) {
                    video.src = window.URL.createObjectURL(stream);
                }
                video.play();
            }).catch(function (err) {
                //log to console first 
                console.log(err); /* handle the error */
                if (err.name == "NotFoundError" || err.name == "DevicesNotFoundError") {
                    //required track is missing 
                } else if (err.name == "NotReadableError" || err.name == "TrackStartError") {
                    //webcam or mic are already in use 
                } else if (err.name == "OverconstrainedError" || err.name == "ConstraintNotSatisfiedError") {
                    //constraints can not be satisfied by avb. devices 
                } else if (err.name == "NotAllowedError" || err.name == "PermissionDeniedError") {
                    //permission denied in browser 
                } else if (err.name == "TypeError" || err.name == "TypeError") {
                    //empty constraints object 
                } else {
                    //other errors 
                }
            });
        }
    });
}

function stopVideo() {


    if (video.srcObject.active) {
        // do something with the stream
        video.srcObject.getTracks().forEach(function (track) {
            console.log(track.label);
            track.stop();
        });
        video.srcObject = null;
        video.pause();
    }
}