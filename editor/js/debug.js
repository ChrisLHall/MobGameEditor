var origLog = console.log
console.log = function (message) {
  origLog(message)
  var msgbox = document.querySelector("#DEBUGTEXT")
  var txt = (typeof message != 'undefined') ? message.toString() : "undefined"
  if (typeof Error != 'undefined' && typeof (new Error().stack) != 'undefined') {
    var stackTxt = new Error("Stack: ").stack.toString()
    origLog(stackTxt)
    txt += "<br>" + stackTxt
  }
  msgbox.innerHTML = txt + "<br><br>" + msgbox.innerHTML
}

window.onerror = function (msg, fname, line, col, err) {
  console.log("Window error: " + msg + ", " + fname + ", " + line + ", " + col + ", " + err)
}

function escapeHTML(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function dumpProps(obj) {
  var result = "";
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      result += key + ":" + obj[key] + " ";
    }
  }
  return result;
}

