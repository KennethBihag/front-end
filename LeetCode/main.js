import funcs, {result} from './solutions.js'
import parsers, {inputLabels, placeHolders} from './input_convert.js'
import AddTable from './newelems.js';

globalThis.SelectSolution = (i) => {
    fi = i;
    ipL.innerHTML = inputLabels[fi];
    ipT.placeholder = placeHolders[fi];
    if(ipT.placeholder == 'undefined')
        ipT.placeholder = '';
    if(fi != 3){
        let table = document.getElementById('p85');
        if(table != null)
            table.remove();

    }
};

globalThis.Solve = (e) => {
    e.preventDefault();
    let inputVals = inputs.value;
    let args = parsers[fi](inputVals);
    if(fi == 3){
        let r = args[0], c = args[1];
        let table = document.getElementById('p85');
        if(table != null)
            table.remove();
        AddTable(r,c,inputs);
    }
    funcs[fi](args);
    opP.textContent = result;
}

console.clear();

let fi = -1;
const opP = document.getElementsByClassName("poutput").item(0).children.item(1);
const ipL = document.getElementsByTagName("label").item(0);
const ipT = document.querySelector('input#Inputs');
const inputs = document.querySelector('#Inputs');
