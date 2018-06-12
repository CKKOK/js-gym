# js-gym
A collection of personal solutions to small JavaScript problems. Includes, yes, fizzbuzz.

## delay.js
For creating artificial delays in code. Uses async/await and a promise at the backend to simulate a synchronous sleep.

## benchmark.js
For benchmarking functions. Originally used to compare performance between recursive and iterative pseudo-pointer implementations of binary searches on a phonebook with 1000 entries. Spoiler: no noticeable difference at this scale.

## ackermann.js
Calculate the value of the Ackermann function, an early example of a function that is computable, i.e. can be implemented using for/while loops, but not primitive recursive, i.e. needs only do-loops (in JS these are for-loops).

## fibonacci.js
4 different implementations of the calculation of the nth Fibonacci number.
- Calculation using an explicit formula after having solved the recurrence relation. O(1) complexity.
- Naive implementation of recurrence relation. O(2^n) complexity.
- Tail recursion. O(n) complexity, but in practice it takes a similar amount of time to run as the explicit formula due to the speed of Math.sqrt
- Iterative implementation of the recurrence relation. Also O(n) complexity, and should theoretically be faster than even the tail recursion implementation, but in practice is consistently about 30% to 60% slower.

## scrabble.js
Determine if 2 words are anagrams of each other.
Find all anagrams of a given word, using the enable1.txt dictionary provided by Google.
Consider reshaping the data in that dictionary to speed up future runs.
