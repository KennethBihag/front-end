import funcs, {result} from './solutions.js'
import parsers, {inputLabels} from './input_convert.js'

globalThis.SelectSolution = (i) => {
    fi = i;
    ipL.innerHTML = inputLabels[fi];
    // console.log(`Current func: ${funcs[i]}`);
};

globalThis.Solve = (e) => {
    e.preventDefault();
    let inputs = document.getElementById("Inputs").value;
    let args = parsers[fi](inputs);
    funcs[fi](args);
    opP.textContent = result;
}

console.clear();

let fi = -1;
const opP = document.getElementsByClassName("poutput").item(0).children.item(1);
const ipL = document.getElementsByTagName("label").item(0);