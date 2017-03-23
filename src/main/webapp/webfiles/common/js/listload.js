/** *listType 0:普通（列表）, 1 :左右（左边树，右边列表）, 2:普通列表弹出框,3:左树右列表弹出框, else:其他 */
var listType = 0
if (document.all) {
	CollectGarbage();
}

var singleSelect;

/**
 * 列表页面加载datagrid扩展
 * 
 * @param tableId:表单ID
 * @param url:json数据请求
 * @param frozenColumns：第一列固定列摆放元素
 * @param idFieldName：主键ID
 * @param singleSelect
 *            true:单选 else:单选
 * @param columns
 *            列
 * @param listtype:0：普通
 *            1：树形
 */
function dataGridLoadEx(tableId, obj, listtype, dlgId) {
	singleSelect = obj.singleSelect;
	var width = "auto";
	if (!tableId) {
		fh.alert("表单ID不能为空，请确认！");
		return;
	}
	// 设置列表宽度
	width = setGridWidth(obj.width, listtype, dlgId);
	try {
		$('#' + tableId).datagrid({
			url : obj.url,
			sortName : obj.sortName,
			sortOrder : obj.sortOrder,
			remoteSort : obj.remoteSort,
			// title: 'DataGrid - ContextMenu',
			width : width,
			height : 'auto',
			columns : obj.columns,
			idField : obj.idField,
			nowrap : false,
			collapsible : true,
			striped : true,
			fitColumns : true,
			pagination : isHasPage(obj),
			// rownumbers:true,
			singleSelect : obj.singleSelect,
			rowClickFlag : obj.rowClickFlag,
			pageNumber : 1, // 初始化页码
			pageSize : 10,
			pageList : [10, 20, 30, 40, 50],
			frozenColumns : obj.frozenColumns,
			// ***注册事件***
			onClickRow : obj.onClickRow || null, // 选择行事件
			onHeaderContextMenu : function(e, field) {
				e.preventDefault();
				if (!$('#tmenu').length) {
					createColumnMenu(tableId);
				}
				$('#tmenu').menu('show', {
					left : e.pageX,
					top : e.pageY
				});
			},
			onUnselect : obj.onUnselect || onUnselect,
			onSelect : obj.onSelect || onSelect,
			onSelectAll : obj.onSelectAll,
			onUnselectAll : obj.onUnselectAll,
			onLoadSuccess :  function(data){
				if(obj.onLoadSuccess)
				obj.onLoadSuccess(data) ;
				var checkedobj = $("#"+tableId).prevAll(".datagrid-view1").find(".datagrid-header-check input[type=checkbox]");
				if(checkedobj.size()>0){
					if (checkedobj.is(":checked")) {
						checkedobj.attr("checked", false);
					}
				}
				
			}


		});
	} catch (e) {

	}

}

/****
 * 选中行事件
 * @param index 行下标
 * @param  row  行数据
 */
function onSelect(index, row) {
	checkboxAllFlag(this, singleSelect, true);
}

/****
 *取消选中行事件
 * @param index 行下标
 * @param  row  行数据
 */
function onUnselect(index, row) {
	checkboxAllFlag(this, singleSelect, false);
}

/****
 * 全选按钮选中与否
 * @param obj 行对象
 * @param singleSelect 是否单选
 * @param  methodflag  方法标志，选中/取消选中
 */
function checkboxAllFlag(obj, singleSelect, methodflag) {
	if (!singleSelect) {
		var checkedobj = $(obj).parent()
				.find(".datagrid-header-check input[type=checkbox]");
		if (methodflag) {
			var checkflag = true;
			$(obj).parent().find(".datagrid-cell-check input[type=checkbox]")
					.each(function() {
						if (!$(this).is(":checked")) {
							checkflag = false;
							return;
						}
					})
			checkedobj.attr("checked", checkflag);
		} else {
			if (checkedobj.is(":checked")) {
				checkedobj.attr("checked", false);
			}
		}
	}
}

/**
 * 列表宽度
 * 
 * @param width
 *            宽度
 * @param listtype
 *            列表类型
 * @param dlgId
 *            弹出框id
 * @param flag
 *            0.页面加载前 1.页面加载完成 2.拖拽 3.查询 4.展开条件查询 5.关闭条件查询
 */
function setGridWidth(width, listtype, dlgId, flag) {
	if (listtype) {
		if (listtype == 0) {
			if (null == width || "" == width) {
				width = $(window).width() - 32;
			}
		} else if (listtype == 1) {
			// window.parent.listType = listtype;
			if (null == width || "" == width) {
				width = $(window.parent).width() - 220 - 18;
			}
		} else if (listtype == 2) {
			if (document.all) {
				$.boxModel = false;
			} else {
				$.boxModel = true;
			}
			width = $(top.document.getElementById("lhgdlg_" + dlgId)).width()
					- 58;
		} else if (listtype == 3) {
			if (document.all) {
				$.boxModel = false;
			} else {
				$.boxModel = true;
			}
			width = $(top.document.getElementById("lhgdlg_" + dlgId)).width()
					- 180 - 64;
		}
	} else {
		// listType = 0;
		if (null == width || "" == width) {
			width = $(window).width() - 32;
		}
	}
	if ($(".datagrid").size() > 0) {
		var clientHeight = $("body")[0].clientHeight;
		var scrollHeight = $("body")[0].scrollHeight;
		// alert(clientHeight + "--------" + scrollHeight)
		if (clientHeight != scrollHeight) {
			// if (document.all) {
			width = $(".datagrid").width();
			// }else{

			// }
		}
	}
	return width;
}

/**
 * 判断是否分页
 */
function isHasPage(obj) {
	if (undefined != obj.pagination && "undefined" != obj.pagination) {
		return obj.pagination;
	} else {
		return true;
	}
}

/**
 * 加载完成自适应列宽
 */
function dataListResize(listtype) {
	if (listtype == 1) {
		if (window.parent.parent
				&& typeof(window.parent.parent.resizeDataGrid) == "function") {
			window.parent.parent.resizeDataGrid();
		}
	} else if (listtype == 2) {

	} else {
		if (window.parent && typeof(window.parent.resizeDataGrid) == "function") {
			window.parent.resizeDataGrid();
		}
	}
}
/**
 * 列表页面加载datagrid
 */
function dataGridLoad(url, frozenColumns) {

	$('#ui-grid').datagrid({
		url : url,
		// title: 'DataGrid - ContextMenu',
		// width: 700,
		height : 'auto',
		nowrap : false,
		striped : true,
		fitColumns : true,
		pagination : true,
		// rownumbers:true,
		singleSelect : false,
		pageNumber : 1, // 初始化页码
		pageList : [10, 20, 30, 40, 50],
		frozenColumns : frozenColumns,
		onHeaderContextMenu : function(e, field) {
			e.preventDefault();
			if (!$('#tmenu').length) {
				createColumnMenu();
			}
			$('#tmenu').menu('show', {
				left : e.pageX,
				top : e.pageY
			});
		},
		onUnselect : function(index, row) {
			var checkedobj = $(".datagrid-header-check input[type=checkbox]");
			if (checkedobj.is(":checked")) {
				checkedobj.attr("checked", false);
			}
		}

	});
}

var headhideCount = 0;
function createColumnMenu(tableId) {
	var tmenu = $('<div id="tmenu" class="easyui-menu"  style="width:100px;"></div>')
			.appendTo('body');
	var fields = $('#' + tableId).datagrid('getColumnFields');
	for (var i = 0; i < fields.length; i++) {
		var columnopt = $('#' + tableId).datagrid('getColumnOption', fields[i]);
		if (columnopt.hidden) {
			headhideCount = headhideCount + 1
			$("<div iconCls='icon-empty' id='" + fields[i] + "'/>")
					.html(columnopt.title).appendTo(tmenu);
		} else {
			$("<div iconCls='icon-ok' id='" + fields[i] + "'/>")
					.html(columnopt.title).appendTo(tmenu);
		}
	}
	tmenu.menu({
		onClick : function(item) {
			var length = $('#' + tableId).datagrid('getColumnFields').length;
			if (item.iconCls == 'icon-ok') {
				if (headhideCount < length - 1) {
					headhideCount = headhideCount + 1;
					// alert("+------"+headhideCount)
					// alert(item.id+"==="+item.target.innerHTML)
					$('#' + tableId).datagrid('hideColumn', item.id);
					tmenu.menu('setIcon', {
						target : item.target,
						iconCls : 'icon-empty'
					});
				}
			} else {
				if (headhideCount < length) {
					headhideCount = headhideCount - 1;
					// alert("------"+headhideCount)
				}
				$('#' + tableId).datagrid('showColumn', item.id);
				tmenu.menu('setIcon', {
					target : item.target,
					iconCls : 'icon-ok'
				});
			}
		}
	});
}

function resizeDataGrid(width) {
	if ($(".datagrid").size() > 0) {
		var gridid = $(".datagrid .datagrid-view table[id]").attr("id");
		var oldwidth = $(".datagrid").width();
		var height = $(".datagrid .datagrid-view").height();

		if ((width != oldwidth) || height == 0) {
			$("#" + gridid).datagrid("resize", {
				width : width
			})
		}
		$(".datagrid").width(width);
		// 切换tabs页签，解决列表内容溢出
		// $(".datagrid .datagrid-wrap").width(width - 2)
	}
}

/**
 * 特殊列表自适应宽度（左边树，右边列表）
 * 
 * @param width:宽度
 * 
 * @param listId:列表iframeId
 */
function twoSideListResize(width, iframeId) {
	var treewidth = $(".ui-layout-west").width();
	if (treewidth == 0) {
		treewidth = 200;
	}
	var width = width - treewidth - 38;
	if (typeof($("#" + iframeId)[0].contentWindow.resizeDataGrid) == "function") {
		$("#" + iframeId)[0].contentWindow.resizeDataGrid(width);
	}

}

/**
 * 普通列表自适应宽度
 * 
 * @param width:宽度
 */
function resizeListWidth(width) {
	var width = width - 32;
	if (typeof(resizeDataGrid) == "function") {
		resizeDataGrid(width);
	}
}

/** 普通列表初始化宽度 */
function comListInitWidth() {
	return $(window.parent.document).find(".easyui-tabs").width() - 32;
}

/** 居中对齐* */
function columnFloatCenter(value, row, index) {
	return "text-align:center";
}

/** 居左对齐* */
function columnFloatLeft(value, row, index) {
	return "text-align:left";
}

/** 居右对齐* */
function columnFloatRight(value, row, index) {
	return "text-align:right";
}