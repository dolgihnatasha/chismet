
function f(x) {
    return Math.pow(Math.E, -x * x)
}

function left(a,b, func, step) {
    let s = 0;
    let n = (b - a) / step;
    for (let i = 0; i < n; i++) {
        s += func(a);
        a += step;
    }
    return [parseFloat((s * step).toFixed(5)), n];
}

function trap(a, b, func, step) {
    let s = (func(a) + func(b)) / 2;
    let l = left(a, b, func, step);
    s = s * step + l[0];
    return [parseFloat(s.toFixed(5)), l[1]];
}

function runge(method, curr, prev, i) {
    if (i != 0.1){
        if (method == 'left') {
            return parseFloat((curr - prev).toFixed(5));
        } else {
            return parseFloat(((curr - prev)/ 3).toFixed(5));
        }
    }
}

function run_all(func_arr, a, b, func, step_arr) {
    let prev;
    func_arr.forEach((method) => {
        step_arr.forEach((step) => {
            let m = method(a, b, func, step);
            console.log(method.name, step.toFixed(5), m, runge(method.name, m[0], prev, step) );
            prev = m[0];
            }
        )
    });
}



run_all([left, trap], 0, 1, f, [0.1, 0.05, 0.025]);

function f_gauss(x) {
    return f(0.5 * (x + 1)) * 0.5
}

let sqrt3 = Math.sqrt(1 / 3);
console.log((f_gauss(-sqrt3) + f_gauss(sqrt3)).toFixed(5));