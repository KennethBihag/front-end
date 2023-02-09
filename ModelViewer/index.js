import {THREE} from './viewer.js';
import './functions.js';
import './events.js'
globalThis.THREE = THREE;
//init 
const canvas = document.querySelector('#theCanvas');
globalThis.canvas = canvas;
canvas.height = globalThis.innerHeight/2;
canvas.width = canvas.height;

const pCameraOpts = {
    fov: 45,
    aspect: canvas.width/canvas.height,
    near: 0.1,
    far: 1000,
    pos: [2,2,2]
};
const lightOpts = {
    color:0xFFFFFF,
    intensity:1,
    pos: pCameraOpts.pos
}
const viewer = new globalThis.Viewer.Viewer(canvas,'#00ff00',pCameraOpts,lightOpts);
globalThis.viewer=viewer;

//load mesh
let inputMesh = document.querySelector('input');
let preMesh = document.querySelector('pre');
globalThis.Functions.LoadMesh(inputMesh,preMesh,viewer);
/*
const ce = new CustomEvent(
    'customEvent',
    {
        detail:{number: 1001, message: 'Custom event is triggered'}
    }
);
window.addEventListener('customEvent',e=>{
    console.log(e.detail.message);
});


(async function testCode(){
    let i=0;
    while(true){
        i++;
        if(i%100000 == 0)
            window.dispatchEvent(ce);
    }
})();
*/