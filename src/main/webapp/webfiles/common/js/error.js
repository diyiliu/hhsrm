
var fhError = new Object();
function getCenter(ele) {
	ele = document.getElementById(ele);
	return ele;
}

//显示
fhError.show = function () {
    var arr = new Array();
	arr.push("<table id='ui-error' class='ui-error' cellpadding='0' cellspacing='0' border='0'><tr><td class='ui-error-t-l'></td>");
	arr.push("<td class='ui-error-t-c'>\u4fe1\u606f\u63d0\u793a\uff1a</td><td class='ui-error-t-r'></td></tr><tr><td valign='top' class='ui-error-c-l'><div class='ui-error-c-i'></div></td>");
	arr.push("<td class='ui-error-c-c'>");
	arr.push("<span id='clientError'></span>");//客户端错误显示
	var serviceError = getCenter("serviceError");
	arr.push(serviceError.innerHTML);//服务器错误显示
	arr.push("</td><td class='ui-error-c-r'></td></tr><tr><td class='ui-error-b-l'></td><td class='ui-error-b-c'></td>");
	arr.push("<td class='ui-error-b-r'></td></tr></table>");
	var div = getCenter("myErrorDiv");
	if (div) {
		div.innerHTML = arr.join("\n");//以\n分隔数组显示
	}
};

//追加错误
function testInsertNode(obj) {
	var ema_Errortbl = getCenter("ui-error");
	if (ema_Errortbl) {
		var node = getCenter("clientError");
		var insertedNode = document.createElement("p");
		insertedNode.appendChild(document.createTextNode(obj));   
	         //获取节点的父节点,并将创建的节点插入到该节点的下一个节点之前.   
		node.appendChild(insertedNode, node.nextSibling);
		//window.location.hash="myErrorDiv";//JS锚链
	} else {
		fhError.show();
		var node = getCenter("clientError");
		var insertedNode = document.createElement("p");
		insertedNode.appendChild(document.createTextNode(obj));   
	         //获取节点的父节点,并将创建的节点插入到该节点的下一个节点之前.   
		node.appendChild(insertedNode, node.nextSibling);
	}
	var div = getCenter("myErrorDiv");
	if(div.style.display == "none"){
		div.style.display = "";
	}
}
//清空
function clearNode(flag){
    var node = getCenter("clientError");
    if(node){
      node.innerHTML="";
    }
	if(flag){
	   getCenter("myErrorDiv").style.display = "none";
	}
}
