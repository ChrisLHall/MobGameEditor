var origLog = console.log
console.log = function (message) {
  origLog(message)
  var msgbox = document.querySelector("#DEBUGTEXT")
  msgbox.innerHTML += message.toString()
}