const threadCall = require("../src")
const { log } = require("console")
const RxOp = require("rxjs/operators")

threadCall("./func", "Vikas", "Gautam")
   .subscribe(log, log)

threadCall("./promise", 5)
   .subscribe(log, log)

threadCall("./observable", 1, 10)
   .subscribe(log, log)

// Terminating before it should
threadCall("./observable", 1, 15).pipe(
   RxOp.timeout(10 * 1000)
).subscribe(log, log)