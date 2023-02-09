import * as draw from './draw.js'

function Progress(prog, intvl){
    return setInterval(() => {
        prog.value = Math.random() * prog.max;
    }, intvl*1000);
}

function iterateKeys(theObj){
    console.log(`Keys of ${typeof(theObj)}:`);
    for(let x in theObj)
        console.log(x);
    console.log('---');
}


function iterateVals(theObj){
    console.log(`Vals of ${typeof(theObj)}:`);
    for(let x of theObj){
        console.log(x);
    }
    console.log('---');
}

class Animal{
    name;
    weightG;
    // constructor(name, weightG){
    //     this.name = name;
    //     this.weightG = weightG;
    // }
    // #printWeight(w){
    //     console.log(`${this.name}'s weight(kg): ${w}`);
    // }
    // GetKg(){let kgW = this.weightG / 1000; this.#printWeight(kgW);}
}

console.clear();

let arr = [2,4,6];
// let bax = new Animal('Bax', 3500.00);
let bax = {name: 'Bax', weight: 3500};
iterateKeys(arr);
iterateKeys(bax);
iterateVals(arr);
iterateVals(Object.keys(bax));