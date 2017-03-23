/**
 * Ajax请求超时跳转
 *
 */
$(document).ajaxError(function(event,xmlRequest,ajaxOptions,throwError){
		//alert(xmlRequest.status+"------"+throwError+"------"+xmlRequest.responseText)
	//fh.alert('当前账户超时，请重新登录！',false,function(){
		if(xmlRequest.status == 302){
			top.location.href= xmlRequest.responseText;
		}
	//});
	
})
/**
 * 新增
 * 
 */
function add(url) {
	window.location.href = url;
}
/**
 * 修改
 * 
 */

function update(url) {
	window.location.href = url;
}
/**
 * 保存
 * 
 */
function save(url) {
	window.location.href = url;
	fh.alert("保存成功！");
}
/**
 * 返回
 * 
 */
function back(url) {
	window.location.href = url;
}

/**
 * 批量删除
 * 
 */
function batchDel() {
	var rows = $('#ui-grid').datagrid("getSelections");
	if (rows.length == 0) {
		fh.alert("请选择需要操作的记录！");
		return;
	}
	fh.confirm("确定删除吗？", handle, false, rows);
}

/**
 * 判断是否选中
 * 
 */
function isChecked(ids) {
	var hasChecked = false;
	if (ids.length == 0) {
		fh.alert("暂无选中记录！");
		return false;
	}
	for (var i = 0; i < ids.length; i++) {
		if (ids[i].checked) {
			hasChecked = true;
			break;
		}
	}
	return hasChecked;
}

/**
 * 批量删除处理
 * 
 */
function handle(rows) {
	for (var i = 0; i < rows.length; i++) {
		var rowindex = $('#ui-grid').datagrid("getRowIndex", rows[i]);
		$('#ui-grid').datagrid("deleteRow", rowindex);
	}
	fh.alert("删除成功！");
}

/**
 * 全选
 * 
 */
function selectAll(obj) {
	var ids = document.getElementsByName('ids');
	for (var i = 0; i < ids.length; i++) {
		ids[i].checked = obj.checked;
	}
}

/**
 * 单个删除
 * 
 */
function del() {
	var row = $('#ui-grid').datagrid("getSelected");
	var rowindex = $('#ui-grid').datagrid("getRowIndex", row);
	$('#ui-grid').datagrid("deleteRow", rowindex);
	fh.alert("删除成功！");
}

/**
 * 单个删除
 * 
 */
function delTreeData() {
	var row = $('#ui-grid').treegrid("getSelected");
	var rowindex = $('#ui-grid').treegrid("remove", row.id);
	fh.alert("删除成功！");
}

/**
 * 按条件查询（弹出框）
 * 
 */
function search(url) {
	var dlg = new $.dialog({
		id : 'search',
		title : '按条件查询',
		cover : true,
		width : 400,
		height : 300,
		rang : true,
		page : url
	})
	dlg.ShowDialog();
}

/**
 * 按条件查询
 * 
 */
function showQuery() {
	if ($("#ui-search").css("display") == "none") {
		$("#ui-search").css("display", "block");
		$(".hr_r").css("background-position", "0 -22px");
		$("#searchnav").text("关闭查询条件")
	} else {
		$("#ui-search").css("display", "none");
		$(".hr_r").css("background-position", "0 0");
		$("#searchnav").text("展开查询条件")
	}
}

/**
 * 查看明细
 * 
 */
function detail(url) {
	var dlg = new $.dialog({
		id : 'detail',
		title : '详情',
		cover : true,
		width : 500,
		height : 350,
		rang : true,
		page : url
	})
	dlg.ShowDialog();
}

/**
 * 查看明细
 * 
 */
function otherOperate(obj) {
	var dlg = new $.dialog({
		id : 'detail',
		title : obj.title,
		cover : true,
		width : 500,
		height : 350,
		rang : true,
		page : obj.page
	})
	dlg.ShowDialog();
}

/**
 * 鼠标移动到对象时样式改变
 * 
 */
function addMouseOverClass(id, index) {
	if (index % 2 == 0) { // 偶数行
		$("#" + id).removeClass("ui-grid-tr-odd");
	} else {// 奇数行
		$("#" + id).removeClass("ui-grid-tr-even");
	}
	$("#" + id).addClass("ui-grid-tr-over");
}

/**
 * 鼠标移开对象时样式改变
 * 
 */
function addMouseOutClass(id, index) {
	$("#" + id).removeClass("ui-grid-tr-over");
	if (index % 2 == 0) { // 偶数行
		$("#" + id).addClass("ui-grid-tr-odd");
	} else {// 奇数行
		$("#" + id).addClass("ui-grid-tr-even");
	}
}

var tabIndex = 0;
/**
 * 切换标签
 * 
 */
function changeTab(index) {
	tabIndex = index;
	var count = $("#tabs").find(".tab").size();
	for (var i = 1; i <= count; i++) {
		var tabId = "#tab" + i;
		var tabdataId = "#tabdata" + i;
		if (i != index) {
			$(tabId).find("a").attr("className", "tabANoSelected");
			$(tabId).find("b").attr("className", "tabBNoSelected");
			// $(tabdataId).attr("style", "{display:none}");
			document.getElementById("tabdata" + i).style.display = "none";
		}
	}
	$("#tab" + tabIndex).find("a").attr("className", "tabASelected");
	$("#tab" + tabIndex).find("b").attr("className", "tabBSelected");
	// $("#tabdata" + tabIndex).attr("style", "{display:block}");
	document.getElementById("tabdata" + tabIndex).style.display = "block";
	$("#tab" + tabIndex).find("a").blur();
}

/**
 * 鼠标移至标签
 * 
 */
function mouseOutTab(index) {
	var tabId = "#tab" + index;
	if (tabIndex != index) {
		$(tabId).find("a").attr("className", "tabANoSelected");
		$(tabId).find("b").attr("className", "tabBNoSelected");
	}

}

/**
 * 鼠标移离标签
 * 
 */
function mouseOverTab(index) {
	tabIndex = getChoosedTab();
	var tabId = "#tab" + index;
	if (tabIndex != index) {
		$(tabId).find("a").attr("className", "tabASelected");
		$(tabId).find("b").attr("className", "tabBSelected");
	}

}

/**
 * 判断被选中的页签
 * 
 */
function getChoosedTab() {
	var count = $(".tab").size();
	var tabIndex;
	for (var i = 1; i <= count; i++) {
		var tabId = "#tab" + i;
		if ("tabASelected" == $(tabId).find("a").attr("className")) {
			tabIndex = i;
			return tabIndex;
		}
	}
}

/**
 * 批量删除操作
 */
function batchDelete(actionUrl) {
	var rows = $('#ui-grid').datagrid("getSelections");
	if (rows.length == 0) {
		fh.alert("请选择需要操作的记录！");
		return;
	}
	fh.confirm("确定删除吗？", handleBatchDelete, false, actionUrl);
}

/**
 * 批量删除操作
 */
function handleBatchDelete(actionUrl) {
	var rows = $('#ui-grid').datagrid("getSelections");
	var idField = $('#ui-grid').datagrid("options").idField;
	var delIds = '';
	for (var i = 0; i < rows.length; i++) {
		delIds += rows[i][idField] + ',';
	}
	if (delIds != '') {
		delIds = delIds.substr(0, delIds.length - 1);
	}
	actionUrl += delIds;
	window.location.href = actionUrl;
}

/**
 * Ajax批量删除操作
 * 
 * @param actionUrl
 *            和普通查询一样 url
 * @param callBack
 *            回调方法
 */
function batchDeleteAjax(actionUrl, callBack,dlg) {
	var rows = $('#ui-grid').datagrid("getSelections");
	var ischild = false;
	if(dlg){
		 ischild = true;
	}
	if (rows.length == 0) {
		fh.alert("请选择需要操作的记录！",ischild,null,dlg);
		return;
	}

	fh.confirm("确定删除吗？",function(){handleBatchDeleteAjax(actionUrl,callBack)}, ischild, actionUrl, dlg);
}

/**
 * Ajax批量删除操作
 * 
 * @param actionUrl
 *            和普通查询一样 url
 * @param callBack
 *            回调方法
 */
function handleBatchDeleteAjax(actionUrl, callBack) {
	var rows = $('#ui-grid').datagrid("getSelections");
	var idField = $('#ui-grid').datagrid("options").idField;
	var delIds = '';
	for (var i = 0; i < rows.length; i++) {
		delIds += rows[i][idField] + ',';
	}
	if (delIds != '') {
		delIds = delIds.substr(0, delIds.length - 1);
	}
	actionUrl += delIds;
	$.post(actionUrl, null, callback, "json");
}

/**
 * 单个删除
 * 
 */
function singleDelete(actionUrl, obj) {

	// var row = $('#ui-grid').datagrid("getSelected");
	var param = {};
	param.actionUrl = actionUrl;
	// param.row = row;
	fh.confirm("确定删除吗？", handleDelete, false, param);
}

/**
 * 单个删除操作
 */
function handleDelete(param) {

	/*
	 * var row = $('#ui-grid').datagrid("getSelected"); var idField =
	 * $('#ui-grid').datagrid("options").idField; var delId = row[idField];
	 * actionUrl += delId;
	 * 
	 * $.ajax({ type: "POST", url: actionUrl, data: "", success: function(msg){
	 * if(msg == "true"){ var row = $('#ui-grid').datagrid("getSelected"); var
	 * rowindex = $('#ui-grid').datagrid("getRowIndex", row);
	 * $('#ui-grid').datagrid("deleteRow", rowindex); fh.alert("删除成功！"); }else{
	 * fh.alert('删除失败！'); } } });
	 */

	// var idField = $('#ui-grid').datagrid("options").idField;
	// var delId = param.row[idField];
	// var actionUrl = param.actionUrl
	// actionUrl += delId;
	window.location.href = param.actionUrl;
}

function selectResources(url) {
	var dlg = new $.dialog({
		id : 'selectResources',
		title : '资源选择',
		cover : true,
		width : 600,
		height : 450,
		rang : true,
		page : url
	})
	dlg.ShowDialog();
}

/**
 * @param id
 *            弹出框ID
 * @param title
 *            标题
 * @param width
 *            宽度
 * @param height
 *            高度
 * @param url
 *            url
 * @param resize
 *            是否可拖动改变大小
 * @param parentId
 *            父弹出框窗口对象
 * @param handle
 *            回调函数
 * @param param
 *            参数
 */
function commonOpenDialog(id, title, width, height, url, handle, param, resize,
		parentId,xButton) {
	var args = {};
	if (handle != null) {
		args.handle = handle;
	}
	if (param != null) {
		args.param = param;
	}
	var obj = {
		id : id,
		title : title,
		cover : true,
		width : width,
		height : height,
		rang : true,
		page : url,
		args : args,
		xButton : (null == xButton) ? true : xButton,
		resize : (null == resize) ? false : resize,
		dgOnLoad : function() {
		}
	};
	if (parentId) {
		obj.parent = parentId;
		var commonDialog = new frameElement.lhgDG.curWin.$.dialog(obj);
	} else {
		var commonDialog = new $.dialog(obj);
	}
	commonDialog.ShowDialog();
	// $("#lhgdlg_"+id,top.document).focus();
	return commonDialog;
}

/**
 * 清空表单数据
 * 
 * @param id
 *            容器标识
 */
function clearForm(id) {
	$(':input', '#' + id).not(':button, :submit, :reset').val('')
			.removeAttr('checked').removeAttr('selected');
	/*
	 * var elements =$("#"+id+" input,select"); for (var i=0; i<elements.length;
	 * i++) { var element = elements[i]; if (element.type == 'submit') {
	 * continue; } else if (element.type == 'reset') { continue; } else if
	 * (element.type == 'button') { continue; } else if (element.type ==
	 * 'hidden') { element.value = ""; } else if (element.type == 'text') {
	 * element.value = ""; } else if (element.type == 'textarea') {
	 * element.value = ""; } else if (element.type == 'checkbox') {
	 * element.checked = false; } else if (element.type == 'radio') {
	 * element.checked = false; } else if (element.type == 'select-multiple') {
	 * element.selectedIndex = 0; } else if (element.type == 'select-one') {
	 * element.selectedIndex = 0; } }
	 */
}

/**
 * 鼠标放置按钮上
 */
function mouseOverBtn(obj) {
	var className = $(obj).attr("className") || $(obj).attr("class");
	if (className && className.indexOf("_over") == -1) {
		$(obj).removeClass(className);
		$(obj).addClass(className + "_over");
	}
}

/**
 * 鼠标移离按钮
 */
function mouseOutBtn(obj) {
	var className = $(obj).attr("className") || $(obj).attr("class");
	if (className && -1 != className.indexOf("_over")) {
		$(obj).removeClass(className);
		className = className.substring(0, className.indexOf("_over"));
		$(obj).addClass(className);
	}
}
/**
 * 获取列表选中行id字符串，逗号分隔
 */
function getSelectedIds(dataGridId) {
	var rows = $('#' + dataGridId).datagrid("getSelections");
	var selectIds = "";
	if (rows.length != 0) {
		for (var i = 0; i < rows.length; i++) {
			if (i == rows.length - 1) {
				selectIds = selectIds + rows[i].idStr;
			} else {
				selectIds = selectIds + rows[i].idStr + ",";
			}
		}
	}

	return selectIds;
}

/*******************************************************************************
 * 获取父窗口对象
 */
function getPwin(obj) {
	if (obj) {
		var ifm = top.document.getElementById(obj)
				.getElementsByTagName("iframe");
		if (ifm) {
			return ifm[0].contentWindow;
		}
	}
	return frameElement.lhgDG.curWin;
}

/*******************************************************************************
 * 
 * 回车设置时间
 */
function setSelectedDate(event) {
	obj = event.srcElement ? event.srcElement : event.target;
	if (event.keyCode == 13) {
		if (typeof($dp) != 'undefined') {
			try {
				$(obj).val($dp.cal.getDateStr());
				$dp.hide();
			} catch (e) {
			}
		}
	}
}

/**
 * 移除文本框属性
 */
function removeTxtAttr(obj) {
	$(obj).removeAttr("onmouseenter");
	$(obj).removeAttr("onmouseleave");
	$(obj).removeAttr("onfocus");
	$(obj).removeAttr("onblur");
}

/**
 * 显示错误信息
 */
function showErrorTip(error, element) {
	var id = element.attr("id") + "Tip";
	if ($("#" + id)) {
		$("#" + id).html(error);
	}
}

/**
 * 获取label对象
 */
function hideLabel(obj) {
	var errorTips = $(obj).nextAll("div.errorTip");
	if (errorTips.size() > 0) {
		var labelObj = $(errorTips.get(0)).children("label[class='error']");
		if (labelObj.size() > 0) {
			if ("none" != labelObj.css("display")) {
				labelObj.hide();
			}
		}
	}
}

/**
 * ajax请求开始
 * 
 * @param windowType
 *            窗口类型 0：普通表单 1：左右表单 2. 普通弹出框 3：左右弹出框
 */
function beforeSendAjax(windowType) {
	if (windowType == 0) {
		var name = window.frameElement && window.frameElement.name;
	} else if (windowType == 1) {
		var name = window.parent.frameElement
				&& window.parent.frameElement.name;
	} else {
		var name = "";
	}
	if (windowType == 0 || windowType == 2) {
		if (parent && parent.loadFlag) {
			parent.loadFlag(true, name);
		}
	} else if (windowType == 1 || windowType == 3) {
		if (parent.parent && parent.parent.loadFlag) {
			parent.parent.loadFlag(true, name);
		}
	}
}

/**
 * ajax请求结束
 * 
 * @param windowType
 *            窗口类型 0：普通表单 1：左右表单 2. 普通弹出框 3：左右弹出框
 */
function completeSendAjax(windowType) {
	if (windowType == 0) {
		var name = window.frameElement && window.frameElement.name;
	} else if (windowType == 1) {
		var name = window.parent.frameElement
				&& window.parent.frameElement.name;
	} else {
		var name = "";
	}
	if (windowType == 0 || windowType == 2) {
		if (parent && parent.loadFlag) {
			parent.loadFlag(false, name);
		}
	} else if (windowType == 1 || windowType == 3) {
		if (parent.parent && parent.parent.loadFlag) {
			parent.parent.loadFlag(false, name);
		}
	}
}
