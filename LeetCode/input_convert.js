export const inputLabels = ["Numbers", "Max Number", "Numbers [0,1000]","Matrix Dim{rows cols}"];
export const placeHolders = new Map();
placeHolders[3] = "<row count> <col count>";

function AsArrayNums(str){
    let sep = RegExp(" +");
    return str.trim().split(sep).map(Number);
}

function AsInt(str){
    let n = Math.round(Number(str));
    if(isNaN(n)){
        let errStr = "Wrong argument! Pass a single number only.";
        window.alert(errStr);
        throw errStr;
    }
    return n;
}

const parsers = [AsArrayNums, AsInt, AsArrayNums, AsArrayNums];

export default parsers;