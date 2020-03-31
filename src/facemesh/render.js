import * as THREE from 'three';
import { OBJLoader } from '../three/OBJLoader';
import { getVideo, getVideoCanvas } from './video';

const $ = window.$;
const TweenMax = window.TweenMax;

var currentObj;

let mirror = true;
let renderer;
let camera2D;
let camera3D;
let scene2D;
let scene3D;
let objects = [];
let objects_pivot_poses = [];

let videoTexture;
let videoSprite;

let faceMask;
let faceMaterial;

var realMask;

// this is to avoid load dupliate models
var loading = false;
var currentProduct;

var _rot, _pos;

// TO ADD ANY ADDITIONAL PRODCUCT
function addObj(url, matArray, rtnObj) {
    console.log('addobj-------', url);

    var piv_scale = 1;
    var pivot_pose = [0, 0, 0, 0, 0, 0];
    // -- Load obj_fn and add it
    let object_root = null;
    let objLoader = new OBJLoader();

    objLoader.load(url, (object_root) => {
        object_root.children[0].material = matArray;

        scene3D.add(object_root);
        object_root.scale.x = piv_scale;
        object_root.scale.y = piv_scale;
        object_root.scale.z = piv_scale;
        objects.push(object_root);
        objects_pivot_poses.push(pivot_pose);

        rtnObj(object_root);
    });

    return object_root;
}

function FadeInMat(mat) {
    var temp = mat.opacity;

    mat.opacity = 0;

    TweenMax.to(mat, .5, { opacity: temp });
}

// function FadeOutMat(mat) {
//     TweenMax.to(mat, .5, { opacity: 0 });
// }

function addRealMask() {
    var maskMat = new THREE.MeshBasicMaterial();
    maskMat.colorWrite = false;

    addObj('facef/mask.obj', maskMat, rtnObj => {
        realMask = rtnObj;
    });
}

export function initRender(fovy) {
    const videoElement = getVideo();
    const videoCanvas = getVideoCanvas();
    const glCanvas = document.getElementById('facef-canvas');

    const defaultWidth = videoElement.width;
    const defaultHeight = videoElement.height;

    renderer = new THREE.WebGLRenderer({
        canvas: glCanvas,
        alpha: true,
        preserveDrawingBuffer: true,
        antialias: true
    });

    renderer.setClearColor("#e5e5e5");
    renderer.autoClear = false;

    // Create scenep
    scene2D = new THREE.Scene();
    scene3D = new THREE.Scene();
    
    // Setup cameras
    camera2D = new THREE.OrthographicCamera(
        -defaultWidth / 2,
        defaultWidth / 2,
        defaultHeight / 2,
        -defaultHeight / 2, 1, 10);
    camera2D.position.z = 10;
    scene2D.add(camera2D);

    console.log('width height------', defaultWidth, defaultHeight);

    camera3D = new THREE.PerspectiveCamera(fovy, defaultWidth / defaultHeight, 0.1, 100);
    camera3D.position.set(0, 0, 0);
    scene3D.add(camera3D);

    // Create lights
    const ambientLight = new THREE.AmbientLight(0x101030);
    scene3D.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene3D.add(directionalLight);

    // add real mask
    addRealMask();

    // Create texture to apply on face
    faceMaterial = new THREE.MeshStandardMaterial({ transparent: false, opacity: 1 });

    // Create video texture
    videoTexture = new THREE.Texture(videoCanvas);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    const videoMaterial = new THREE.MeshBasicMaterial(
        { map: videoTexture, depthWrite: false, side: THREE.DoubleSide });

    // Create video plane
    videoSprite = new THREE.Sprite(videoMaterial);
    videoSprite.center.set(0.5, 0.5);
    if (videoElement.videoWidth > 0 && videoElement.videoHeight > 0)
        videoSprite.scale.set(
            mirror ? -videoElement.videoWidth : videoElement.videoWidth,
            videoElement.videoHeight, 1);

    videoSprite.position.set(0, 0, 1);
    scene2D.add(videoSprite);
}

// CREATES REFERENCE FACE MESH
export function createFaceGeometry(mesh) {
    // Create face mesh
    const faceGeometry = new THREE.BufferGeometry();
    faceGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(mesh.vertices), 3));
    // faceGeometry.setAttribute('uv', new THREE.BufferAttribute(model.uvs, 2));
    faceGeometry.setIndex(new THREE.BufferAttribute(new Int16Array(mesh.faces), 1));

    faceGeometry.computeBoundingSphere();
    faceGeometry.computeBoundingBox();
    faceGeometry.computeFaceNormals();
    faceGeometry.computeVertexNormals();

    faceMask = new THREE.Mesh(faceGeometry, faceMaterial);

    scene3D.add(faceMask);
}

export function changeVariantTexTure(index) {
    var tex;
    if(currentProduct.data.materials[0].maps.length >0)
     tex = new THREE.TextureLoader().load(currentProduct.data.materials[0].maps[index]);
    if (tex == null) tex = new THREE.TextureLoader().load(currentProduct.data.materials[1].maps[index]);
    if (currentProduct.category === "Lipstick" || currentProduct.category === "Eyebrows" || currentProduct.category === "Mascara")
        faceMask.material.map = tex;
    else
    {
        if(currentObj.children[0] != null && currentObj.children[0].material[0] != null && currentObj.children[0].material[0].map != null) currentObj.children[0].material[0].map = tex
        else if(currentObj.children[1] != null && currentObj.children[1].material[0] != null && currentObj.children[1].material[0].map) currentObj.children[1].material[0].map = tex
        else if(currentObj.children[0] != null && currentObj.children[0].material[1] != null && currentObj.children[0].material[1].map != null) currentObj.children[0].material[1].map = tex
        else if(currentObj.children[1] != null && currentObj.children[1].material[1] != null && currentObj.children[1].material[1].map) currentObj.children[1].material[1].map = tex
    }
}

export function addProduct(product) {
    currentProduct = product;

    if (loading) return;
    loading = true;

    $('.loadingMessage').fadeIn();

    if (currentObj) {
        var obj = currentObj;
        scene3D.remove(obj);
    }

    var matArray = [];
    var texLoader = new THREE.TextureLoader();

    product.data.materials.forEach(mat => {
        var map = mat.maps[0] ? texLoader.load(mat.maps[0]) : null;
        var normalMap = mat.normalMap ? texLoader.load(mat.normalMap) : null;
        var opacity = mat.opacity;
        var envMap = mat.envMap ? texLoader.load(mat.envMap) : null;
        if (envMap) envMap.mapping = THREE.EquirectangularReflectionMapping;

        var m = new THREE.MeshStandardMaterial(
            { map: map, normalMap: normalMap, opacity: opacity, envMap: envMap, roughness: mat.roughness, metalness: mat.metalness, transparent: mat.transparent }
        );
        matArray.push(m);
    });

    if (product.category === "Eyewear" || product.category === "Headphones") {
        if (realMask) {
            realMask.visible = true;
        }

        addObj(product.data.modelUrl, matArray, rtnObj => {
            $('.loadingMessage').fadeOut();
            currentObj = rtnObj;

            currentObj.children[0].material.forEach(mat => {
                FadeInMat(mat);
            })

            loading = false;
        });
        faceMask.material.opacity = 0;
    }

    if (product.category === "Lipstick" || 
        product.category === "Eyebrows" || 
        product.category === "Mascara") {
        if (realMask) {
            realMask.visible = false;
        }

        faceMask.material = matArray[0];
        FadeInMat(faceMask.material);
        $('.loadingMessage').fadeOut();
        loading = false;
    }
}

export function updateSize() {
    const video = getVideo();
    const videoCanvas = getVideoCanvas();

    // setTimeout for iOS to get correct video size
    setTimeout(() => {
        // Update cameras and renderer
        camera2D.left = -video.videoWidth / 2;
        camera2D.right = video.videoWidth / 2;
        camera2D.top = video.videoHeight / 2;
        camera2D.bottom = -video.videoHeight / 2;
        camera2D.updateProjectionMatrix();

        camera3D.aspect = video.videoWidth / video.videoHeight;
        camera3D.updateProjectionMatrix();

        // Update video canvas size
        videoCanvas.width = video.videoWidth;
        videoCanvas.height = video.videoHeight;

        if (video.videoWidth < 641)
            renderer.setSize(video.videoWidth * 2, video.videoHeight * 2);
        else
            renderer.setSize(video.videoWidth, video.videoHeight);

        videoSprite.scale.set(
            mirror ? -video.videoWidth : video.videoWidth,
            video.videoHeight, 1);
    });
}


export function renderObjects() {
        // -- Set to objects
        objects.forEach((obj, i) => {
            if (obj) {
                obj.position.set(_pos.x, _pos.y, _pos.z);
                obj.rotation.setFromQuaternion(_rot);
                // obj.visible = true;

                // -- pivot translation and rotation
                obj.translateX(objects_pivot_poses[i][0]);
                obj.translateY(objects_pivot_poses[i][1]);
                obj.translateZ(objects_pivot_poses[i][2]);
                obj.rotateX(THREE.Math.degToRad(objects_pivot_poses[i][3]));
                obj.rotateY(THREE.Math.degToRad(objects_pivot_poses[i][4]));
                obj.rotateZ(THREE.Math.degToRad(objects_pivot_poses[i][5]));
                // console.log(objects_pivot_poses[i][3]);        
                // console.log(i)
            }
        });
        

        // faceMask.position.set(
        //     mirror ? -t[0] : t[0],    // x mirror
        //     -t[1],
        //     -t[2]);

        // faceMask.matrix = l_transfMatrix;
        // faceMask.rotation.setFromRotationMatrix(l_transfMatrix);
        // faceMask.visible = true;

        // // Update vertices positions
        // for (let i = 0; i < 730 * 3;) {
        //     faceMask.geometry.attributes.position.array[i] = -facefMagicFace.faceVertices[i++];   // x mirror
        //     faceMask.geometry.attributes.position.array[i] = facefMagicFace.faceVertices[i++];    // y
        //     faceMask.geometry.attributes.position.array[i] = facefMagicFace.faceVertices[i++];    // z
        // }
        // faceMask.geometry.attributes.position.needsUpdate = true;
        // faceMask.visible = true;
}

export function renderScene() {
    videoTexture.needsUpdate = true;
    renderer.clear();

    renderer.render(scene2D, camera2D);
    renderer.render(scene3D, camera3D);
}

export function setTranslation(x, y, z) {
    const vw = getVideo().videoWidth;
    const vh = getVideo().videoHeight;
    const videoAspectRatio = vw / vh;
      
    _pos = new THREE.Vector3(x, y/videoAspectRatio, z);
    // the AI sees the video as a square,
    // we should deform its projection a bit.
    // console.log('position--------', x, y/videoAspectRatio, z);
}

export function setRotation(q /* :THREE.Quaternion */) {
    // console.log('rotation--------', q);
    _rot = q;
}
