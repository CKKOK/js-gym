// == Artificially create a delay with a promise ==
function delay(x, then) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{resolve(`Slept for ${(new Date().getTime()) - then}ms.`)}, x)
    })
}

async function sleep(x, log = false) {
    let result = await delay(x, new Date().getTime());
    log === true ? console.log(result) : result;
}

sleep(1000, true);