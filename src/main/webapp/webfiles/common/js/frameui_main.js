if (document.all) {
	CollectGarbage();
}
/** *关闭标签时，选中标签宽度自适应* */
function activeLastTab() {
	$('#easyui-tabs').tabs({
		onClose : function(tt) {
			var index = $("iframe").size() - 2;
			$($(".easyui-tabs .tabs li").get(index)).click();
		}
	});
}

/** *加载树形菜单点击事件* */
function menuClick() {
	$('.easyui-tree').tree({
		// url: 'tree_data.json',
		// 子菜单选中事件
		onClick : function(node) {
			var attributes = node.attributes;
			if (attributes) {
				attributes = "(" + attributes + ")";
				attributes = eval(attributes);
				if (attributes.url) {
					// showContent(attributes.url);
					addTab(attributes);
				}
			}
		}
	});
}

/** * 加载树形菜单选中事件** */
function menuSelect() {
	$('.easyui-accordion').accordion({
		onSelect : function(title) {
			// 顶级菜单选中事件,去除子级菜单选中的背景色
			if ($(".tree-node-selected").size() > 0)
				$(".tree-node-selected").removeClass("tree-node-selected");
		}
	});
}

/** 加载等待进度条 */
function loadingWait() {
	var w = document.body.clientWidth, h = document.body.offsetHeight, load_w = 150, load_h = 48;
	var w_step = parseInt((w - load_w) / 20);
	var h_step = parseInt((h - load_h) / 20);
	var t = setInterval(function() {
		if (w <= load_w) {
			clearInterval(t);
			$('#load-mask').remove();
		}
		w = w - w_step;
		h = h - h_step;
		var curr_w = w < load_w ? load_w : w;
		var curr_h = h < load_h ? load_h : h;
		$('#load-mask').css({
			'width' : curr_w,
			'margin-left' : -(curr_w / 2),
			'left' : '50%',
			'height' : curr_h,
			'margin-top' : -(curr_h / 2),
			'top' : '50%'
		});
	}, 10)

}

/**
 * 设置grid窗口大小 *
 */
function resizeDataGrid() {
	var panel = $('.easyui-tabs').tabs("getSelected");
	if (panel) {
		iframeAutoAdapt(panel);
	}
}

/** 添加tab页签* */
function addTab(attributes) {
	var title = attributes.title;
	var id = attributes.id;
	var iframename = "iframe";
	if (undefined != id) {
		iframename = "iframe" + id;
	}
	// 刷新页签
	if ($('.easyui-tabs').tabs('exists', title)) {
		// $('.easyui-tabs').tabs('close', title);
		$('.easyui-tabs').tabs('select', title);
		var tab = $('#easyui-tabs').tabs('getTab', title);
		$('#easyui-tabs').tabs('flushTab', {
			tab : tab,
			options : {
				title : title,
				url : attributes.url
			}
		});
	} else {// 新增页签
		var content = '<iframe scrolling="auto" frameborder="0" name="'
				+ iframename + '" id="' + iframename + '"  src="'
				+ attributes.url
				+ '" style="width:100%;height:100%;"></iframe>';
		$('.easyui-tabs').tabs('add', {
			title : title,
			content : content,
			tabImg : attributes.tabImg,
			closable : true
		});
		// $('.easyui-tabs').tabs('select', title);
		var index = $("iframe").index($("iframe[name='" + iframename + "']"));
		if (isIE6) {

		}
		tabMenu(index);
		tabClick(index);
	}
	$("iframe[name='" + iframename + "']").focus();
}

/** * tab右键菜单 */
function tabMenu(index) {
	$($(".tabs-inner").get(index)).bind('contextmenu', function(e) {
		$('#tabmenu').menu('show', {
			left : e.pageX,
			top : e.pageY
		});
		var subtitle = $(this).children("span.tabs-title").text();
		$('#tabmenu').data("currtab", subtitle);
		return false;
	});
}

/** * tab绑定click事件* */
function tabClick(index) {
	$($(".easyui-tabs .tabs li").get(index)).bind('click', function(e) {
		var title = $(this).find("span.tabs-title").text();
		var panel = $("#easyui-tabs").tabs("getTab", title);
		if (panel) {
			iframeAutoAdapt(panel)
		}
	});
}

/** iframe窗口大小自适应* */
function iframeAutoAdapt(panel) {
	var width = $(".easyui-tabs").tabs("options").width - 2;
	panel.find("iframe").css("width", width);
	var iframename = panel.find("iframe").attr("name") + "";
	if ("" != iframename && "undefined" != iframename) {
		// var index = $("iframe").index($("iframe[name='" + iframename +
		// "']"));
		// $("#"+iframename).load(function(){
		// $("#"+iframename).attr("loadflag",true);
		if (typeof($("#" + iframename)[0].contentWindow.resizeListWidth) == "function") {
			$("#" + iframename)[0].contentWindow.resizeListWidth(width);
		}
		// });
		// if(tabclick && !$("#"+iframename).attr("loadflag")){
		// alert("页面没有加载完成，进行刷新")
		// $("#"+iframename)[0].contentWindow.location.href =
		// $("#"+iframename).attr("src")
		// if(typeof($("#"+iframename)[0].contentWindow.resizeListWidth) ==
		// "function")
		// {
		// $("#"+iframename)[0].contentWindow.resizeListWidth(width);
		// }
		// }
	}
}

/** 刷新当前页函数 */
function refreshCurrent() {
	var title = $('#tabmenu').data("currtab");
	var tab = $('#easyui-tabs').tabs('getTab', title);
	$('#easyui-tabs').tabs('flushTab', {
		tab : tab,
		options : {
			title : title
		}
	});
}

/** 关闭当前页函数 */
function closeCurrent() {
	var currtab_title = $('#tabmenu').data("currtab");
	if (currtab_title != "我的首页") {
		$('#easyui-tabs').tabs('close', currtab_title);
	} else {
		fh.alert("对不起，欢迎页面无法关闭！");
	}
}

/** 关闭其他页函数 */
function closeOther() {
	var currtab_title = $('#tabmenu').data("currtab");
	$('.tabs-inner span.tabs-title').each(function(i, n) {
		if ($(this).parent().next().is('.tabs-close')) {
			var t = $(n).text();
			if (t != currtab_title)
				$('#easyui-tabs').tabs('close', t);
		}
	});
}

/** 关闭全部页函数 */
function closeAll() {
	$('.tabs-inner span.tabs-title').each(function(i, n) {
		if ($(this).parent().next().is('.tabs-close')) {
			var t = $(n).text();
			$('#easyui-tabs').tabs('close', t);
		}
	});
}

/** 隐藏顶部* */
function hiddenTop() {
	$("#top_banner").hide();
	layout.sizePane("north", 25);
	$("#top_hand").css("background-position", "48px 0");
	$("#top_hand").unbind();
	document.getElementById("top_hand").onclick = expandTop;
	document.getElementById("top_hand").onmouseover = overArrowDown;
	document.getElementById("top_hand").onmouseout = outArrowDown;
	return false;
}

/** 显示顶部* */
function expandTop() {
	$("#top_banner").show();
	layout.sizePane("north", 93);
	$("#top_hand").css("background-position", "24px 0");
	$("#top_hand").unbind();
	document.getElementById("top_hand").onclick = hiddenTop;
	document.getElementById("top_hand").onmouseover = overArrowUp;
	document.getElementById("top_hand").onmouseout = outArrowUp;
	return false;
}

function overArrowUp() {
	$("#top_hand").css("background-position", "-24px 0");
}

function outArrowUp() {
	$("#top_hand").css("background-position", "0 0");
}

function overArrowDown() {
	$("#top_hand").css("background-position", "-72px 0");
}

function outArrowDown() {
	$("#top_hand").css("background-position", "-48px 0");
}

function showContent(url) {
	window.mainFrame.location.href = url;
}

function updatePassword(url) {
	window.mainFrame.location.href = url;
}

/** 修改顶部按钮颜色* */
function chgColor(id, type) {
	if (type == 1) {
		$("#" + id).css("color", "#00FFFF");
	} else {
		$("#" + id).css("color", "#FFFFFF");
	}
}
/** 修改一级菜单按钮颜色* */
function chgTabColor(id, type) {
	if (type == 1) {
		$("#" + id).css("color", "#FFFFFF");
	} else {
		$("#" + id).css("color", "#000000");
	}
}


