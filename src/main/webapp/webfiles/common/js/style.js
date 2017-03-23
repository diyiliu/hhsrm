
/**
*auto:update by gaojianjian
*date:2010-7-18
**/
/*浏览器版本*/
var isIE = navigator.userAgent.toLowerCase().indexOf("msie") != -1;
var isIE6 = navigator.userAgent.toLowerCase().indexOf("msie 6.0") != -1;
var isIE7 = navigator.userAgent.toLowerCase().indexOf("msie 7.0") != -1 && !window.XDomainRequest;
var isIE8 = !!window.XDomainRequest && !!document.documentMode;
var isGecko = navigator.userAgent.toLowerCase().indexOf("gecko") != -1;
var PageCss = {};
//获取对象
function g(ele) {
	if (typeof (ele) == "string") {
		ele = document.getElementById(ele);
		if (!ele) {
			return null;
		}
	}
	if (ele) {
		Core.attachMethod(ele);
	}
	return ele;
}
var Core = {};
Core.attachMethod = function (ele) {
	if (!ele || ele["gA"]) {
		return;
	}
	if (ele.nodeType == 9) {
		return;
	}
	var win;
	try {
		if (isGecko) {
			win = ele.ownerDocument.defaultView;
		} else {
			win = ele.ownerDocument.parentWindow;
		}
		for (var prop in win.gE) {
			ele[prop] = win.gE[prop];
		}
	}
	catch (ex) {
	}
};
gE = {};
//追加样式
gE.addClassName = function (className, ele, before) {
	ele = ele || this;
	ele = g(ele);
	var currentClass = ele.className;
	currentClass = currentClass ? currentClass : "";
	if (!new RegExp(("(^|\\s)" + className + "(\\s|$)"), "i").test(currentClass)) {
		if (before) {
			ele.className = className + ((currentClass.length > 0) ? " " : "") + currentClass;
		} else {
			ele.className = currentClass + ((currentClass.length > 0) ? " " : "") + className;
		}
	}
	return ele.className;
};
gE.gT = function (tagName, ele) {
	ele = ele || this;
	ele = window.g(ele);
	return window.$T(tagName, ele);
};
if (typeof (HTMLElement) != "undefined" && !window.opera) {
	HTMLElement.prototype.__defineGetter__("outerHTML", function () {
		var a = this.attributes, str = "<" + this.tagName, i = 0;
		for (; i < a.length; i++) {
			if (a[i].specified) {
				str += " " + a[i].name + "=\"" + a[i].value + "\"";
			}
		}
		if (!this.canHaveChildren) {
			return str + " />";
		}
		return str + ">" + this.innerHTML + "</" + this.tagName + ">";
	});
	HTMLElement.prototype.__defineSetter__("outerHTML", function (s) {
		var r = this.ownerDocument.createRange();
		r.setStartBefore(this);
		var df = r.createContextualFragment(s);
		this.parentNode.replaceChild(df, this);
		return s;
	});
	HTMLElement.prototype.__defineGetter__("canHaveChildren", function () {
		return !/^(area|base|basefont|col|frame|hr|img|br|input|isindex|link|meta|param)$/.test(this.tagName.toLowerCase());
	});
}
PageCss.initCtrlStyle = function (ele) {
	ele = g(ele);
	var eletype = ele.type;
	switch (eletype) {
	  case "text":
	  case "password":
	  case "textarea":
	  case "":
		//ele.addClassName("inputText");
        if(!ele.readOnly){
            ele.onmouseenter = function () {
                this.style.borderColor = "#7eadd9";
            };
            ele.onmouseleave = function () {
                this.style.borderColor = "";
            };
            ele.onfocusFunc = ele.onfocus;
            ele.onfocus = function () {
                if (typeof (ele.onfocusFunc) == "function") {
                    try {
                        ele.onfocusFunc();
                    }
                    catch (e) {
                    }
                }
                //if(eletype == "text"){
                //  hideLabel(this);
                //}
                this.style.borderColor = "#ff8800";
                this.onmouseenter = null;
                this.onmouseleave = null;
            };
            ele.onblurFunc = ele.onblur;
            ele.onblur = function () {
                if (typeof (ele.onblurFunc) == "function") {
                    try {
                        ele.onblurFunc();
                    }
                    catch (e) {
                    }
                }
                this.style.borderColor = "";
                this.onmouseenter = function () {
                    this.style.borderColor = "#7eadd9";
                };
                this.onmouseleave = function () {
                    this.style.borderColor = "";
                };
            };
        }
		
		break;
	  case "submit":
	  case "reset":
	  case "button":
		//ele.addClassName("inputButton");
		ele.hideFocus = true;
		//if (ele.parentNode.tagName != "A") {
		//	ele.outerHTML = "<a href='javascript:void(1);' class='frmBtn' hidefocus='true' tabindex='-1'>" + ele.outerHTML + "</a>";
		//}
		
		var className = $(ele).attr("className") || $(ele).attr("class");
		if(className && ("btn2" == className || "btn3" == className || "btn4" == className)){
			ele.onmouseover = function(){
	  			mouseOverBtn(this);
	  		}
	  		ele.onmouseout= function(){
	  			mouseOutBtn(this);
	  		}
		}
		break;
	  case "checkbox":
		//ele.addClassName("inputCheckbox");
		break;
	  case "radio":
		//ele.addClassName("inputRadio");
		break;
	  case "file":
		//ele.addClassName("inputFile");
		break;
	  case "image":
		//ele.addClassName("inputImage");
		break;
	  default:
	}
};
function $T(tagName, ele) {
	ele = g(ele);
	ele = ele || document;
	var ts = ele.getElementsByTagName(tagName);
	/*此处返回的不是数组*/
	var arr = [];
	var len = ts.length;
	for (var i = 0; i < len; i++) {
		arr.push(g(ts[i]));
	}
	return arr;
}

Array.prototype.each = function (func) {
	var len = this.length;
	for (var i = 0; i < len; i++) {
		try {
			func(this[i], i);
		}
		catch (ex) {
			alert("Array.prototype.each:" + ex.message);
		}
	}
};
PageCss.initCtrl = function (ele) {
	ele = g(ele);
	var arr = ele.gT("input").concat(ele.gT("textarea"));
	arr.each(PageCss.initOneCtrl);
};
PageCss.initOneCtrl = function (ele) {
	PageCss.initCtrlStyle(ele);
};

