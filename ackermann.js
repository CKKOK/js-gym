let numIterations = 0;

// The Ackermann Function is an early example of a computable function (one that can be implemented using only for/while loops) that is not primitive recursive (one that can be implemented using only do-loops (in JS, this is a for-loop))

function A(x, y) {
    numIterations++;
    if (x === 0) {
        return ++y;
    } else if (y === 0) {
        return A(x-1, 1);
    } else {
        return A(x-1, A(x, y-1));
    }
};

// Observe the how quickly the number of iterations grows with x (huge understatement)
console.log(A(3,3), numIterations);
