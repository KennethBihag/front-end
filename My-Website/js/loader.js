const txtDir = './assets/text';

function GetText(elemType, id){
    const textGetter = new XMLHttpRequest();
    const rsrcName = `${txtDir}/${elemType}.json`;
    let text = null;
    textGetter.onload = function (){
        if(this.status == 200){
            text = JSON.parse(this.response)[id];
        } else
            throw new Error(`${rsrcName} not found`);
    }

    textGetter.open('GET', rsrcName, false);
    textGetter.send();

    return text;
}

export default GetText;