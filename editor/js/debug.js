var origLog = console.log
console.log = function (message) {
  origLog(message)
  var msgbox = document.querySelector("#DEBUGTEXT")
  var txt = (typeof message != 'undefined') ? message.toString() : "undefined"
  msgbox.innerHTML += txt + "<br>"
}