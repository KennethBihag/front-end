import * as THREE from './three.js-r122/src/Three.js';
import { Matrix3 } from './three.js-r122/src/Three.js';
globalThis.enlarged=false;
function ViewerFactory(){
    function RandomizeBGColor(){
        let query = window.prompt('Select element');
        let elem = document.querySelector(query);
        if (elem.tagName == ''){
            alert('ERROR 100011');
            return;
        }
        else{
            elem.style.backgroundColor=getRandomColor().replace('0x','#');
            return;
        }
    }
    function getRandomColor(){
        let r = Math.round(Math.random()*255);
        let g = Math.round(Math.random()*255);
        let b = Math.round(Math.random()*255);
        r = r << 16;
        g = g << 8;
        return `0x${(r+g+b).toString(16)}`;
    }
    class Viewer{
        #handle = 0;
        renderer;
        camera;
        scene;
        light;
        meshes = [];
        iCurrMesh = -1;
        constructor(canvas,clearColor,camOpts,lightOpts){
            this.scene = new THREE.Scene();

            this.renderer = new THREE.WebGLRenderer({canvas,antialias: true});
            //this.renderer.setSize(canvas.width,canvas.height);
            this.renderer.setClearColor(clearColor);

            this.camera = new THREE.PerspectiveCamera(
                camOpts.fov, camOpts.aspect, camOpts.near,camOpts.far);
            this.camera.position.x = camOpts.pos[0];
            this.camera.position.y = camOpts.pos[1];
            this.camera.position.z = camOpts.pos[2];
            this.camera.lookAt(0,0,0);

            this.light = new THREE.DirectionalLight(lightOpts.color,lightOpts.intensity);
            //this.light = new THREE.PointLight(lightOpts.color,lightOpts.intensity);
            this.light.position.set(lightOpts.pos[0],lightOpts.pos[1],lightOpts.pos[2]);

            this.scene.add(this.light);
            //this.scene.add(this.camera);
            this.scene.add(new THREE.AxesHelper(1));
        }
        updateGeoms(meshRawData,name){
            const material = //new THREE.MeshPhongMaterial(
                new THREE.MeshStandardMaterial(
                {color: Number(getRandomColor()),
                 roughness: 0.5}
                //wireframe: true}
                );
            const geom = new THREE.BufferGeometry(); 
            geom.setIndex(meshRawData.iArray);
            geom.setAttribute( 'position', new THREE.Float32BufferAttribute( meshRawData.vArray, 3) );
           /*
            const geom = new THREE.Geometry();
            for(let i=0;i<currData.vArray.length;i+=3){
                let x = currData.vArray[i];
                let y = currData.vArray[i+1];
                let z = currData.vArray[i+2];
                geom.vertices.push(new THREE.Vector3(x,y,z));
            }
            for(let i=0;i<currData.iArray.length;i+=3){
                let a = currData.iArray[i];
                let b = currData.iArray[i+1];
                let c = currData.iArray[i+2];
                geom.faces.push( new THREE.Face3(a,b,c));
            }
            */
            geom.center();
            geom.computeBoundingSphere();
            let scl = 1/ geom.boundingSphere.radius;
            geom.scale(scl,scl,scl);
            if(!geom.attributes.normal)
                geom.computeVertexNormals();
            const mesh = new THREE.Mesh(
                geom,
                material
            );
            mesh.name = name;
            this.meshes.push(mesh);
            this.iCurrMesh++;
            this.scene.add(mesh);
        }
        moveBackCurrMesh(){
            if(this.iCurrMesh < 0) return;
            this.meshes[this.iCurrMesh].translateZ(-0.01);
        }
        moveFrontCurrMesh(){
            if(this.iCurrMesh < 0) return;
            this.meshes[this.iCurrMesh].translateZ(0.01);
        }
        zoomIn(){
            this.camera.position.x -= 0.01;
            this.camera.position.y -= 0.01;
            this.camera.position.z -= 0.01;
        }
        zoomOut(){
            this.camera.position.x += 0.01;
            this.camera.position.y += 0.01;
            this.camera.position.z += 0.01;
        }
        run(){
            let vw = this;
            let rotMat = new THREE.Matrix4();
            rotMat.makeRotationY(0.01);
            let traMat = new THREE.Matrix4();
            traMat.makeTranslation(0,0,0.01);
            function animate(){
                //vw.#handle = requestAnimationFrame(animate);
                let mesh = vw.meshes[vw.iCurrMesh];
                //mesh.geometry.center();
                mesh.applyMatrix4(rotMat);
                //mesh.applyMatrix4(traMat);
                //mesh.rotation.y += 0.01;
                /*
                if(vw.meshes[0] != undefined){
                    xTrans+=0.0001;
                    //let y_ax = vw.meshes[0].geometry.boundingSphere.center.y;
                    //vw.meshes[0].rotateOnAxis(new THREE.Vector3(xTrans,1,0),0.1);
                    //vw.meshes[0].translateX(xTrans);
                    
                }
                if(vw.meshes[1] != undefined){
                    //vw.meshes[1].translate();
                }
                //vw.renderer.clearColor();
                */
                vw.renderer.render(vw.scene,vw.camera);
            }
            this.renderer.setAnimationLoop(animate);
            //animate();
        }
        stop(){
            //cancelAnimationFrame(this.#handle);
            this.renderer.setAnimationLoop(null);
        }
        resizeRenderer(){
            this.camera.aspect = this.renderer.domElement.width/this.renderer.domElement.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.renderer.domElement.width,this.renderer.domElement.height);           
        }
    }
    function getSceneMeshData(viewer){
        let renderedFaces = viewer.renderer.info.render.triangles;
        let meshes = viewer.scene.children.filter(c=>c.type=='Mesh');
        let meshData = meshes.reduce(
            (t,c)=>{ t.f+= c.geometry.index.count/3; t.v+= c.geometry.attributes.position.count;
                return t},
            {v:0,f:0}
        );
        let vertices = meshes.red
        console.log(`Redered triangles: ${renderedFaces}`);
        console.log(`All faces: ${meshData.f}; All vertices: ${meshData.v}`);
    }
    return {RandomizeBGColor,getRandomColor,Viewer,getSceneMeshData};
}

(
    function(root,factory){
        root.Viewer = factory();
    }
)(globalThis,ViewerFactory);

export {THREE};