// Project Euler Problem 484
// https://projecteuler.net/problem=484
// The arithmetic derivative is defined by
// p' = 1 for any prime p
// (ab)' = a'b + ab' for all integers a, b (Leibniz rule)
// For example, 20' = 24
// Find ∑ gcd(k,k') for 1 < k ≤ 5·10^15
// Note: gcd(x,y) denotes the greatest common divisor of x and y.

const benchmark = require('./benchmark.js');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
let workers = [];
let workersRegistry = new Map();

// These are just the primes less than 100 that I could recall off the top of my head. Helps with the DP version of isPrime()
let knownPrimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];
let largestKnownPrime = knownPrimes[knownPrimes.length - 1];

function isPrime(n) {
    if ((n === 1) || ((n > 2) && ((n & 1) === 0))) return 0;
    if (n === 2) return 1;
    let upperLimit = Math.floor(Math.sqrt(n));
    for (let i = 3; i <= upperLimit; i++) {
        if (n % i === 0) {
            return 0;
            break;
        }
    };
    return 1;
}


function isPrimeDyn(n) { // Turns out that the storing and looking up of data in the array adds so much overhead that this function is almost never worth using over the naive implementation
    if ((n === 1) || ((n > 2) && ((n & 1) === 0))) return 0;
    if (knownPrimes.includes(n)) {
        return 1;
    } else {
        largestKnownPrime = knownPrimes[knownPrimes.length - 1];
        if (n < largestKnownPrime) {
            return 0;
        };
        let upperLimit = Math.floor(Math.sqrt(n));
        for (let i = 0; i < knownPrimes.length; i++) {
            if (n % knownPrimes[i] === 0) {
                return 0;
            };
        };
        for (let p = largestKnownPrime; p <= upperLimit; p++) {
            if (n % p === 0) {
                return 0;
            }
        };
        knownPrimes.push(n);
        return 1;
    }
}


function primeFactorize(n, init = [1]) {
    if (isPrime(n) === 1) {
        return [...init, n]
    }
    let result = init, i = result[result.length - 1], upperLimit = Math.floor(Math.sqrt(n));
    while (i <= upperLimit) {
        if (isPrime(i) && ((n % i) === 0)) {
            result.push(i);
            break;
        };
        i++;
    }
    return primeFactorize(n / result[result.length -1], result);
}

function gcdDerive(n) {
    let primeFactors = primeFactorize(n);
    let tmp = null;
    primeFactors.shift();
    let factorCount = new Map([...new Set(primeFactors)].map(x => [x, primeFactors.filter(y => y===x).length]));
    return Array.from(factorCount)
                .filter(x => x[1] > 1)
                .map(x => [x[0], x[1]-1])
                .reduce((prev, curr) => (prev * (curr[0]**curr[1])), 1);
}

let primeStatus = [];

function primeCheckWrapper(start = 1, end = 1e7, id = 0) {
    let j = 1, k = -1;
    primeStatus[j] = new Int8Array(33554432);
    for (let i = start; i <= end; i++) {
        if (k >= (33554431)) {
            j++;
            primeStatus[j] = new Int8Array(33554432);
            k = 0;
        } else {
            k++;
        };
        primeStatus[j][k] = isPrime(i);
    };
}

let total = 0;

function wrapper() {
    let upperLimit = 1e6;
    for (let i = 2; i <= upperLimit; i++) {
        total += gcdDerive(i);
    }
    console.log(total);
}



if (cluster.isMaster) {
    console.log(`Master running on pid ${process.pid}`);
    let ended = 0;
    for (let i = 0; i < numCPUs; i++) {
        workers[i] = cluster.fork();
        workersRegistry.set(workers[i].process.pid, i);
        workers[i].on('message', function(msg) {
            if (msg.content) {
                console.log(`Master ${process.pid} received message from worker ${workers[i].process.pid} - ${msg.content}`);
            }
            if (msg.status) {
                ended++;
                primeStatus = primeStatus.concat(msg.data);
                if (ended === 7) {
                    console.log('all ended');
                    console.log(primeStatus);
                }
            }
        });
        workers[i].send({dataId: i})
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    process.on('message', function(msg) {
        if (msg.dataId) {
            process.send({content: `From worker ${process.pid}, starting...`});
            let primeStatus = new Int8Array(1000000);
            for (let i = 0; i <= 1000000; i++) {
                primeStatus[i] = isPrime(i);
            };
            process.send({status: `Worker ${process.pid} ended`, data: primeStatus});
        }
    })
}


// benchmark(primeCheckWrapper);
// benchmark(wrapper);


