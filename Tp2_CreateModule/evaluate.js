function sum(a, b) {
    return a + b;
}

function multiply(a , b) {
    return a * b;
}

var str = "This is string from module evaluate";

exports.sum = sum;

exports.str = str;

exports.multiply = multiply;