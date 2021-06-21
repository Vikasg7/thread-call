const Rx = require("rxjs")
const RxOp = require("rxjs/operators")

const someFn = (f, c) =>
   Rx.range(f, c, Rx.asyncScheduler).pipe(
      RxOp.delay(c * 1000),
      RxOp.reduce((acc, a) => acc + a, 0)
   )

module.exports = someFn