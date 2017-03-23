/**
 * 部门选择
 * 
 * @param id
 *            (对象的id域)
 * @param name
 *            (对象的name域)
 * @param handle
 *            (选择业务后执行的回调函数,可以不写)
 * @param selType
 *            (是否多选,0-单选，1-多选类型1,2-多选类型2)
 */
function deptShow(id, name, handle, selType) {
	var dlg = frameElement.lhgDG;
	var obj = {};
	if (dlg == undefined) {

	} else {
		obj.parent = dlg;
	}
	obj.id = 'deptshow';
	obj.title = '部门选择';
	obj.cover = true;
	obj.width = 650;
	obj.height = 400;
	obj.rang = true;
	obj.page = 'jsp/org/dept/deptSelectShow.html';

	if (dlg == undefined) {
		dlg = new $.dialog(obj);

	} else {
		dlg = new dlg.curWin.$.dialog(obj);
	}
	dlg.ShowDialog();
}

/**
 * 客户选择
 * 
 * @param id
 *            (对象的id域)
 * @param name
 *            (对象的name域)
 * @param handle
 *            (选择业务后执行的回调函数,可以不写)
 * @param selType
 *            (是否多选,0-单选，1-多选类型1,2-多选类型2)
 */
function custShow(id, name, handle, selType) {
	var dlg = new $.dialog({
		id : 'custshow',
		title : '客户列表',
		cover : true,
		width : 650,
		height : 400,
		rang : true,
		page : 'jsp/customer/customerAssign/custinfo.html'
	})
	dlg.ShowDialog();
}

/**
 * 客户经理选择
 * 
 * @param id
 *            (对象的id域)
 * @param name
 *            (对象的name域)
 * @param handle
 *            (选择业务后执行的回调函数,可以不写)
 * @param selType
 *            (是否多选,0-单选，1-多选类型1,2-多选类型2)
 */
function custManagerShow(id, name, handle, selType) {
	var dlg = new $.dialog({
		id : 'custmanagershow',
		title : '客户经理选择',
		cover : true,
		width : 650,
		height : 400,
		rang : true,
		page : 'jsp/customer/customerAssign/custmanager.html'
	})
	dlg.ShowDialog();
}