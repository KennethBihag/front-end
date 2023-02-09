import getPkmn from "./pokemon.js";
let divPkmn = document.querySelector('div.pokemon');
let btnPkmn = document.querySelector('.pokemon button');
let currPkmn = document.createElement('img');
globalThis.currPkmn=currPkmn;
let remBtn = document.createElement('button');
let remBtnTexts = ['Hide Image','Show Image'];
remBtn.innerText=remBtnTexts[0];
btnPkmn.after(remBtn);

btnPkmn.onclick = () => {
	getPkmn(currPkmn);
	btnPkmn.after(currPkmn);
}

remBtn.onclick = ()=>{
    if(currPkmn.src == ''){
        alert('No shown pokemon yet!!!');
        return;
    }
    currPkmn.toggleAttribute('hidden');
    let i = Number(currPkmn.getAttribute('hidden')!=null);
    remBtn.innerText = remBtnTexts[i];
};