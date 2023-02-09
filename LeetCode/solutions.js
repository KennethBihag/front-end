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

let seqSz = 0;
/**
 * @param {number} n
 * @return {number[]}
 */
var constructDistancedSequence = function(n) {
    if(n == 1){
        result = "[1]";
        return new Array(1);
    }
    seqSz = 2*n-1;
    let seq = new Array(seqSz);
    let toAdd = Array();

    seq.fill(0);
    seq[0] = seq[n] = n;

    for(let i=1; i < n; i++){
        toAdd.push(i);
    }
    while(toAdd.length > 0){
        let currN = toAdd.pop();
        let i = seq.indexOf(0);
        if(!cdsHelper(seq, toAdd, i, currN)){
            toAdd.unshift(currN);
        }
    }

    result = JSON.stringify(seq);
    return seq;

};

function cdsHelper(seq, buff, s, n){
    let added = false;
    if(n == 1){
        seq[s] = 1;
        added = true;
    } else
        while(s+n < seqSz){
            if(seq[s] == 0 && seq[s+n] == 0){
                seq[s] = seq[s+n] = n;
                let newN = buff.shift();
                if(newN !== undefined){
                    let i = seq.indexOf(0);
                    added = cdsHelper(seq, buff, i,newN);
                }
                break;
            }
            s++;
        }

    return added;
}

var applyOperations = function(nums) {
    for(let i=0; i < nums.length-1; i++){
        if(nums[i]!=nums[i+1] || nums[i]==0)
            continue;
        nums[i] *= 2;
        nums[i+1] = 0;
    }
    for(let i=0, j=1; i < nums.length-1; i++,j++){
        if(nums[i] == 0){
            while(nums[j] == 0)
                j++;
            if(j >= nums.length)
                break;
            nums[i] = nums[j];
            nums[j] = 0;
        }
    }
    result = nums;
};

var maximalRectangle = function(dims, matrix) {
    console.log(`Matrix rows:${dims[0]} cols:${dims[1]}`);
};

const funcs = [radix_sort, constructDistancedSequence, applyOperations, maximalRectangle];

export default funcs;