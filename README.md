# js-gym
A collection of personal solutions to small JavaScript problems. Includes, yes, fizzbuzz.

## delay.js
For creating artificial delays in code. Uses async/await and a promise at the backend to simulate a synchronous sleep.

## benchmark.js
For benchmarking functions. Originally used to compare performance between recursive and iterative pseudo-pointer implementations of binary searches on a phonebook with 1000 entries. Spoiler: no noticeable difference in at this scale.

## ackermann.js
Calculate the value of the Ackermann function, an early example of a function that is computable, i.e. can be implemented using for/while loops, but not primitive recursive, i.e. needs only do-loops (in JS these are for-loops).