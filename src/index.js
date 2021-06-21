const { Observable } = require("rxjs") 
const { Worker } = require("worker_threads")
const path = require("path")

const workerPath = __dirname + "/worker.js"

// Path to the entry point (index.js) of nodejs process
const mainPath = path.dirname(require.main.filename)

const threadCall = (relativePath, ...params) =>
   new Observable((subs) => {
      const fPath = path.resolve(mainPath, relativePath)
      const workerData = { fPath, params }
      const worker = new Worker(workerPath, { workerData })
      worker.on("message", (v) => subs.next(v))
      worker.on("error", (e) => subs.error(e))
      worker.on("exit", (c) => subs.complete())
      return () => worker.terminate()
   })

module.exports = threadCall