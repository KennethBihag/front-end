import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r122/three.module.js';
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
        //#handle = 0;
        renderer;
        camera;
        scene;
        light;
        meshes = [];
        iCurrMesh = -1;
        #autoMotions=false;
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
            this.iCurrMesh++;
            let point = new THREE.Group();
            this.meshes.push(point);
            point.add(mesh);
            this.scene.add(point);
        }
        reverseMeshOrder(){
            let nMeshes = this.meshes.length;
            /*
            this.meshes=[];
            for(let i=0;i<nMeshes;i++){
                this.scene.r
                let lastMesh = this.scene.children.pop();
                this.meshes.push(lastMesh);
            }
            for(let m of this.meshes)
                this.scene.children.push(m);
                */
            for(let m of this.meshes)
                this.scene.remove(m);
            this.meshes.reverse();
            for(let i of this.meshes)
                this.scene.add(i);
            console.log('Reversed');
        }
        moveBackCurrMesh(){
            if(this.iCurrMesh < 0) return;
            this.meshes[this.iCurrMesh].children[0].translateZ(-0.1);
        }
        moveFrontCurrMesh(){
            if(this.iCurrMesh < 0) return;
            this.meshes[this.iCurrMesh].children[0].translateZ(0.1);
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
        toggleAutoMotion(){
            this.#autoMotions = !this.#autoMotions;
        }
        run(){
            let vw = this;
            let rotMat = new THREE.Matrix4();
            rotMat.makeRotationY(0.05);
            let zTranslation=0.01;
            let movingForward=true;
            function animate(){
                //vw.#handle = requestAnimationFrame(animate);
                let mesh = vw.meshes[vw.iCurrMesh].children[0];
                let group = vw.meshes[vw.iCurrMesh];
                //mesh.geometry.center();
                if(vw.#autoMotions) {
                    mesh.applyMatrix4(rotMat);
                    if(movingForward){
                        if(group.position.z >= 1){
                            movingForward=false;
                            zTranslation=-0.01;
                        }
                    }else{
                        if(group.position.z <= -1){
                            movingForward=true;
                            zTranslation=0.01;
                        }
                    }
                    group.translateZ(zTranslation);
                }

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
        let meshes =[]; //viewer.scene.children.filter(c=>c.type=='Mesh');
        for(let g of viewer.meshes){
            meshes.push(g.children[0]);
        }
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