var selectedSlot = null

function sameParent(a, b) {
  return a.parentNode == b.parentNode
}

function isSubContainer(container) {
  console.log("checking class name " + a.parentNode.className.toString())
  return a.parentNode.className == "subcontainer"
}

function escapeHTML(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
 }

var ToolboxItems = {
  "if": "#ifTemplate",
  "elseIf": "#elseIfTemplate",
  "else": "#elseTemplate",
  "end": "#endTemplate",
  "assign": "#assignTemplate",
}
var TextSubs = {
  "ifTemplate": "if ({0}) {",
  "elseIfTemplate": "} else if ({0}) {",
  "elseTemplate": "} else {",
  "endTemplate": "}",
  "assignTemplate": "{0} = {1}",
}
function addBlock(which) {
  template = ToolboxItems[which]
  if (!template) {
    return
  }
  copied = document.querySelector(template).cloneNode(true)
  copied.removeAttribute("id")
  document.querySelector("#listy").appendChild(copied)
  recolorBlocks()
}

function swapUp(node) {
  if (node.previousSibling) {
    node.parentNode.insertBefore(node, node.previousSibling)
  }
  recolorBlocks()
}

function swapDown(node) {
  if (node.nextSibling) {
    node.parentNode.insertBefore(node.nextSibling, node)
  }
  recolorBlocks()
}

function recolorBlocks() {
  // actually dont ... sad
  /*
  var lis = document.querySelectorAll("#listy li")
  var toggle = false
  for (var i = 0; i < lis.length; i++) {
    var list = lis[i].classList
    console.log(list)
    var color = toggle ? "color2" : "color1"
    var removeColor = toggle ? "color1" : "color2"
    list.add(color)
    if (list.contains(removeColor)) {
      list.remove(removeColor)
    }
    toggle = !toggle
  }
  */
}

function selectSlot(button, codePiece) {
  var lis = document.querySelectorAll("#listy .subselectbutton")
  for (var i = 0; i < lis.length; i++) {
    var item = lis[i]
    var classes = item.classList
    var thisOne = item == button
    
    var addStyle = thisOne ? "subselected" : "subdeselected"
    var removeStyle = thisOne ? "subdeselected" : "subselected"
    if (!classes.contains(addStyle)) {
      classes.add(addStyle)
    }
    if (classes.contains(removeStyle)) {
      classes.remove(removeStyle)
    }
    console.log(escapeHTML(button.innerHTML))
    console.log(escapeHTML(item.innerHTML))
    console.log(classes)
    console.log(thisOne.toString())
    // todo finish
  }
}

function collectAll() {
	var lis = document.querySelectorAll("#listy li");
	var collected = "";
	for (var i = 0; i < lis.length; i++) {
		console.log(lis[i].childNodes)
    var addedText = TextSubs[lis[i].className] + "\n"
    var children = lis[i].childNodes[0].childNodes
    var inputIdx = 0
    for (var j = 0; j < children.length; j++) {
      console.log("child " + j.toString())
      var child = children[j]
      console.log(child)
      if (child.type && child.type === "text") {
        var text = "{" + inputIdx.toString() + "}"
        console.log("THERES A CHILD")
        console.log(child)
        console.log(child.value)
        addedText = addedText.replace(text, child.value)
        inputIdx++
      }
    }
    collected += addedText
	}
	document.querySelector("#collectalltext").textContent = collected;
}