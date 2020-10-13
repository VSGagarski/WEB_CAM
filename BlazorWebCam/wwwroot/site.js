var mediaStream;
var videoElement;

function startVideo() {

    videoElement = document.getElementById('video');

    navigator.mediaDevices.enumerateDevices().then(function (devices) {

        var audioDefaultDev;
        devices.forEach((item) => {
            console.log(item);
            if (item.label === "USB 2.0 PC Camera, USB Audio-Default Audio Device") {
                audioDefaultDev = item;
            }
        });
        console.log(audioDefaultDev);
        // if (typeof audioDefaultDev === 'undefined') {
        //     audioDefaultDev = devices[0];
        // }
        console.log(audioDefaultDev);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            mediaStream = navigator.mediaDevices.getUserMedia({
                video: true,
                audio: {
                    deviceId: (typeof audioDefaultDev === 'undefined' ? 'default' : audioDefaultDev.deviceId),
                    autoGainControl: true,
                    echoCancellation: true,
                    noiseSuppression: true
                }
            });
            mediaStream.then(function (stream) {
                try {
                    mediaStream = stream;
                    videoElement.srcObject = stream;
                } catch (error) {
                    videoElement.src = window.URL.createObjectURL(stream);
                }
                videoElement.play();
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

function muteMic() {
    console.log(mediaStream.getTracks());
    // mediaStream.getAudioTracks()[0].enabled = !(mediaStream.getAudioTracks()[0].enabled);
}


function stopVideo() {

    if (videoElement.srcObject != null) {

        if (videoElement.srcObject.active) {
            // do something with the stream
            videoElement.srcObject.getTracks().forEach(function (track) {
                console.log(track.label);
                track.stop();
            });
            videoElement.srcObject = null;
            videoElement.pause();
        }
    }
}