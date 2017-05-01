
function a(i) {
    return 1;
}

function c(i) {
    return 1;
}

function init_b(step) {
    return function (i) {
        return -2 - step * step;
    }
}

function init_d(step,  qi = 1) {
    return function (i) {
        return step * step * qi(step * i);
    }
}

function q(x) {
    return 6.8 + 2.4 * x * (1 - x);
}

function progonka(start, finish, step, b0, c0, d0, an, bn, dn, qi) {
    let lambda = [-c0 / b0];
    let mu = [d0 / b0];
    let b = init_b(step);
    let d = init_d(step, qi);
    let i;
    for (i = 0; i < ((finish - start) / step); i ++) {
        lambda.push(-c(i) / (a(i) * lambda[i] + b(i)));
        mu.push((d(i) - a(i) * mu[i]) / (a(i) * lambda[i] + b(i)));
        // console.log(i, lambda[i])
    }
    console.log(lambda);
    console.log(mu);
    console.log();
    console.log();
    let n = i;

    // let yn = ;

    let y = [(dn - an * mu[i]) / (an * lambda[i] + bn)];
    // console.log(yn);
    for (; i > 0; i-- ) {
        console.log(lambda[i - 1], y[n - i], mu[i - 1]);
        y.push(lambda[i] * y[n - i] + mu[i]);
        console.log();
    }
    console.log(y.reverse())
}

let last = Math.E - 1 / Math.E - 2;
// progonka(0, 1, 0.1, 1, -1, -2.4, 0, 1, last, q);





function yi(y0, z0, step) {
    return y0 + step * z0 * (6 + 3 * step + step * step + step * step * step / 4) / 6
}

function f(x, y) {
    return y + 6.8 + 2.4 * x * (1 - x);
}

function zi(z0, y0, x0, step) {
    let k1 = f(x0, y0);
    let k2 = f(x0 + step / 2, y0 + k1 * step / 2);
    let k3 = f(x0 + step / 2, y0 + k2 * step / 2);
    let k4 = f(x0 + step, y0 + k3 * step);
    return z0 + step * (k1 + 2 * k2 + 2 * k3 + k4) / 6;
}

function shooting(m, n, e) {
    let x0 = 0;
    let xn = 1;
    let zn = Math.E + 1 / Math.E + 2
    let h = (xn - x0) / n;
    let m1;
    while (true) {
        let y = [m];
        let z = [-2.4];
        let x = [0];
        for (let i = 0; i < n; i++) {
            y.push(yi(y[i], z[i], h));
            z.push(zi(z[i], y[i], h * i + x0, h));
            x.push(h * (i + 1));
        }
        let u = [0];
        let v = [1];
        for (let i = 0; i < n; i ++) {
            u.push(u[i] + h * v[i]);
            v.push(v[i] + h * u[i]);
        }
        m1 = m - (z[n] - zn) / v[n];
        if (Math.abs(m - m1) < e) {
            return [x, y]
        }
        m = m1;
    }
}

function zip() {
    let args = [].slice.call(arguments);
    let shortest = args.length==0 ? [] : args.reduce(function(a,b){
        return a.length<b.length ? a : b
    });

    return shortest.map(function(_,i){
        return args.map(function(array){return array[i]})
    });
}

google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

    let data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Dogs');


    [x, y] =shooting(1, 10, 0.001);


    data.addRows(
        zip(x, y)
    );

    var options = {
        hAxis: {
            title: 'x'
        },
        vAxis: {
            title: 'y'
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}
