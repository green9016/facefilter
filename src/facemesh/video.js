let _video;
let _videoCanvas;
let _config;
let _videoReady;

export function getVideo() {
    return _video;
}

export function getVideoCanvas() {
    return _videoCanvas;
}

export async function initVideo(config) {
    _config = config;
    // video canvas
    _videoCanvas = document.createElement('canvas');
    _videoCanvas.style.display = 'none';

    // video
    _video = document.getElementById('facef-video');
    if (_config && _config.onVideoCanPlay) {
        _video.oncanplay = _config.onVideoCanPlay;
    }

    // event listener
    window.addEventListener('orientationchange', () => {
        if (_config && _config.onOrientationChange) {
            _config.onOrientationChange(_video, _videoCanvas);
        }
    });

    // start camera
    const stream = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {
            facingMode: 'user',
        //   width: mobile ? undefined : VIDEO_SIZE,
        //   height: mobile ? undefined : VIDEO_SIZE
        },
    });
    _video.srcObject = stream;

    return new Promise((resolve) => {
        _video.onloadedmetadata = () => {
            _videoReady = true;
            resolve(_video);
        };
    });
}

export function isVideoReady() {
    return _videoReady;
}
