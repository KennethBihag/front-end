globalThis.onkeyup = k => {
    if(globalThis.viewer.meshes.length>0){
        switch (k.key) {
            case 'ArrowRight':
                globalThis.viewer.iCurrMesh++;
                if (globalThis.viewer.iCurrMesh >= globalThis.viewer.meshes.length)
                    globalThis.viewer.iCurrMesh = 0;
                console.log(`Current mesh is ${globalThis.viewer.meshes[globalThis.viewer.iCurrMesh].children[0].name}`)
                break;
            case 'ArrowLeft':
                globalThis.viewer.iCurrMesh--;
                if (globalThis.viewer.iCurrMesh < 0)
                    globalThis.viewer.iCurrMesh = globalThis.viewer.meshes.length - 1;
                console.log(`Current mesh is ${globalThis.viewer.meshes[globalThis.viewer.iCurrMesh].children[0].name}`)
                    break;
        }
    }
    switch(k.key){
        case 'm':
            globalThis.Viewer.getSceneMeshData(globalThis.viewer);
        break;
        case 's':
            globalThis.viewer.stop();
            break;
    }
}

globalThis.onkeydown = k=>{
    let cm = globalThis.viewer.meshes;
    if(cm == undefined) return;
    switch(k.key){
        case '8':
            //globalThis.viewer.moveBackCurrMesh();
            globalThis.viewer.zoomIn();
        break;
        case '2':
            //globalThis.viewer.moveFrontCurrMesh();
            globalThis.viewer.zoomOut();
        break;
    }
}