const benchmark = require('./benchmark.js');

function fibonacci_explicit(n) {
    return (1 / Math.sqrt(5)) * (((1 + Math.sqrt(5))/2)**n - ((1 - Math.sqrt(5))/2)**n); // The Binet Formula, derived by solving the recurrence relation F_n = F_(n-1) + F_(n-2) with boundary values F_1 = F_2 = 1. Isn't math fun? ;)
}

function fibonacci_naive(n) {
    if (n === 1 || n === 2) {
        return 1;
    } else {
        return fibonacci_naive(n-1) + fibonacci_naive(n-2);
    }
}

// Although ECMAScript 6 specifies that a proper tail call should use the calling function's stack space, as of May 2018 it seems that this is only implemented in Webkit (https://webkit.org/blog/6240/ecmascript-6-proper-tail-calls-in-webkit/) and this has not been flagged for consideration in V8 development. However, even without tail call optimization, the following recursive implementation of fibonacci number calculation's stack space consumption should grow linearly (O(n)) rather than geometrically as with the naive implementation above (O(2**n)).
'use strict';
function fibonacci_tail_recursion(n, i = 1, j = 1) {
    if (n === 1 || n === 2) {
        return j;
    }
    return fibonacci_tail_recursion(n-1, j, i+j);
}

// Iterative implementation of the tail recursive method above.
function F(n) {
    if (n > 1476) {return Infinity}; // The 1477th Fibonacci number is outside the bounds of what a JS number can store (< 2**1024)
    let [i,j,k] = [1,1,n];
    while (k > 2) {
        [i,j,k] = [j,i+j,--k];
    }
    return j;
}

function wrapper() {
    console.log(fibonacci_explicit(1000)); // O(1) complexity.
    // console.log(fibonacci_naive(44));
    // console.log(fibonacci_tail_recursion(1000)); // Interestingly, this takes about as much time as the explicit formula's implementation. I knew Math.sqrt is slow, but that's really slow.
    // console.log(F(1000)); // Oddly, this seems to be much slower than the tail recursive implementation???
}

benchmark(wrapper);