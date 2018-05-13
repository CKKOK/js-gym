const testArray = [1,2,3,4];

function getPoset(arr) {
    let result = [[]];
    let tmp = [];
    arr.forEach(element => {
        tmp = JSON.parse(JSON.stringify(result));
        tmp.forEach(el => {
            el.push(element)
        })
        result = JSON.parse(JSON.stringify(result)).concat(JSON.parse(JSON.stringify(tmp)));
    })
    return result;
}

console.log(getPoset(testArray));