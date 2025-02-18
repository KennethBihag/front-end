export let result = {};

function radix_sort(nums){
    if(nums instanceof Array){
        console.log("Sorting " + nums + " with Radix Sort algo.");
        for(let i=0; i<3; i++)
            nums = rshelper(nums, i);
        result = nums;
    }
    else
        result = undefined;
}

function rshelper(nums, place){
    function getIdx(num, pos){
        return Math.floor(num / Math.pow(10,pos)) % 10;
    };

    let digits = Array(10).fill(0);
    nums.forEach(e => {
        let d = getIdx(e, place);
        digits[d]++;
    });
    console.log(digits);

    for(let i=0, j=0; i < 10; i++){
        let k = j;
        j += digits[i];
        digits[i] = k;
    }
    console.log(digits);

    let newNums = Array(nums.length).fill();
    nums.forEach(e => {
        let d = getIdx(e, place);
        let x = digits[d];
        newNums[x] = e;
        digits[d]++;
    });
    console.log(newNums);
    return newNums;
}

function cllvs(nums){
    result = nums;
}

const funcs = [radix_sort, cllvs];

export default funcs;