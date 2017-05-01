#!usr/bin/python3

import math

import matplotlib.pyplot as plt
import numpy as np

f = lambda x: math.exp(x) + math.exp(-x) + 2.1*x**2 - 2.1*x - 2

def func(x0, x, n):
    h = (x - x0)/n
    y0 = f(x0)
    yield (x0, y0)
    for i in range(1, n + 1):
        xi = x0 + h*i
        yield(xi, f(xi))

# Метод стрельбы

def shooting(x0, y0, xn, zn, n, m, e):
    h = (xn - x0)/n
    while True:
        z0 = m
        xs = [x0, ]
        ys = [y0, ]
        zs = [z0, ]
        for i in range(0, n):
            xi1 = h * (i + 1)
            yi1 = ys[i] + h * zs[i]
            zi1 = zs[i] + h * (ys[i] - 2.1 * (xs[i] ** 2) + 2.1 * xs[i] + 6.2) 
            xs.append(xi1)
            ys.append(yi1)
            zs.append(zi1)
        print(xs, ys, zs)
        print(zs[n])

        u0 = 0
        v0 = 1
        us = [u0, ]
        vs = [v0, ]
        for i in range(0, n):
            ui1 = us[i] + h * vs[i]
            vi1 = vs[i] + h * us[i]
            us.append(ui1)
            vs.append(vi1)
        m1 = m - (zs[n] - zn)/vs[n]
        if  m - m1 < e:
            return (xs, ys)
        m = m1

x = []
y = []
x1 = []
y1 = []
x2 = []
y2 = []
x3 = []
y3 = []

for elem in func(0, 1, 10):
    x.append(elem[0])
    y.append(elem[1])

x1, y1 = shooting(0, 0, 1, math.exp(1) - math.exp(-1) + 2.1, 10, 1, 0.001)
x2, y2 = shooting(0, 0, 1, math.exp(1) - math.exp(-1) + 2.1, 20, 1, 0.001)
x3, y3 = shooting(0, 0, 1, math.exp(1) - math.exp(-1) + 2.1, 100, 1, 0.001)

line, line1, line2, line3 = plt.plot(x, y, x1, y1, 'bD:', x2, y2, 'r^:', x3, y3, 'go:')

plt.legend( (line, line1, line2, line3), ('Настоящая', 'Метод стрельбы 10', 'Метод стрельбы 20', 'Метод стрельбы 100'), loc = 'best')

plt.grid()

plt.savefig('graphic_lab6_{}.png'.format('стрельба'), format = 'png')


