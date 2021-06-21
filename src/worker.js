const { workerData, parentPort } = require("worker_threads")
const typeName = (value) => value.constructor.name

const { fPath, params } = workerData
const fn = require(fPath)
const result = fn(...params)

const send = (result) => parentPort.postMessage(result)
const onError = (error) => { throw error }

(typeName(result) == "Observable") ? result.subscribe(send, onError) :
(typeName(result) == "Promise")    ? result.then(send).catch(onError)
                                   : send(result)