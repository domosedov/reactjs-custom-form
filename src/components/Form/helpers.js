export const readAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onerror = reject
    fr.onload = function () {
      resolve(fr.result)
    }
    fr.readAsDataURL(file)
  })
}
