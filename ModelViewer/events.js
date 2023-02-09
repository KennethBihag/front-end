globalThis.onkeyup = k => {
    if(globalThis.viewer.meshes.length>0){
        switch (k.key) {
            case 'ArrowRight':
                globalThis.viewer.iCurrMesh++;
                if (globalThis.viewer.iCurrMesh >= globalThis.viewer.meshes.length)
                    globalThis.viewer.iCurrMesh = 0;
                    globalThis.preMesh.textContent = globalThis.preTexts[globalThis.viewer.iCurrMesh];
                    console.log(`Current mesh is ${globalThis.viewer.meshes[globalThis.viewer.iCurrMesh].children[0].name}`)
                break;
            case 'ArrowLeft':
                globalThis.viewer.iCurrMesh--;
                if (globalThis.viewer.iCurrMesh < 0)
                    globalThis.viewer.iCurrMesh = globalThis.viewer.meshes.length - 1;
                    globalThis.preMesh.textContent = globalThis.preTexts[globalThis.viewer.iCurrMesh];
                    console.log(`Current mesh is ${globalThis.viewer.meshes[globalThis.viewer.iCurrMesh].children[0].name}`)
                break;
        }
    }
    switch(k.key){
        case 'h':
            globalThis.alert('M: show scene data on console\n'+
            'S : stop\n'+
            'A : toggle animation\n'+
            '-> , <- : select mesh\n'+
            'R : reverse order of meshes\n'+
            '^ , v : move current mesh back, front\n'+
            '8 : zoom in\n'+
            '2 : zoom out\n'
            );
        break;
        case 'm':
            globalThis.Viewer.getSceneMeshData(globalThis.viewer);
        break;
        case 's':
            globalThis.viewer.stop();
            break;
        case 'a':
            globalThis.viewer.toggleAutoMotion();
        break;
        case 'r':
            globalThis.viewer.reverseMeshOrder();
            globalThis.preTexts.reverse();
            globalThis.preMesh.textContent=globalThis.preTexts[globalThis.viewer.iCurrMesh];
        break;
    }
}

globalThis.onkeydown = k=>{
    let cm = globalThis.viewer.meshes;
    if(cm == undefined) return;
    switch(k.key){
        case '8':
            globalThis.viewer.zoomIn();
        break;
        case '2':
            globalThis.viewer.zoomOut();
        break;
        case 'ArrowUp':
            globalThis.viewer.moveBackCurrMesh();
        break;
        case 'ArrowDown':
            globalThis.viewer.moveFrontCurrMesh();
        break;
    }
}