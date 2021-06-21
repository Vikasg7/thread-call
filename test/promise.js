const wait = (sec) =>
   new Promise((res, rej) => setTimeout(res, sec * 1000))

const someFn = async (sec) => {
   console.log("waiting for", sec, "seconds")
   await wait(sec)
   return Math.random()
}

module.exports = someFn