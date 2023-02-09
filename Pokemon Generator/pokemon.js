export default (imgPkmn)=>{
    let rndex = Math.floor( Math.random()*imageFiles.length );
    imgPkmn.setAttribute('src',`images/${imageFiles[rndex]}`);
	imgPkmn.setAttribute('alt',imageFiles[rndex].replace(
		/\.\w{1,4}/,''));
}

let imageFiles=[];
fetch('images.json')
.then(res => res.json())
.then(jString => imageFiles=jString["ImageFiles"]);