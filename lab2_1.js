function f(x) {
    return Math.pow(Math.E, -x * x)
}

function left(a,b, func, step) {
    let s = 0;
    let n = (b - a) / step;
    for (let i = 0; i < n; i++) {
        s += func(a + i * step);
    }
    return [parseFloat((s * step).toFixed(5)), n];
}

function trap(a, b, func, step) {
    let s = (func(a) + func(b)) / 2;
    let n = (b - a) / step;
    for (let i = 1; i < n; i++) {
        s += func(a + i * step);
        // console.log(s)
    }
    return [parseFloat((s * step).toFixed(5)), n];
}

function runge(method, curr, prev, i) {
    if (i != 0.1){
        if (method == 'left') {
            return parseFloat((curr - prev).toFixed(5));
        } else {
            return parseFloat(((curr - prev)/ 3).toFixed(5));
        }
    } else {
        return ''
    }
}

function run_all(func_arr, a, b, func, step_arr) {
    console.log('metod| h    | result  | n  | Runge');
    console.log('-------------------------------------')
    let prev;
    func_arr.forEach((method) => {
        step_arr.forEach((step) => {
            let m = method(a, b, func, step);
            console.log(method.name, '|', step.toFixed(2), '|', m[0], '|', m[1], '|',  runge(method.name, m[0], prev, step) );
            prev = m[0];
            }
        );
        console.log('-------------------------------------')
    });
}

run_all([left, trap], 0, 1, f, [0.1, 0.05, 0.025]);

function f_gauss(x) {
    return f(0.5 * (x + 1)) * 0.5
}

let sqrt3 = Math.sqrt(1 / 3);
console.log('Gauss',(f_gauss(-sqrt3) + f_gauss(sqrt3)).toFixed(5));

// metod| h    | result  | n  | Runge
// -------------------------------------
// left | 0.10 | 0.77782 | 10 |
// left | 0.05 | 0.76247 | 20 | -0.01535
// left | 0.03 | 0.75469 | 40 | -0.00778
// -------------------------------------
// trap | 0.10 | 0.74621 | 10 |
// trap | 0.05 | 0.74667 | 20 | 0.00015
// trap | 0.03 | 0.74679 | 40 | 0.00004
// -------------------------------------
// Gauss 0.74659
