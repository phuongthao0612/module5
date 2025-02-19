const isPrime = (number) => {
    if (typeof number !== 'number' || !Number.isInteger(number)) return false;
    if (number < 2) return false;
    return !Array.from({ length: Math.floor(Math.sqrt(number)) - 1 }, (_, i) => i + 2)
        .some(i => number % i === 0);
};

const numbers = [1, 2, 3, 4, 5, 6, 7];
const findPrimes = (arr) => arr.filter(isPrime);
console.log(findPrimes(numbers));
