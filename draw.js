function Parabola(context, xFrom, xTo, yHeight, yOffset, colorStr){
    context.beginPath();
    context.closePath();
    let range = xTo - xFrom;
    for(let i=0; i < range; i++){
        let deg = ((i+1)/range*180);
        // console.log('angle:' + deg)
        if(i > range/2-1)
            deg = 180-deg;
        
        let rad = deg/180*Math.PI;
        let y = -Math.sin(rad) * yHeight;
        // console.log(`${i},${y+yOffset}`);
        context.lineTo(i+xFrom,y+yOffset);
    }
    context.strokeStyle = colorStr;
    context.fillStyle = "blue";
    context.fill();
    context.stroke();
}

export {Parabola};