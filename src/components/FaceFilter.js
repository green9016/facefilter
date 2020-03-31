import React from 'react';
import { useEffect } from 'react';
import '../style/FaceFilter.style.css';

import { initFaceMesh, renderFaceMesh } from '../facemesh/facemesh';
import { initPose, renderPose } from '../facemesh/pose';
import { initRender, renderScene, updateSize, renderObjects } from '../facemesh/render';
import { initVideo, getVideo, getVideoCanvas, isVideoReady } from '../facemesh/video';

const $ = window.$;

export const FaceFilter = () => {
    useEffect(() => {
        function onLoadCompleted() {
            $('.loadingMessage').fadeOut();
        }

        function onVideoCanPlay() {
            updateSize();
        }

        function onOrientationChange() {
            updateSize();
        }

        async function init() {
            await initFaceMesh();
            await initPose();

            await initVideo({
                onVideoCanPlay,
                onOrientationChange
            });
            initRender(50);

            // console.log('inited--------', getVideo(), getVideoCanvas());
        }

        async function processFrame() {
            // Draw video in canvas for Magic Face to use
            if (!getVideoCanvas().getContext('2d')) {
                requestAnimationFrame(processFrame);
                return;
            }
            // getVideoCanvas().getContext('2d').drawImage(
            //     getVideo(),
            //     0,
            //     0,
            //     getVideoCanvas().width,
            //     getVideoCanvas().height
            // );

            if (isVideoReady()) {
                // update pose
                await renderPose();
                // update face mesh
                await renderFaceMesh();
                renderObjects();
            }

            // render AR object on the face
            renderScene();

            // render callback
            requestAnimationFrame(processFrame);
        }
        // to avoid Trail version Limitation

        init().then(() => processFrame());

        return () => {

        };
    }, []);

    return (
        <div className="row arcomp">
            <div className="loadingMessage">
                <p>fetching...</p>
            </div>
            <div className="face-filter">
                <video id="facef-video" playsInline autoPlay></video>
                <canvas id="facef-canvas"></canvas>
            </div>
        </div>
    )
}