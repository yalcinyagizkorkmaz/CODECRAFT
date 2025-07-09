

function collatzLength(n, cache) {
    let start_number = n;
    let length = 0;
    while (n !== 1) {
        if (cache[n]) {
            length += cache[n];
            break;
        }
        if (n % 2 === 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        length++;
    }
    cache[start_number] = length;
    return length;
}

let maxLength = 0;
let number = 0;
const cache = {};

for (let i = 1; i < 1000000; i++) {
    const len = collatzLength(i, cache);
    if (len > maxLength) {
        maxLength = len;
        number = i;
    }
}

console.log(`En uzun Collatz zincirini başlatan sayı: ${number}`);
console.log(`Zincir uzunluğu: ${maxLength}`);
