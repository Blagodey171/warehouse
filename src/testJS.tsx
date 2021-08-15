let foo = async () => {
   return await Promise.resolve('hello babel')
}
console.log(foo())