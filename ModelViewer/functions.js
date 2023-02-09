function FunctionsFactory(){
    function ResizeElem(elem,wRatio,hRatio){
        globalThis.enlarged = !globalThis.enlarged;
        elem = document.querySelector(elem);
        if (!elem){
            alert("HTML Element doesn't exist!");
            return;
        }
        else{
            if(typeof h == 'undefined')
                hRatio=wRatio;
            elem.height *= hRatio;
            elem.width *= wRatio;
            
            return;
        }
    }
    function LoadMesh(inputElem,preElem,viewerObj){
        inputElem.onchange = ()=>{
            const fr = new FileReader();
            fr.onload = ()=>{

                ParseOBJFile(fr.result).then(geomData=>{
                    viewerObj.updateGeoms(geomData,inputElem.files[0].name);
                    if(viewerObj.iCurrMesh == 0 ){
                        viewerObj.run();
                    }
                    //globalThis.dispatchEvent(onImportMesh);
                }
                );
                preElem.textContent = fr.result;
            }
            fr.readAsText(inputElem.files[0]);
        }
    }
    async function ParseOBJFile(fileBuffer){
        let lines = fileBuffer.split('\r\n');
        let vArray=[], iArray=[];
        lines.forEach(line => {
            let tokens = line.split(' ');
            if(tokens[0]=='v'){
                vArray.push(tokens[1]);
                vArray.push(tokens[2]);
                vArray.push(tokens[3]);
            }else if(tokens[0]=='f'){
                iArray.push(tokens[1]-1);
                iArray.push(tokens[2]-1);
                iArray.push(tokens[3]-1);
            }
        });
        return {vArray,iArray};
    }
    //let onImportMesh = new CustomEvent('importMesh',{detail: 'Mesh is imported...'});
    return {ResizeElem,LoadMesh};
}

function Exporter(root,factory){
    root.Functions = factory();
}

Exporter(window,FunctionsFactory);