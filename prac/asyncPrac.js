async function Function1() {
    console.log('Function 1 is called');
    let n = delay(5);
    await n;
    console.log('Exit Function 1.');
}
async function Function2() {
    console.log('Function 2 is called');
    await delay(3);
    console.log('Exit Function 2.');
}

async function delay(s) {
    console.log('Waiting for ' + s + ' seconds');
    const inter = setInterval(() => console.log('...'), 1000);
    let p = new Promise(res =>
        setTimeout(res, s*1000));
    await p;
    // await p.then(() => {
    //     clearInterval(inter);
    //     console.log(s+'-second delay is done!');
    //});
    clearInterval(inter);
    console.log('Exit delay function');
}
async function Function3(NUMBA) {
    //console.log('Function3 started.');
    console.log(`FUNCTION3 - ${JSON.stringify(NUMBA)}`);
    let _delay = new Promise(
        res => setTimeout(res, 3000)
    );
    await _delay;
    NUMBA = 10;
}
/*
(async function Function4(numba){
    console.log(`FUNCTION4 - ${JSON.stringify(numba)}`);
    await Function3(numba);
    console.log(`FUNCTION4, AFTER FUNCTION3 - ${JSON.stringify(numba)}`);
})(-1000);
*/
async function Function5(){
    let f1 =  Function1();
    let f2 = Function2();
    await Promise.all([f1,f2]);
    console.log('FUNCTION 5 - Func1 is done');
    console.log('FUNCTION 5 - Func2 is done');
}

Function5();