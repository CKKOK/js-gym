// == For benchmarking (synchronous) functions ==
function benchmark(func) {
    let start = new Promise((resolve, reject) => {
        let then = new Date().getTime();
        let result = func();
        resolve(new Date().getTime() - then);
    });
    start.then((time) => {console.log("Ran for", time, "ms.")})
}

function wrapper() {
    let i = 100000,
        base = 'abcde',
        str = 'abcde',
        arr = [];
    while (i > 0) {
        arr.push(base);
        // arr.unshift(base); // When i = 100000, this takes nearly 6 s while the push operation above takes 5 ms. No typo!
        // base = base + str;
        // base = base.concat(str);
        i--;
    }
}

// benchmark(wrapper);

module.exports = benchmark;