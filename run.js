function maxCost(user1) {
    let user2=0;
    let maxCost = 0;
    let lastCost ;
    while (user1>0) {
        // gamble user1 and user2
        const random = Math.random();
        if (random > 0.5) {
            user2 = user2 + 1;
            user1 = user1 + 1;
            let currentCost = Math.abs(user2);
            if ( currentCost > maxCost) {
                maxCost = currentCost;
            }
            lastCost =  currentCost;
        }
        else{
            user2 = user2 + 1;
            user1 = user1 - 1;
            let currentCost = Math.abs(user2);
            lastCost =  currentCost;

        }
    }    
    return maxCost;
}

function run(user1Price,iterations){
    let results = [];
    const originalIterations = iterations;
    while (iterations>0) {
        const cost = maxCost(user1Price);
        results.push(cost);
        iterations--;
        if (iterations%2==0) {
            console.log(`${Math.floor((1-iterations/originalIterations)*100)}%`);
            setProgress(iterations,originalIterations);
        }
    }
    const av = arrayAvrage(results);
    const md = arrayMedian(results);
    return {avrage:av,median:md,total:results.reduce((acc, c) => acc + c, 0)};
}

function avrage(num1,num2){
    return (num1+num2)/2
}

function arrayAvrage(arr) {
    const total = arr.reduce((acc, c) => acc + c, 0);
    return total / arr.length;
}

function arrayMedian(arr) {
    arr.sort((a,b)=>a-b);
    const middle = Math.floor(arr.length/2);
    return arr[middle];
}

// html code
function runIteration() {
    let user1Price = document.getElementById("user1Price").value;
    let iterations = document.getElementById("iterations").value;
    console.log(user1Price , iterations)
    const result = run(user1Price , iterations);
    console.log(result);
    document.getElementById("result").innerHTML= `
    avrage = ${result.avrage}<br>
    median = ${result.median}<br>
    total = ${result.total}<br>
    `
}
function setProgress(iterations,originalIterations) {
    document.getElementById("progress").innerHTML =`
    ${Math.floor((1-iterations/originalIterations)*100)}%
    `
}