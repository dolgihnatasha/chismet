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

# Метод прогонки

def tridiagonal(x0, x, n):
    h = (x - x0)/n
    # массив лямбд
    l = []
    # массив мю
    m = []
    l.append(None)
    m.append(None)
    l.append(0)
    m.append(0)
    for i in range(1, n):
        xi = x0 + h*i
        h2 = h ** 2
        l.append(1 / ((2 + h2) - l[i]))
        m.append((m[i] - h2 * ((-2.1 * (xi ** 2)) + (2.1 * xi) + 6.2))/ ((2 + h2) - l[i]))
    yn = ((h * (math.exp(1) + math.exp(-1) + 2.1) + m[n]) / (1 - l[n]))
    result = []

    result.append((x, yn))

    for i in range(n, 0, -1):
        j = n - i
        yi = result[j][1]
        result.append((x0 + h*(i - 1), l[i]*yi + m[i]))
    result.reverse()
    return result

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

for elem in tridiagonal(0, 1, 10):
    x1.append(elem[0])
    y1.append(elem[1])

for elem in tridiagonal(0, 1, 20):
    x2.append(elem[0])
    y2.append(elem[1])

for elem in tridiagonal(0, 1, 3000):
    x3.append(elem[0])
    y3.append(elem[1])

line, line1, line2= plt.plot(x, y, x1, y1, 'bD:', x2, y2, 'r^:')

plt.legend( (line, line1, line2), ('Настоящая', 'Метод прогонки 10', 'Метод прогонки 20'), loc = 'best')

plt.grid()

plt.savefig('graphic_lab6_{}.png'.format('прогонка'), format = 'png')

