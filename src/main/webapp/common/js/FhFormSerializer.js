/**
 * 
 */
var FhFormSerializer = {
	TOP_STORE_KEY : "fh_datagrid_storage",	
	
	datatableId   : "grid-table",

	treeId		  : "bigTreeDiv",
	
	/**
	 * 获取指定window对象的上层window
	 * @param win
	 * @returns
	 */
	_getParentWin: function(win){
		if(win == null || win.frameElement == null){
			return win;
		}
		var doc = win.frameElement.ownerDocument;
		return doc.parentWindow || doc.defaultView;
	},
	
	/**
	 * 内部函数，如果当前页面处于frame内，则获取frame的id,
	 * 在出现frame嵌套时，则需要递归取到顶层frame(可关闭frame)的ID
	 * 如果不是，则给出一个简单的frameId固定头
	 */
	_getFrameId: function(){
		var dftId = "frameId";
		
		var win  = window;
		var ids  = [];
		
		while(true){
			var frm = win.frameElement;
			if( null == frm ){
				break;
			}
			
			var pwin = this._getParentWin(win);
			
			if(frm.id){
				ids.push(frm.id);
			}
			
			if(pwin == window.top){
				break;
			}
			win = pwin;
		}
		
		if(ids.length > 0){
			return ids.reverse().join(",");
		}
		return dftId;
	},
	
	/**
	 * 获取当前页面或者frame的url，这里会把第一个?以及之后的参数切掉
	 * 
	 * @returns
	 */
	_getCurrentUrl: function(){
		var url  = window.location.href;
		var qidx = url.indexOf("?");
		if (qidx > -1){
			url = url.substr(0, qidx);
		}
		return url;
	},
	
	/**
	 * 获取存储状态值的KEY，这个KEY是稳定的，
	 * 规则是frameId,frameUrl
	 * 
	 * @returns
	 */
	_getValueKey: function(){
		return [this._getFrameId(),this._getCurrentUrl()].join(",");
	},
	
	/**
	 * 获取一个window对象，应该是window.top，作为持久化值的
	 * 存储空间
	 * 
	 * @returns
	 */
	_getTopStore: function(){
		var top = window.top;
		if (!top[this.TOP_STORE_KEY]){
			top[this.TOP_STORE_KEY] = {};
		}
		return top[this.TOP_STORE_KEY];
	},
	
	/**
	 * 把值对象用当前的键存入顶层空间
	 * @param obj
	 */
	_storeToTop: function(obj){
		var key = this._getValueKey();
		
		fhdebug("persist ");
		fhdebug("key is ", key);
		fhdebug(obj);
		
		this._getTopStore()[key] = obj;
	},

	/**
	 * 通过eval，已经对象克隆，可以返回一个在子帧内可用的对象，而不会触发
	 * SCRIPT5011:Can't execute code from a freed script
	 * @returns
	 */
	_loadFromIE9up: function(){
		var codes = ("(function(){var obj = window['{0}']['{1}']; " +
				    "var nobj = $.extend(true, {}, obj); " +
				    "return nobj;})();").format(this.TOP_STORE_KEY, this._getValueKey());
		fhdebug(codes);
		return top.eval(codes);
	},
	
	/**
	 * 从顶层空间读入值
	 * 
	 * @returns 
	 */
	_loadFromTop: function(){
		try
		{
			var data = this._getTopStore()[this._getValueKey()] || {};
			
			/**
			 * 上一行代码获取回来的对象，在IE9和IE10上是不可用的状态，
			 * 所以下面一行代码，在IE9/10上会触发一个异常
			 * 然后通过ie9/10上测试可用的方法，从top里面读取参数
			 */
			var fd   = (data == '');
			fhdebug(data);
			return data;
		}
		catch(e)
		{
			fhdebug(e);
			try{
				fhdebug("load from eval");
				return this._loadFromIE9up();
			}catch(e){
				fhdebug(e);
			}
			
			return {};
		}
	},
	
	/**
	 * 清空当前页面的持久化值
	 */
	_clearValue: function(){
		var st = this._getTopStore();
		delete st[this._getValueKey()];
	},
	
	/**
	 * 清空frame下的所有值
	 * 如果传入frameid则是指定frame，如果没有则使用当前frame
	 */
	_clearFrameValue: function(pfrmid){
		var st    = this._getTopStore();
		var frmid = pfrmid || this._getFrameId(); 
		for(var key in st){
			//startsWith frmid
			if(key.indexOf(frmid) == 0){
				fhdebug("clear id %s", frmid);
				delete st[key];
			}
		}
	},
	
	/**
	 * 获取当前页面上所有可能的值控件
	 * @returns {Array}
	 */
	_getAllInputs: function(){
		var ret = [];
		$(".filter-mod li").each(function(){
			if($("label",this).size() > 0){
				var items = $("label",this).nextAll().not("img,input[type='button']");
				for(var i=0;i<items.length;i++){
					ret.push(items[i]);
				}
			}
		})
		return ret;
	},
	
	/**
	 * 检查已有的form，主要功能是：
	 * 1. 检测是否输入控件都是有ID(没有ID的，必须修改JSP写一个ID)
	 * 2. 检测是否有重复的ID
	 * 3. 
	 */
	_checkFormInput: function(){
		var inputs = this._getAllInputs();
		var idmap  = {};
		$(inputs).each(function(){
			var id = $(this).attr("id");
			if($.trim(id) == ''){
				fhdebug("No id found");
				fhdebug(this);
			} else {
				if(idmap[id]){
					fhdebug("Id duplicated");
					fhdebug(this);
				}else{
					idmap[id] = true;
				}
			}
		});
	},
	
	/**
	 * 获取包含了所有控件值的对象
	 * 
	 * @returns 
	 */
	_getAllInputsVal: function(){
		var ret    = {};
		var inputs = this._getAllInputs();
		$.each(inputs,function(i,n){
			var key = $(n).attr("id");
			var value = $(n).val();
			ret[key] = value;
		});
		return ret;
	},
	
	/**
	 * 从页面的数据表格里面读取排序参数，
	 * 由于框架在common.js里面使用了固定的
	 * 
	 */
	_getDatatableSortState: function(){
		var dt = $("#" + this.datatableId);
		if(dt == null){
			fhdebug("Warning: NO datatable obj was found using id %s", this.datatableId);
			return [];
		}
		try{
			var st = dt.dataTableSettings[0].aaSorting;
			return st;
		}catch(e){
			fhdebug("Error in extracting sort param");
			return [];
		}
	},
	
	/**
	 * 从当前页面中找到所有打开的树节点
	 * 
	 * @returns
	 */
	_getAllOpenedNodes: function(){
		var list = $(".bbit-tree-elbow-minus:visible").parent().find("a.bbit-tree-node-anchor span");
		list = list.add($(".bbit-tree-elbow-end-minus:visible").parent().find("a.bbit-tree-node-anchor span"));
		return list;
	},
	
	/**
	 * 从打开的树节点中，提取数据对象，只保留ID和PID
	 */
	_getNodeIdFromNodes: function(arr){
		var data = $.map(arr, function(ele){
					return {
						id: $(ele).attr("id"), 
						pid: $(ele).attr("pid")
						};
					});
		return data;
	},
	
	/**
	 * 从当前页面中找到选中的元素
	 */
	_getSelectedNotes: function(){
		return $(".bbit-tree-selected a.bbit-tree-node-anchor span");
	},
	
	/**
	 * 页面应该根据需要实现这个函数，
	 * 保存自定义的任何参数
	 * 
	 * @param formVal
	 */
	setValues : function(formVal){
	},
	
	/**
	 * 页面应该根据需要实现这个函数，
	 * 这个函数用来从保存的值对象中恢复页面状态
	 */
	restoreValues: function(formVal){
	},
	
	store : function(){
		this._checkFormInput();
		
		var data = {};
		var searchState = $(".filter-mod").css("display");
		var pageNo = $(".Js_pagination").val();
		var pageLength = $("select[name='grid-table_length']").val();
		var formCont = this._getAllInputsVal();
		var sortState = this._getDatatableSortState();
		
		$.extend(data, 
				{"formData":formCont},
				{
					"searchState":searchState,
					"pageNo":pageNo,
					"pageLength":pageLength,
					"sortState": sortState
				});
		
		//保存钱调用扩展函数
		if(typeof this.setValues == 'function'){
			this.setValues(data);
		}
		
		this._storeToTop(data);
		return data;
	},
	
	storeTree: function(){
		this._storeToTop({
			tree: 		  this._getNodeIdFromNodes(this._getAllOpenedNodes()),
			selectedNode: this._getNodeIdFromNodes(this._getSelectedNotes())
		});
	},
	
	restoreTree: function(){
		var arrData = this._loadFromTop();
		fhdebug("restoreTree ", arrData);
		var self = this;
		//恢复打开状态
		if(arrData && arrData.tree){
			$(arrData.tree).each(function(){
				var sel = "#" + self.treeId + "_" + this.id + " img.bbit-tree-ec-icon";
				var img = $(sel);
				fhdebug(img);
				img.click();
			});
		}
		
		//恢复点击状态
		if(arrData && arrData.selectedNode){
			$(arrData.selectedNode).each(function(){
				var sel = "#" + self.treeId + "_" + this.id + " a.bbit-tree-node-anchor";
				var ele = $(sel);
				ele.click();
			});
		}
	},
	
	_restore:function(tableObj){
		tableObj = tableObj || {};
		var self = this;
		var searchState,pageNo,pageLength;
		var data = this._loadFromTop();
		if(data != "" && data != undefined){
			$.each(data,function(key,value){
				if(key == "formData"){
					$.each(value,function(k,v){
						//设置值并且手工出发change事件
						$("#"+k).val(v).trigger("change");
					});
				}else{
					if(key == "searchState"){
						searchState = value;
					}else if(key == "pageNo"){
						pageNo = parseInt(value);
					}
					else if(key == "pageLength"){
						pageLength = parseInt(value);
						tableObj.iDisplayLength = pageLength;
					}else if(key == "sortState"){
						//这里将数组重新整理一遍，是因为在IE8上，如果不重新整理，返回的数组对象不能调用slice函数，
						//导致datatable处理出错
						var arr  = new Array();
						for(var i=0;i<value.length;i++){
							var item = value[i];
							var varr = new Array();
							for(var j=0;j<item.length;j++){
								varr.push(item[j]);
							}
							arr.push(varr);
						}
						tableObj.aaSorting = arr;
						
						//tableObj.aaSorting = [[4, 'desc', 0]];
						/*
						varr.push(4);
						varr.push('asc');
						varr.push(0);
						
						arr.push(varr);
						
						tableObj.aaSorting = arr;
						*/
					}
				}
			});
			
			if(typeof pageNo != 'undefined' && typeof pageLength != 'undefined'){
				tableObj.iDisplayStart = (pageNo-1)*pageLength;
			}
			
			if(typeof searchState != 'undefined' && searchState != "none"){
				$(".filter-mod").show();
				$(".Js_showSearch").css("background-position", "86px -28px");
				$("#searchnav").text("关闭查询条件");
			}else{
				$(".filter-mod").hide();
				$(".Js_showSearch").css("background-position", "86px 6px");
				$("#searchnav").text("展开查询条件");
			}
		}
		//触发自定义恢复状态函数
		if(typeof self.restoreValues == 'function'){
			self.restoreValues(data.formData, data);
		}
		return tableObj;
	},
	
	restore: function(){
		try{
			return this._restore();
		}catch(e){
			fhdebug(e);
			return {};
		}
	},
	
	/**
	 * 在页面
	 * 
	 * @param pDatatableId 如果页面使用了自定义的datable id而非common.js里面使用的
	 * grid-table ,则需要在这里传入名字
	 */
	bindUnload: function(pDatatableId){
		if($.trim(pDatatableId) != ''){
			this.datatableId = pDatatableId;
		}
		var self = this;
		$(window).on("beforeunload", function(){
			self.store();
		});	
	},
	
	/**
	 * treeId
	 */
	bindTreeUnload: function(treeId){
		if($.trim(treeId) != ''){
			this.treeId = treeId;
		}
		var self = this;
		$(window).on("beforeunload", function(){
			self.storeTree();
		});	
	},
	
	/**
	 * 清空指定frmId里面保存的所有状态
	 * @param frmId
	 */
	clearFrameValue: function(frmId){
		//不处理空frmId
		if($.trim(frmId) == ''){return;}
		this._clearFrameValue(frmId);
	}
	
	/*
	,
	searchGrid : function(tableObj){
		var frameId = window.frameElement.id;
		tableObj.iDisplayLength = 15;
		tableObj.iDisplayStart = 0;
		top[frameId] = "";
		return tableObj;
	}
	*/
}

