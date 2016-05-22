import scipy.stats as stats
import sys

scores = {
0: [1,1,1,0.5,0.5,2,0.5,0.5,0.5,1,2.5,2,0.5,1,1,1,0.5,1,1,2.5,2.5,2.5,3,0.5,1,1,0.5,3,3,1,3,2.5,1,0.5,1,3,0.5,0.5,1,1,2.5,2.5,3,3,1.5,3,0.5,2.5,2,2.5,2,1,3,1,1,2.5,2.5,0.5,2.5,2.5,1,1,0.5,0.5,2.5,2.5,2.5,0.5,1,2,2,0.5,3,3,1,2,1,2.5,3,1,0.5,1,1.5,2,0.5,0.5,1,3,3,0.5,3,0.5,2.5,3,1,1,0.5,1,2.5,1,1,2,2.5,2.5,1,3,2.5],
1: [2.25,2.25,2.25,2.25,2.25,2.25,0,1.5,2.25,2.25,0,2.25,2.25,0,0.75,0,0.75,2.25,0,0.75,1.5,2.25,0,3,2.25,0,2.25,0,0.75,1.5,0,0,2.25,2.25,0.75,1.5,0,2.25,2.25,2.25,1.5,1.5,0,0,0.75,0,0,2.25,1.5,2.25,0,1.5,1.5,0,1.5,0,0,0.75,2.25,2.25,0,2.25,0,1.5,0,0,2.25,1.5,2.25,0,0.75,1.5,1.5,1.5,2.25,0,0,0,0,0.75,0.75,2.25,0,0.75,2.25,0,3,2.25],
2: [1,3,1,0,1,2,2,3,1,1,0,2,0,1,0,0,1,0,1,3,3,0,3,2,2,2,2,3,1,2,2,2,2,2,2,2,1,2,0,2,2,3,0,0,2,3,1,2,2,2,3,3,2,3,3,1,3,1,3,2,0,2,0,2,2,0,2,0,0,0,3,2,2,2,2,2,1,0,3,1,2,2,3,2,2,3,1,3,2,3,2,2,1,3,3,3,1,1,2,2,0,2,2,3,3,3,2],
3: [0,1.2,2.4,0,0,0,0,0,0,1.2,0.6,0,0.6,0.6,0.6,0.6,0,0.6,0.6,1.2,1.2,0.6,3,0,0.6,0,2.4,1.8,0,0.6,1.2,0.6,1.2,3,0.6,2.4,0.6,3,0.6,1.2,1.2,2.4,2.4,0.6,1.2,3,0.6,0.6,1.2,2.4,1.2,1.2,0.6,3,0.6,0.6,3,1.2,1.8,0.6,0.6,0,0,3,2.4,0,1.2,0.6,1.2,3,0.6,0,3,2.4,1.2,1.2,0,1.8,3,0,0.6,0.6,0,1.2,0.6,3,0.6,0.6,0.6,3,0.6,0.6,1.2,0,0.6,1.2,0,0.6,0.6,0,3,0.6,2.4,0.6,0.6,1.8,0.6],
4: [0.6,3,1.8,1.8,0.6,0.6,0,0.6,0.6,0.6,0,0.6,0.6,0.6,1.8,1.2,1.2,1.2,0,1.8,1.8,0.6,1.8,0,0.6,1.8,1.8,1.8,0.6,0,1.8,1.8,0.6,0.6,0.6,0.6,0.6,1.2,2.4,0,0.6,0.6,0.6,0.6,0.6,1.8,1.8,0.6,1.8,1.8,1.2,1.8,0.6,1.8,1.8,0.6,1.8,2.4,0.6,0.6,1.8,0.6,0.6,0.6,0,0.6,0.6,1.8,0.6,0,0.6,1.8,1.8,1.8,0.6,0.6,1.2,1.8,3,2.4,1.2,1.2,1.8,0.6,0.6,3,0.6,1.8,0.6,1.8,1.8,3,3,1.8,1.8,0.6,0.6,1.8,3,0.6,1.8,1.8,1.8,1.8,0.6,0.6,1.8],
5: [2,3,0,0,1,0,1,3,0,0,0,1,0,0,0,0,2,0,0,1,1,0,3,1,0,1,1,1,1,1,2,3,1,1,3,1,1,1,2,0,1,2,3,0,3,3,2,3,1,1,1,1,2,3,3,1,2,1,1,2,2,2,0,1,0,2,1,3,1,0,1,1,3,1,0,2,0,2,2,2,1,0,2,2,1,1,1,1,3,2,1,2,1,0,1,1,1,0,1,0,2,1,3,2,1,2,3],
6: [2.25,2.25,0.75,3,0.75,1.5,0,0,0,0,0,2.25,0.75,2.25,3,0,0,0,0,3,0,0,0,0,3,2.25,0,0,1.5,3,3,0,3,0,2.25,0,0,3,0,3,0,1.5,0,0,0,0,3,1.5,0,0,0,2.25,0,2.25,0,0,0,0,0,0,0,0,0,0,0.75,0,3,0,0,3,3,0,3,0,0,2.25,0,0,0,2.25,0.75,3,0,0,3,3,3,2.25],
7: [2,2,1,3,1,1,2,2,2,0,2,2,2,0,2,2,2,2,2,2,1,1,1,1,2,0,2,2,1,1,2,2,2,2,2,2,0,2,1,1,1,1,1,1,2,1,1,1,1,0,2,1,2,2,3,1,2,0,2,2,1,3,0,1,1,0,2,2,3,2,2,2,2,2,3,1,1,2,1,2,1,3,2,3,2,1,2,1],
8: [0.5,3,0,0,0.5,0.5,0,0.5,0.5,1,0.5,0.5,1,0,0,0.5,0.5,0.5,0,2.5,2.5,1,3,0.5,1,0.5,0.5,3,3,3,3,1,0.5,0.5,0.5,0.5,3,0,2.5,0.5,0.5,0.5,0.5,0.5,3,3,0.5,3,0.5,0.5,0.5,3,0,2,0.5,2.5,3,1,1.5,3,1,0.5,1.5,2.5,0,0.5,3,3,0.5,0.5,1.5,0.5,0.5,2,0,3,0.5,0.5,0.5,0.5,0.5,0,0.5,0.5,0,0.5,2,2,3,0.5,2.5,1.5,0.5,0.5,0.5,0.5,0.5,1,0.5,1,2.5,0.5,0.5,0.5,2.5,3,0.5],
9: [2.4,2.4,0,3,0.6,0,0,1.2,3,1.8,0,0.6,0.6,0,0,0,0,0.6,0,0,0,0.6,2.4,2.4,0,0,2.4,0.6,0.6,1.2,2.4,0,0,0,3,0,0.6,3,0,0.6,0,0.6,0,1.8,0,0,3,0.6,1.8,0,0,0,0,3,1.8,1.2,2.4,0.6,3,0,0,3,0,1.2,0,0,0.6,0,1.8,0,1.8,2.4,0.6,3,3,0.6,0,0.6,0.6,1.8,0,1.2,2.4,2.4,0.6,0.6,1.2,0],
10: [2.25,0.75,0,0,0,0,0,1.5,0.75,1.5,0,1.5,0.75,0,0,1.5,0,0,0,0.75,0.75,1.5,0.75,1.5,2.25,0,3,2.25,1.5,0,3,0,0,1.5,1.5,1.5,1.5,0.75,2.25,1.5,0.75,3,0.75,0,1.5,1.5,0,1.5,1.5,0,1.5,0,1.5,1.5,1.5,2.25,2.25,0.75,2.25,1.5,0,0,0,0.75,0,3,0,0.75,2.25,3,1.5,3,1.5,0,1.5,0.75,1.5,0.75,1.5,3,0,0.75,2.25,1.5,0.75,1.5,3,0.75],
11: [0.6,2.4,1.8,1.8,3,0,0.6,0.6,1.8,3,0,3,0,1.2,0.6,1.2,0.6,1.2,1.8,1.2,1.2,0.6,0.6,0.6,1.8,1.8,1.8,3,1.8,0.6,1.8,1.2,0,2.4,0.6,0.6,0,0.6,1.2,1.8,1.8,1.8,1.8,0.6,0.6,1.8,0.6,1.8,1.8,1.8,0.6,1.8,0,1.8,0.6,1.8,3,0,1.8,1.2,3,0,1.8,0,0.6,0.6,1.8,1.8,0,0.6,1.8,1.8,0,3,1.8,1.8,1.8,1.8,1.2,0,3,0,1.8,0.6,0.6,1.8,0.6,1.8,1.8,1.8,0.6,0,2.4,1.8,1.8,0.6,0.6,0,1.8,1.8,1.8,0,3,1.8,0.6,0.6,1.8],
12: [0.6,0.6,0.6,2.4,0.6,0.6,0.6,1.2,2.4,1.2,0,1.2,0.6,0,0,0,0.6,0.6,0.6,1.8,0,1.8,0.6,1.2,0,0.6,3,0.6,0,2.4,0.6,1.2,3,0,3,1.2,0,3,0,3,0,0,1.2,0,0.6,0.6,2.4,1.8,0,0,0,0.6,0.6,1.2,3,2.4,2.4,0.6,0,0,0,2.4,1.2,1.2,0.6,0,0,0.6,0.6,3,0.6,3,0,2.4,2.4,0.6,0,0,2.4,2.4,0,0,1.2,2.4,0,0,3,0.6],
13: [0.6,0.6,0.6,1.2,1.2,2.4,0.6,1.8,1.2,0.6,0.6,3,1.2,0,1.2,0,2.4,0,0,3,1.2,0.6,1.2,1.2,1.2,0.6,3,0,1.2,0,1.2,1.2,2.4,3,0.6,1.2,1.2,2.4,1.2,2.4,0,0.6,1.2,0,1.2,0.6,1.2,1.2,2.4,0,1.8,1.2,1.2,0,3,1.2,1.2,1.2,1.8,1.2,1.8,3,0,0,1.2,1.2,1.2,2.4,3,1.8,0.6,1.2,1.2,2.4,3,1.2,1.2,1.2,0,1.2,1.2,1.8,2.4,2.4,2.4,1.2,2.4,1.2],
14: [1.2,1.2,0,0,0,0,0.6,0,3,0,0,1.2,0.6,0,0,0,0,0,0,3,0.6,1.2,0.6,0.6,0,1.2,3,1.8,1.2,0.6,1.8,0,0,0.6,1.2,1.2,0,3,1.8,0,0,3,0,0,0,0,3,1.2,0,0,0.6,1.8,0,3,3,0.6,2.4,0,2.4,0,1.2,0.6,0,0,3,0.6,0,1.8,0,0,0,1.2,0,0,3,1.2,0,1.2,1.2,3,0,0,3,1.2,0,0,0,0],
15: [1.783333333,1.683333333,0.7,2.15,0.733333333,0.983333333,0.793333333,1.28,2.08,1.183333333,0.72,1.92,1.39,0.57,1.13,0.786666667,1.056666667,0.81,0.726666667,1.6,0.77,1.236666667,1.29,1.48,1.066666667,1.103333333,2.483333333,0.95,1.416666667,1.333333333,1.733333333,0.926666667,1.696666667,1.17,1.993333333,1.273333333,0.886666667,2.513333333,1.04,1.73,1.01,1.373333333,0.683333333,0.48,1.043333333,0.746666667,1.32,1.543333333,1.26,0.436666667,0.8,1.256666667,0.96,1.75,2.133333333,1.016666667,1.683333333,0.626666667,1.606666667,1.51,0.726666667,1.536666667,0.4,1.083333333,1.03,0.673333333,1.456666667,1.056666667,1.74,1.786666667,1.523333333,1.72,1.293333333,1.526666667,1.883333333,1.153333333,0.773333333,0.663333333,0.806666667,1.853333333,0.673333333,1.606666667,1.41,1.923333333,1.546666667,1.106666667,2.106666667,1.35]
}
#15 refers to the overall maturity score

focus_area = int(sys.argv[1])
score = sys.argv[2]
print float("{0:.2f}".format(stats.percentileofscore(scores[focus_area], score)))