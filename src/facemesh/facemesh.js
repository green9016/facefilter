
import * as facemesh from '@tensorflow-models/facemesh';
import * as tf from '@tensorflow/tfjs-core';
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import {version} from '@tensorflow/tfjs-backend-wasm/dist/version';
import {TRIANGULATION} from './triangulation';
import { createFaceGeometry, addProduct } from './render';
import { getVideo } from './video';
import ProductList from '../components/MockProductProvider';

let _config = {
    backend: 'wasm',
    maxFaces: 1,
    triangulateMesh: true
}
let _face_model;
let _face_mesh;

export async function initFaceMesh() {
    // tensorflow backend engine init
    tfjsWasm.setWasmPath(
        `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@${
            version}/dist/tfjs-backend-wasm.wasm`);

    await tf.setBackend(_config.backend);

    _face_model = await facemesh.load({maxFaces: _config.maxFaces});
}

export async function renderFaceMesh() {
    const predictions = await _face_model.estimateFaces(getVideo());
  
    if (predictions.length > 0) {
      predictions.forEach(prediction => {
        const keypoints = prediction.scaledMesh;
        if (!_face_mesh) {
            _face_mesh = {
                vertices: [],
                uvs: [],
                faces: TRIANGULATION,
            }

            _face_mesh.vertices = keypoints.reduce( (arr, v) => {
                arr.push(...v);
                return arr;
            }, [] );

            createFaceGeometry(_face_mesh);

            
            addProduct(ProductList[0]);
        }
        else {
            const vertices = keypoints.reduce( (arr, v) => {
                arr.push(...v);
                return arr;
            }, [] );
            _face_mesh.vertices.splice(0, _face_mesh.vertices.length, vertices);
        }

        // if (_config.triangulateMesh) {
        //   for (let i = 0; i < TRIANGULATION.length / 3; i++) {
        //     const points = [
        //       TRIANGULATION[i * 3], TRIANGULATION[i * 3 + 1],
        //       TRIANGULATION[i * 3 + 2]
        //     ].map(index => keypoints[index]);
  
        //     drawPath(ctx, points, true);
        //   }
        // } else {
        //   for (let i = 0; i < keypoints.length; i++) {
        //     const x = keypoints[i][0];
        //     const y = keypoints[i][1];
  
        //     ctx.beginPath();
        //     ctx.arc(x, y, 1 /* radius */, 0, 2 * Math.PI);
        //     ctx.fill();
        //   }
        // }
      });
    }
}