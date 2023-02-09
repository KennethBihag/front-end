
export default function AddTable(rows, cols, elemBefore){
    const optInput = document.createElement('table');
    const tb = optInput.appendChild(document.createElement('tbody'));
    for(let i=0; i<rows; i++){
        tb.appendChild(document.createElement('tr'));
        for(let j=0; j < cols; j++){
            let td = tb.lastChild.appendChild(document.createElement('td'));
            td.textContent = '0';
            td.onclick = e =>{
                let t = Number(e.target.textContent);
                t = !t;
                e.target.textContent = Number(t);
            };
        }                        
    }
    optInput.id = 'p85';
    elemBefore.after(optInput);
}