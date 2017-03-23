var isFinishCreateTable = true; //是否已经生成完毕子表，若为false则不允许重复插入，避免出现生成多个div的现象
/**
 	*可折叠table的构造方法，这个方法和要用来扩展控件的属性和控件的流程控制
 	*param eventObject 事件源对象
 	*param config 用户扩展属性 
 	*/
var puckerTable = function(eventObject,config){
	var att = apply.initConfig(config,puckerTable.attribute);
	var imgObject = eventObject;
	var currRow = imgObject.parentNode.parentNode;
	var imgPath = imgObject.src;
	var index = imgPath.lastIndexOf('/');
	var imgName = "";
	if(index != -1){
			imgName = imgPath.substring(index+1);
	}else{
		imgName = imgPath;	
	}
	if(imgName == "nolines_plus.gif"){
		if(isFinishCreateTable == true){
			imgObject.src = "../../../images/skin2/icon/nolines_minus.gif";
			this.createElement(currRow,att);
		}else{
			return ;
		}
	}else{
	    if(isFinishCreateTable == true){
			imgObject.src = "../../../images/skin2/icon/nolines_plus.gif";
			this.removeElement(currRow);
		}else{
			return ;
		}
	}
}

//控件的成员属性定义
puckerTable.attribute = {
	width : '80%',
	Height : '200px',
	src :'linkman_list.html',
	data: '',  //add by zhangzl 发送的参数
	callBack: null  //add by zhangzl 回调函数
}

//控件的应用方法
apply = {
	//用户增加和覆盖控件的属性
	initConfig : function(config,override){
		if(override && config){
			for(var a in config){
				override[a] = config[a];
			}
		}
		return override;
	}
}

//控件的成员方法定义
puckerTable.prototype = {
	//创建控件的方法
	createElement : function(currRow,att){
		var rowNum = currRow.rowIndex + 1;
		var newTR = currRow.parentNode.parentNode.insertRow(rowNum);
		
		newTR.insertCell(0);
		newTR.cells[0].colSpan=currRow.cells.length;
		newTR.cells[0].align="center";
		//add by zhangzl 使用ajax从后台读取数据
		isFinishCreateTable = false;
		$.ajax({
			url: att.src,
			type:'POST',
			cache:true,
			data: att.data,
			dataType:"html",
			success: function(html){
				$(newTR.cells[0]).append(html);   
				isFinishCreateTable = true;
				if(att.callBack != null){
					eval(att.callBack);
				}
			} 
		});
	},
	//移除控件的方法
	removeElement : function(currRow){
		var currTable = currRow.parentNode.parentNode;
		var currRowNum = currRow.rowIndex+1 ;
		setTimeout(function(){currTable.deleteRow(currRowNum);},3);
	}
}
