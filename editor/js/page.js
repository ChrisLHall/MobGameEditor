var selectedSlot = null
var selectedInsert = null

function sameParent(a, b) {
  return a.parentNode == b.parentNode
}

function isSubContainer(container) {
  console.log("checking class name " + a.parentNode.className.toString())
  return a.parentNode.className == "subcontainer"
}

var exampleAST = [
  {
    instr: "if",
    op1: "lives",
    op2: 1,
    comp: "<",
  }, {
    instr: "func",
    name: "die",
    args: [0,],
  }, {
    instr: "end",
  },
]

var ToolboxItems = {
  "if": "#ifTemplate",
  "elseIf": "#elseIfTemplate",
  "else": "#elseTemplate",
  "end": "#endTemplate",
  "assign": "#assignTemplate",
  "func": "#funcTemplate",
}
var TextSubs = {
  "ifTemplate": "if ({0}) {",
  "elseIfTemplate": "} else if ({0}) {",
  "elseTemplate": "} else {",
  "endTemplate": "}",
  "assignTemplate": "{0} = {1}",
  "funcTemplate": "{0}({1})",
}
function addBlock(which) {
  template = ToolboxItems[which]
  if (!template) {
    return
  }
  copied = document.querySelector(template).cloneNode(true)
  copied.removeAttribute("id")
  var updown = document.querySelector("#updowntemplate").cloneNode(true)
  updown.removeAttribute("id")
  copied.insertBefore(updown, copied.firstChild)
  if (null !== selectedInsert) {
    document.querySelector("#listy").insertBefore(copied, selectedInsert.nextSibling)
  } else {
    document.querySelector("#listy").appendChild(copied)
  }
  addInsertButton(copied)
  recolorBlocks()
}
function addInsertButton(after) {
  var between = document.querySelector("#betweentemplate").cloneNode(true)
  between.removeAttribute("id")
  between.removeAttribute("hidden")
  after.parentNode.insertBefore(between, after.nextSibling)
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

function selectInsert(button) {
  var lis = document.querySelectorAll("#listy .betweenselectbutton")
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
  }
}

function populateFromAST(blockList, level) {
  for (var i = 0; i < blockList.length; i++) {
    console.log("addblock " + i)
    var block = blockList[i]
    addBlock(block.instr)
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
