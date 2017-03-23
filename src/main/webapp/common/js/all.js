/*
	Author:LN(Allison Lee) (21楼UED  李宁)
	Date:2013-02-01
	Descript:common functions
*/

	/*
	* 动态添加js
	*/
/**
 * Ajax请求超时跳转
 * 
 */
$(document).ajaxError(function(event, xmlRequest, ajaxOptions, throwError) {
	// alert(xmlRequest.status+"------"+throwError+"------"+xmlRequest.responseText)
	// fh.alert('当前账户超时，请重新登录！',false,function(){
	if (xmlRequest.status == 302) {
		window.location.href = xmlRequest.reponseText;
		//top.location.href = xmlRequest.responseText;
	}
		// });
})

window.onerror = function(err){
//	if(typeof(console) != "undefined"){
//		console.log(err);		
//		return true;
//	} 
}
$(document).ready(function(){

	//IE7-IE8浏览器对于含有padding左右值的副容器 子容器的100%宽度只是在出去padding值的有限空间内 ,因此通过计算
	if(document.all && navigator.userAgent.indexOf("MSIE 9.0")<=-1 ){
		$(".wel-drop .select-list").css("width",$(".wel-drop .Js_dropMod").outerWidth(true))
	}
	//设置面包屑
	if($(".main-hd") && $(".main-hd").length>0 && fmeeting_loginType != "sso"){
		//获取当前点击的菜单
		var topW=$(top.document.body)
		var menu=topW.find("#Js-asideNav").find(".aside-item.current > a.current").text();
		var secondMenu=topW.find("#Js-asideNav").find(".aside-item.current > a.current").siblings("ul").find("a.current").text()
		if($.trim(secondMenu).length == 0){
			menu = "我的首页";
		}
		var menuStr='<div class="crumb"><span class="home-icon"></span>'
		menuStr+='<span class="layer-one">'+menu+'</span>'
		if($.trim(secondMenu).length != 0){
			menuStr+='<span class="layer-two">'+secondMenu+'</span>';
		}
		menuStr+='</div>'
		$(".main-hd").first().prepend(menuStr)
		//拼当前页面crumblo
		$(".crumb > span:last").css("background","none")
	}
	//遮罩
	$(".service-shadow").css("opacity","0.4")
	/*屏蔽所有页面的右键以及backspace按键*/
	$(document).keydown(function(e){
		if(e.currentTarget.activeElement==null) return;
		var target=(e.currentTarget.activeElement.nodeName).toLowerCase();
		if(e.keyCode==8)
		{
		if(target=="textarea" || target=="input"){
			//组织输入特殊字符
		//	if(e.shiftKey && )
			$(e.currentTarget.activeElement).focus();
		}
		else
		return;
		}
		if(e.shiftKey && e.keyCode==188 ||e.shiftKey && e.keyCode==190 ){
			if(target=="textarea" || target=="input"){
				return;
			}
		}
	})
	
	$(".Js_dropMod").each(function(){
		var _this=$(this)
			//_this.find(".Js_hiddenVal").val("")
			var curObj=_this.find(".Js_curVal");
			if(curObj.find("input:text").length<=0){
				var curText=curObj.text();
				curObj.html("");
				curObj.append("<input type='text' value='"+curText+"' />")
			}
		//_this.find(".Js_hiddenVal").val("")
		_this.find(".Js_hiddenVal").attr("normal",_this.find(".Js_curVal").find("input:text").val())
		_this.hover(function(){
			_this.find(".Js_hiddenVal").attr("normal",_this.find(".Js_curVal").find("input:text").val())
			//添加zIndex的值是为了兼容IE8以下浏览器层级
			_this.css("zIndex","5")
			_this.parents(".pop-conlists").css("z-index","2")
			if(_this.find(".select-list").find("li").length<=0) return;
			_this.find(".select-list").show().find("li").show();
			if(_this.parents(".search-mod").length>0){
				_this.parents(".search-mod").eq(0).css("z-index",5)
			}
		},function(){
			_this.css("zIndex","1")
			_this.find(".select-list").hide().find("li").removeClass("hover");
			if(_this.parents(".search-mod").length>0){
				_this.parents(".search-mod").eq(0).css("z-index",1)
			}
		})
	//添加hover方法
	_this.find("ul li").each(function(){
		$(this).hover(function(){
			$(this).addClass("hover").siblings("li").removeClass("hover")
		},function(){
			$(this).removeClass("hover")
		}).click(function(e){
			var that=$(this).find("a")
			_this.find(".Js_hiddenVal").attr("normal",that.text());
			if(that.parents("ul").siblings(".Js_curVal").find("input:text").length<=0){
				that.parents("ul").siblings(".Js_curVal").text(that.text()).css("color","#5A5A5A")
			}
			else
			{
				that.parents("ul").siblings(".Js_curVal").find("input:text").val(that.text()).css("color","#5A5A5A")
			}
			that.parents("ul").siblings(".Js_hiddenVal").val(that.attr("rel"))
			that.parents("ul").siblings("label.error").remove();
			that.parents("ul.select-list").hide()
			//e.preventDefault();
			//e.stopImmediatePropagation()
		})
	})
	//当前select list下input输入筛选
		var curKeyLiIndex=-1;
		_this.find(".Js_curVal input:text").click(function(){
			$(this).select();	
		}).keyup(function(e){
			
			//筛选机构
			var keyVal=$(this).val();
			if($.trim(keyVal)==""){
				$(this).parent(".Js_curVal").next(".select-list").show().find("li").show().removeClass("hover");
			}
			else
			{
				//alert($(this).parents(".Js_curVal").next(".select-list").find("li:contains('"+keyVal+"')").length)
				$(this).parents(".Js_curVal").next(".select-list").show().find("li:contains('"+keyVal+"')").show();
				$(this).parents(".Js_curVal").next(".select-list").find("li").not(":contains('"+keyVal+"')").hide()
			}
			
			//上下按钮事件绑定
			var keycode=e.keyCode
			var dropList=$(this).parents(".Js_curVal").next(".select-list");
			var curKeyLiVisible=dropList.find("li:visible")
			//curKeyLiIndex=dropList.find("li.hover").index(curKeyLiVisible);
			//下导航按键
			if(keycode==40 || keycode==38){
			if(keycode==40){
				if(dropList.is(":visible") && dropList.find("li").length>=1){
					
					curKeyLiIndex+=1;
					if(curKeyLiIndex>curKeyLiVisible.length-1){
						curKeyLiIndex=0;
					}
					curKeyLiVisible.eq(curKeyLiIndex).addClass("hover").siblings("li").removeClass("hover")
				}
			}
			//上导航按键
			if(keycode==38){
				if(dropList.is(":visible") && dropList.find("li").length>=1){
					curKeyLiIndex-=1;
					if(curKeyLiIndex<0){
						curKeyLiIndex=curKeyLiVisible.length-1
					}
					curKeyLiVisible.eq(curKeyLiIndex).addClass("hover").siblings("li").removeClass("hover")
				}
			}
				
			}
			if(keycode==13){
			
				var curSelectedLi=curKeyLiVisible.eq(curKeyLiIndex)
				curSelectedLi.find("a").click();
				dropList.hide().find("li").hide().removeClass("hover");
				curKeyLiIndex=-1;
			}
			
		}).focusout(function(){
			_this.find(".Js_curVal input:text").val(_this.find(".Js_hiddenVal").attr("normal"))
		})
	})
	
	//给form表单绑定事件，禁止回车
	$("form[id!=loginForm]").keydown(function(e){
		var $this=$(this)
		var ev = window.event || e;
		if(ev.keyCode==13){
			$this.submit(function(){
				return false;
			})
		}
	})
	
	//控制用户手动输入
	$(".user-disabled").each(function(){
		var _this=$(this)
		//_this.keydown(function(){
		//	return false;
		//})
		_this.attr("readonly","readonly");
	})
	$(".Js_dropMod").find("a").live("click",function(e){
		if($(this).parents("ul").siblings(".Js_curVal").find("input:text").length<=0){
				$(this).parents("ul").siblings(".Js_curVal").text($(this).text()).css("color","#5A5A5A")
			}
			else
			{
				$(this).parents("ul").siblings(".Js_curVal").find("input:text").val(($(this).text()).replaceAll("&lt;","<").replaceAll("&gt;",">")).css("color","#5A5A5A")
			}
		$(this).parents("ul").siblings(".Js_hiddenVal").attr("normal",$(this).text())
		$(this).parents("ul").siblings(".Js_hiddenVal").val($(this).attr("rel"))
		$(this).parents("ul").siblings("label.error").remove();
		$(this).parents("ul.select-list").hide()
		e.preventDefault();
		//e.stopImmediatePropagation()
	})
	
	//resizeBg();
	//tab页签
	setLiIframeH();
	$(".tab-list").each(function(index){
		$(this).find("li").each(function(index){
			var _this=$(this);
			_this.click(function(){
				var _thisSib=_this.parents(".tab-list").next(".tab-conlist");
				//设备位置li点击时，不需要加current样式 add by duan
				if("mapA"!=$(this).find("a").attr("id")){
					_this.addClass("current").siblings("li").removeClass("current");
				}
				_thisSib.find(".tab-conitem").eq(index).show().siblings(".tab-conitem").hide();
			})
		})
	})
	//添加于删除模块
	hoverLi();
	getAndDel();
	//resize
	$(window).resize(function(){
		setLiIframeH("r");
	})
	//文本框焦点样式（去除验证错误的input元素样式）
	$("input,textarea").not(".error").focus(function() {
		 $(this).addClass("focus")
	}).blur(function() {
		  $(this).removeClass("focus")
	});
	//查询框显隐
	$(".search-toggle a").toggle(
		function(){
			$(this).addClass("hide")
			$(this).text("");
			$(this).text("关闭查询条件")
			$(".search-mod").show();
			return false;
		},
		function(){
				$(this).removeClass("hide")
				$(this).text("");
				$(this).text("展开查询条件")
				$(".search-mod").hide();
				return false;
		})
	//页面标题下拉框样式
	$(".head-box").hover(function(){
		// $(this).css("border-radius","0.3em 0.3em 0 0")
	},function(){
		//$(this).css("border-radius","0.3em")
	});
	//
	$("#grid-table_length").append("<span>条记录</span>");
	
	//给返回首页图标增加事件
//	$(".home-icon").click(function(){
//		//初始化左侧菜单
//		$("ul.sub-navlist:visible",parent.document.body).each(function (){
//	    	$(this).prev("a").find("img").attr("src",$(this).prev("a").find("img").attr("src").replace("_cur.png",".png"));
//			$(this).prev("a").removeClass();
//			$(this).prev("a").parent().removeClass("current");
//			$(this).find("a").removeClass("current");
//		    $(this).css("display","none");
//    	});
//		if("2"==$(top.document.body).find("#adminType")[0].value){
//			// 机构管理员
//			$("#mainFrame",top.document.body).attr("src",$("#basePath",top.document.body).val()+"PageRedirect?path=tipsIndex.jsp");
//		}else{
//			$("#Js-asideNav li:eq(0)",parent.document.body).find("li:eq(0) a").parents("ul").prev("a").click();
//			$("#Js-asideNav li:eq(0)",parent.document.body).find("li:eq(0) a").click();
//		}
//	});
	
	//图片滚动
	if($("#appImageList").size() > 0 ){
		$(window).resize(function(){
			$("#appImageList").fixedScrollContainer();
		})
	}
})

/*
	*拼菜单数据
*/
//右侧菜单 是否出现滚动条事件
function showScroll(){
	//控制滚动条的出现
	if($("#Js-asideNav").outerHeight(true) > $(".aside").outerHeight(true)){
		//滚动条出现
		$(".aside-bar").show();
	}
	else
	{
		$(".aside-bar").hide();
	}
}
function loadMenu(json){
		if(typeof(json)=="object"){
			var topP=[]
			var liStr=""
			if(json!=undefined)
			for(var i=0; i<json.length;i++ ){
					if(json[i]["parentId"]==0){
						var menuImg=json[i]["menuImg"] ?'<img src="'+json[i]["menuImg"]+'" />' : ""; 
						liStr+='<li class="aside-item"><a href="javascript:void(0);">'+menuImg+json[i]["menuName"]+'</a>'//</li>'
						liStr+=loadSubNav(json[i]["menuId"],json,json[i]["menuName"])
					}
				}
			$("#Js-asideNav").append(liStr)
			
			//针对有二级菜单的单独设置样式
			$(".sub-navlist .sub-navitem a").each(function(i,val){
				if($(this).next("ul.sub-navlist").size()>0){
					$(this).addClass("nav-a").attr("href","javascript:void(0);");
					$(this).parent("li:first").addClass("parent-nav");
				}
			})
			
			//showScroll();
			//绑定点击事件
			bindClick();
		}
	}
function loadSubNav(parentId,json,parentMenuName){
		var liStr=""
		var childMenu=[]
		for(var j=0;j<json.length;j++)
		{
			if(json[j]["parentId"]==parentId)
			{
				childMenu.push(json[j])
			}
		}
		if(childMenu.length<=0)
		{			
			liStr+='</li>'
			return liStr;	
		}
		liStr='<ul class="sub-navlist">';
		for(var a=0;a<childMenu.length;a++)
		{
			if(childMenu[a]["menuLocal"] == '0'){
				//外部系统用window.open的方式打开
				liStr+='<li class="sub-navitem"><a href="javascript:void(0);" onclick="jumpThird(\''+childMenu[a]["url"]+'\');" rel="'+ parentMenuName + "-" + childMenu[a]["menuName"]+'">'+childMenu[a]["menuName"]+'</a>'//</li>'
			}else{
				liStr+='<li class="sub-navitem"><a id="'+childMenu[a]["menuId"]+'" href="'+$("#basePath").val()+childMenu[a]["url"]+'" rel="'+ parentMenuName + "-" + childMenu[a]["menuName"]+'">'+childMenu[a]["menuName"]+'</a>'//</li>'
			}
			liStr+=loadSubNav(childMenu[a]["menuId"],json,childMenu[a]["menuName"])
		}
		liStr+='</ul>'
		liStr+='</li>'
		return liStr;
		
	}

function jumpThird(url){
	var orgUuidCookie = customPreferenceLoad("orgListDefault");
	
	url = url.replace("[$sessionId]",$("#sessionId").val());
	url = url.replace("[$orgUuidDefault]",orgUuidCookie);
	
	window.open(url);
}

//树形模块
function loadTree(json,jsonBox){
		if(typeof(json)=="object"){
			var topP=[]
			var liStr=""
			for(var i=0; i<json.length;i++ ){
					if(json[i]["parentId"]==0){
						liStr+='<li class="aside-item"><input type="checkbox" class="tree-chk" value="'+json[i]["value"]+'" /><a href="javascript:void(0)">'+json[i]["menuName"]+'</a>'//</li>'
						liStr+=loadSubTree(json[i]["menuId"],json)
					}
				}
			
			if($("#"+jsonBox)){
				$("#"+jsonBox).append(liStr)
			}
			//绑定点击事件
			bindClick();
		}
	}
function loadSubTree(parentId,json){
		var liStr=""
		var childMenu=[]
		for(var j=0;j<json.length;j++)
		{
			if(json[j]["parentId"]==parentId)
			{
				childMenu.push(json[j])
			}
		}
		if(childMenu.length<=0)
		{			
			liStr+='</li>'
			return liStr;	
		}
		liStr='<ul class="sub-navlist">';
		for(var a=0;a<childMenu.length;a++)
		{
			liStr+='<li class="sub-navitem"><input type="checkbox" class="tree-chk" value="'+childMenu[a]["value"]+'" /><a href="javascript:void(0)">'+childMenu[a]["menuName"]+'</a>'//</li>'
			liStr+=loadSubTree(childMenu[a]["menuId"],json)
		}
		liStr+='</ul>'
		liStr+='</li>'
		return liStr;
		
	}
	//给子类li对象添加点击效果
function bindClick(){
		$("#Js-asideNav a,#Js-treeNav a").each(function(){
				var _this=$(this);
				_this.live("click",function(e){
					_this.parents(".parent-nav.current").removeClass("current");
					if(_this.siblings("ul").length>0)
					{
						if(_this.siblings("ul").is(":visible")){
							//_this.removeClass("current");
							$(".sub-navitem a").removeClass("current");
							_this.addClass("current");
							_this.siblings("ul").hide();
							return false;
						}
						_this.siblings("ul").show().end().addClass("current").parent("li").not(".parent-nav").addClass("current");
						var _thisChildImg=""
						if(_this.find("img").size() > 0 && _this.find("img").attr("src").indexOf("_cur")==-1){
						_thisChildImg=_this.find("img").attr("src").slice(0,-4)+"_cur.png"
						}
						else
						{
							_thisChildImg=_this.find("img").attr("src")
						}
						_this.find("img").attr("src",_thisChildImg)
						_this.parents("li").siblings("li").find("a").removeClass("current");
						var curImgSibs=_this.parents("li").siblings("li")
						for(var i=0;i<_this.parents("li").siblings("li").find("a").find("img").length;i++){
							if(curImgSibs.eq(i).find("a").find("img").attr("src").indexOf("_cur")>-1){
								var curImg=curImgSibs.eq(i).find("a").find("img").attr("src").slice(0,-8)+".png"
								curImgSibs.eq(i).find("a").find("img").attr("src",curImg)
							}
						}
						_this.parents("li").siblings("li").removeClass("current")
						_this.parents("li").siblings("li").find("a").siblings("ul").hide();
						if($("#Js-asideNav")&&$("#Js-asideNav").length>0){
							if(window.skyScroll){
									var a = skyScroll({ 
										target:'JsasideNav',
					            		width:180, 
					               		height:$(".aside").outerHeight(true)
					       			 });
						 		}
				 		}
						//showScroll();
					}
					else
					{
						$(".sub-navitem a").removeClass("current");
						_this.addClass("current");
						if(_this.attr("onclick")!="" && _this.attr("onclick")!=undefined){return;}
						showPage(_this.attr("href"))
					}
					
					e.preventDefault();
					return false;		
				})
			})
//		$(".sub-navitem a").each(function(){
//			var _this=$(this);
//			_this.click(function(){
//				$(".sub-navitem a").removeClass("current");
//				_this.addClass("current");
//			})
//		})
//		
	}
//给子类sub-navitem对象添加点击效果
/*
==========================================================datatable列表===========================================================
*/
// 表格 列表 hover的时改变颜色
function hoverChangeTdBg(obj) {
	//obj.find("td").last().css("overflow","visible")
	var lastTd=obj.find("td").last()
	if(lastTd.find("img").length>0 || lastTd.find("a").length>0){
		lastTd.css("overflow","visible")
	}
	obj.live("mouseover", function() {
		var _this = $(this);
		$("#grid-table").find("tr.contenttr").removeClass("contenttr")
		_this.addClass("hover_tr_tdbg")
	}).live("mouseout", function() {
		var _this = $(this);
		_this.removeClass("hover_tr_tdbg")
	})
}


//将每页展示的条数设置进cookie
var perPageNum = customPreferenceLoad("perPageNum");
		
		
// 页面公共datatable 初始化
function datatableObj(tableObj, parmObj,callback){
    //查询 checkbox依旧选中的bug修复
	if(tableObj && tableObj.url){
	    if($("#grid-table") && $("#grid-table thead").find("input:checkbox").length>0){
	        $("#grid-table thead").find("input:checkbox").removeAttr("checked");
	    }
	    //是否显示title
	    var isShowTitle=tableObj.showTitle ?  tableObj.showTitle : false;
		// 是否显示分页插件
		var hidepage = tableObj.nopage ? tableObj.nopage : "showpage"
		//是否有遮罩效果
		var hasCover=(tableObj.hasCover == undefined || tableObj.hasCover != false) ? true : false; 
		tableObj.aaSorting = tableObj.aaSorting != undefined
				? tableObj.aaSorting
				: [];
		var objId=tableObj.tbID ? tableObj.tbID : "grid-table";
		var datatable = $('#'+objId).dataTable({
			"aLengthMenu" : tableObj.aLengthMenu ? tableObj.aLengthMenu : [[10,15,20,25], [10,15,20,25]],
			"iDisplayLength" : perPageNum ? perPageNum : 10,
			"iDisplayStart" : tableObj.iDisplayStart ? tableObj.iDisplayStart : 0,
 			"bDestroy" : true,
			"bServerSide" : true,
			"bAutoWidth": false,
			"sPaginationType" : "lnPagination",
			//"bProcessing" : true,
			"oLanguage" : {
				sLengthMenu : "_MENU_ 条记录",
				sInfo : "共 _TOTAL_ 条记录,每页显示",
				sInfoEmpty : "共 0 条记录,每页显示",
				sInfoFiltered : "",
				sEmptyTable : "没有符合条件的数据！",
				//sProcessing : "正在加载数据...",
				sZeroRecords: "没有符合条件的数据！"
			},		
			"bFilter" : true,
			"sServerMethod" : "POST",
			//"bPaginate":tableObj.bPaginate ? true : tableObj.bPaginate,
			"aaSorting" : tableObj.aaSorting,
			"sAjaxSource" : tableObj.url,
			 "fnServerData": function (sSource, aoData, fnCallback, settings) {
			 if(hasCover){
				 showCover("正在加载数据······");
			 }
            var sEcho = '';
            for (var i = 0; i < aoData.length; i++) {
                if (aoData[i].name == 'sEcho') {
                    sEcho = aoData[i].value;
                }
            }
           aoData=togetherParams(aoData, tableObj, parmObj);
          // console.log(aoData)
            settings.jqXHR = $.ajax({
	            	"type":"POST",
	                "url": sSource,
	                "data": aoData,
	                "success":function(data, textStatus, xmlHttpRequest){
	                if(typeof(callback)=="function"){
	                	callback($.parseJSON(settings.jqXHR.responseText))
	                }
	                hideCover();	
					//判断对象的状态是交互完成
					if (xmlHttpRequest.readyState == 4) {
								
								//判断http的交互是否成功
								if(xmlHttpRequest.status == 200){
									var responseBody = xmlHttpRequest.responseText;
									var resultcode = xmlHttpRequest.getResponseHeader("resultcode");
									var resultmessage = decodeURI(xmlHttpRequest.getResponseHeader("resultmessage"));
									if(resultcode>0){
										var dataStr = JSON.stringify(data);
										//对响应的json串做html注入处理
										fnCallback(JSON.parse(dataStr.replaceAll("<","&lt;").replaceAll(">","&gt;")));
									}else{
										if("-102"==resultcode){
											top.location.href = $(top.document.body).find("#contextPath").val()+"m";
											return false;
										}else if("-1021"==resultcode){
											top.location.href = $(top.document.body).find("#contextPath").val();
											return false;
										}else if(null == resultcode){//本地数据
											var dataStr = JSON.stringify(data);
											//对响应的json串做html注入处理
											fnCallback(JSON.parse(dataStr.replaceAll("<","&lt;").replaceAll(">","&gt;")));
										}
										//列表响应头错误提示
										if("null" != resultmessage){
											popWinAlert(resultmessage);
										}
									}
								}else{
									popWinAlert("访问后台数据异常！");
								}
							}
		                },
		                "dataType": "json",
		               // "contentType":"application/json",
		                "cache": false,
		                "error": function (xhr, error, thrown) {
		                	 hideCover();
		                    if (error == "parsererror") {
		                        alert("DataTables warning: JSON data from server could not be parsed. " +
		                                            "This is caused by a JSON formatting error.");
		                    }
		                }
	            	});
        		},
	        	"fnStateLoad":function(){},
				"fnServerParams" : tableObj.fnServerParams
						? tableObj.fnServerParams
						: null,
				"aoColumns" : tableObj.aoColumns,
				"sDom" : 'zt<"bottom    ' + hidepage + ' clearfix"iflrp>',
				"fnCreatedRow" : tableObj.fnCreatedRow
						? function(nRow, aData, iDataIndex){
							tableObj.fnCreatedRow(nRow, aData, iDataIndex)
							createdRowFn(nRow, aData, iDataIndex);
							//row中的dom 动态绑定事件
							optClickFun(nRow);
						}
						: function(nRow, aData, iDataIndex) {
							createdRowFn(nRow, aData, iDataIndex);
							//row中的dom 动态绑定事件
							optClickFun(nRow);
						},
				"fnHeaderCallback" : tableObj.fnHeaderCallback
						? tableObj.fnHeaderCallback
						: function(nHead, aData, iStart, iEnd, aiDisplay) {
							headCheck(nHead, aData, iStart, iEnd, aiDisplay);
						},
				"fnDrawCallback":function(oSettings ){
					//列的显示与隐藏
					//setTimeout(function(){
						if($("#"+objId).find("tbody").find("tr").length<=1 && $("#"+objId).find("tbody").find("tr").find("td").length<=1)
						{
							$("#"+objId).find("tbody").find("tr").find("td").attr("colspan",$("#"+objId).find("th").not(".hide").length)
						} 
						else{
								$("#"+objId).find("thead th").each(function(index){
								if($(this).hasClass("hide")){
									$("#"+objId).find("tbody > tr").each(function(){
										$(this).find("td").eq(index).addClass("hide")
									});
								}
								else
								{
									$("#"+objId).find("tbody > tr").each(function(){
										$(this).find("td").eq(index).removeClass("hide")
									});
								}
							})
						}
						$("select[name=grid-table_length]").live("change",function(){
							customPreferenceSet("perPageNum",$(this).val());
							perPageNum=customPreferenceLoad("perPageNum");
							if("" != perPageNum){
									$("select[name=grid-table_length]").val(perPageNum);
								//	$("select[name=grid-table_length]").change();
								}	
						});
					//})
				}
		});
		refreshDatable(datatable);
		$("#"+objId).find("tr").each(function(){
			var lastTd=$(this).find("td").last()
			if(lastTd.find("img").length>0 || lastTd.find("a").length>0){
				lastTd.css("overflow","visible")
			}
		})
		return datatable;
	}
}

function controlCol(obj){
	if(obj && obj.length>0){
		
		
	}
}
//动态绑定 交互效果
function optClickFun(nRow){
	$(nRow).find(".tb-opt-box").live("click",function(){
		if($(this).children("img").attr("src").indexOf("devrulegrey.png")!=-1){
			return;
		}
		var _this=$(this)
	//	_this.parents(".dataTables_wrapper").css("z-index","8")
		var top=_this.offset().top;
		var _thisChild=_this.find("div.tb-opt-main");
		
		if(_thisChild.is(":visible")){
			_thisChild.hide();
		}
		else 
		{
			$("div.tb-opt-main").not(_thisChild).hide();
			if(_thisChild.outerHeight(true)<=2*top){
				var splitH=Math.floor(_thisChild.outerHeight(true)/2)
				_thisChild.css("top","-"+splitH+"px").show();
				_thisChild.find("img:first").css("top",splitH-4+"px")
			}
			else
			{
				_thisChild.find("img:first").css("top",top-4+"px")
				_thisChild.css("top","-"+top+"px").show();
			}
			
		}
	})
	//子集的hover绑定
	$(nRow).find(".tb-opt-main").hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
		//$(this).parents(".dataTables_wrapper").css("z-index","1")
	})
}

//根据返回码跳转
function redirectToPage(xmlHttpRequest,successCallBack,errorCallBack){
	if (xmlHttpRequest.readyState == 4) {
		//判断http的交互是否成功
		if(xmlHttpRequest.status == 200){
			var responseBody = xmlHttpRequest.responseText;
			var resultcode = xmlHttpRequest.getResponseHeader("resultcode");
			var resultmessage = decodeURI(xmlHttpRequest.getResponseHeader("resultmessage"));
			if(resultcode>0){
				var data;
				if(""!=responseBody && null!=responseBody && undefined != responseBody){
					data = eval( "(" + responseBody + ")" );
				}
				successCallBack(data,resultcode,resultmessage);
			}else{
				errorCallBack(resultcode,resultmessage);
			}
		}else{
			popWinAlert("访问后台数据异常");
		}
	}
}
function createdRowFn(nRow, aData, iDataIndex){
	// tr元素hover时改变背景色
	hoverChangeTdBg($(nRow));
	// 当前行记录中checkbox的选中状态（与TR元素相关）
	//setCheckRecord(nRow, aData, iDataIndex)
	//checkBox click
	setCheckBoxOnly(nRow, aData, iDataIndex)
	//给td添加title属性 显示全部内容
	showTdTitle(nRow, aData, iDataIndex)
}

//给td添加title属性
function showTdTitle(nRow, aData, iDataIndex){
	if(navigator.userAgent.indexOf("Firefox")>=0){
		//向body中插入一个<div>模拟title的展现  修复ff的bug
		var ffTip='<div id="jsFfTips" class="fftips"></div>'
		if($("#jsFfTips") && $("#jsFfTips").length<1){
			$("body").append(ffTip)
		}
		
		$(nRow).find("td").each(function(){
			var that=$(this)
			if($(this).find("img").length>0)
			return;
			$(this).attr("rel",$(this).text())
			if($.trim($(this).text())=="") {
				$(this).removeAttr("rel")
			}
			that.hover(function(e){
				var eTop=e.clientY+document.documentElement.scrollTop+5
				var eLeft=e.clientX+document.documentElement.scrollLeft+5
				if(that.attr("rel")==undefined) return;
				if(document.documentElement.clientWidth-100 <= 0){
					$("#jsFfTips").css({"top":eTop+"px","left":"auto","right":"0px"}).text(that.attr("rel")).show();
					if(eTop+20>=document.documentElement.clientHeight){
						$("#jsFfTips").css("top",document.documentElement.clientHeight-20+"px")
					}
				}
				else
				{
					$("#jsFfTips").css({"top":eTop+"px","left":eLeft+"px"}).text(that.attr("rel")).show();
					if(eTop+32>document.documentElement.clientHeight+document.documentElement.scrollTop){
						$("#jsFfTips").css({"top":document.documentElement.clientHeight+document.documentElement.scrollTop-32});
					}
				}
				
			},function(){
				$("#jsFfTips").text("").hide();
			})
		})
	}
	else
	{
		$(nRow).find("td").each(function(){
			if($(this).find("img").length>0 || $(this).find("a").length>0)
			return;
			$(this).attr("title",$(this).text())
			if($.trim($(this).text())=="") {
				$(this).removeAttr("title")
			}
		})
	}
	
}
//checkbox only click
function setCheckBoxOnly(nRow, aData, iDataIndex){
	$(nRow).find("input:checkbox").live("change",function(){
		//去除不能点击状态的checkbox对象
		//if($(this).is(":disabled")) return;
		if ($(this).is(":checked")) {
			$(this).parents("tr").addClass("selectedtr");
			//单选情况
			if ($(this).parents("table").hasClass("Js_singleCheck")) {
				//$(this).attr("checked", "checked")
				$(this).parents("tr").addClass("selectedtr").siblings("tr")
						.removeClass("selectedtr")
				$(this).parents("tr").siblings("tr").find("input:checkbox")
						.removeAttr("checked")
			} 
		}else{
			$(this).parents("tr").removeClass("selectedtr");
		}

		var checked = $(this).parents("table").find("tbody")
				.find("input:checkbox:checked").length
		var all = $(this).parents("table").find("tbody").find("input:checkbox").length
		if (checked == all) {
			$(this).parents("table").find("th").find("input[type=checkbox]:enabled").attr(
					"checked", "checked")
		} else {
			$(this).parents("table").find("th").find("input:checkbox")
					.removeAttr("checked")
		}
	})
}

// 点击事件
function rowClickEvent(nRow, url) {
	$(nRow).live("click", function() {
		if ($("#grid-table").dataTable().fnIsOpen(this)) {
			$("#grid-table").dataTable().fnClose(this);
		} else {
			$("#grid-table").dataTable().fnOpen(this, getHtml(url), "info_row");
		}
	});
}
// 返回内容
function getHtml(url) {
	var rtStr = ""
	if (url != undefined && url != "") {
		// 1.url连接地址字符串
		if (url.indexOf("/") > 0 || url.indexOf(".action") > 0
				|| url.indexOf(".jsp") > 0) {
			$.ajax({
						"type" : "POST",
						"dataType" : "html",
						"url" : url,
						"async" : false,
						"success" : function(data) {
							rtStr = data;
						}
					})
			return rtStr;
		}
		// 2.单纯的字符串
		else {
			rtStr = url;
		}
		return rtStr;
	} else
		return "内容为空！";
}

function getSortObjs(datatable){
	if($.fn.DataTable.fnIsDataTable( $(datatable)[0] ))
	{
		return $(datatable).data("sortObj");
	}
}
// refresh datatable
function refreshDatable(datatable) {
	$(".datatable_refresh_ln").live("click", function() {
		$("#grid-table").find("input:checkbox").removeAttr("checked");
		datatable.fnDraw(false);
	})
}
// 拼接传送给服务器端的参数 格式：sort="proName asc,proCode desc&order=''"
function togetherParams(aoData, tableObj, parmObj) {
	//升序字符
	var sortasc=[];
	//降序字符
	var sortdesc=[];
	//ret obj
	var retObj={};
	var sortColumnCount = 0;
	var sortField = [], sortDir = [], dataProp = [], sortProp = [], sortColumnIndex = [];
	var sortCollen=0;
	var sortStr = ""
	for (var a=0;a < aoData.length;a++) {
		if (aoData[a].name == "iSortingCols") {
			sortColumnCount = aoData[a].value
		}
		if (aoData[a].name.indexOf("mDataProp_") >= 0) {

			dataProp.push(aoData[a].value)
		}
		if (aoData[a].name.indexOf("sSortDir_") >= 0) {
			sortProp.push(aoData[a].value)
		}
		if (aoData[a].name.indexOf("iSortCol_") >= 0) {
			sortColumnIndex.push(aoData[a].value)
		}
		if (aoData[a].name.indexOf("default_param") >= 0) {
			sortColumnIndex.push({
				"default_param" : aoData[a].value
			})
		}
		if(aoData[a].name.indexOf("iSortingCols") >= 0){
			sortCollen=aoData[a].value;
		}
	}
	if (sortColumnCount >= 2) {
		for (var col = 0; col < sortColumnIndex.length; col++) {
			if (tableObj.aaSorting && tableObj.aaSorting.length == 0
					&& typeof(sortColumnIndex[col]) == "object") {
				sortStr = sortColumnIndex[col]["default_param"]
			} else {
				if (typeof(sortColumnIndex[col]) == "object")
					continue;
				sortField.push(dataProp[sortColumnIndex[col]])
				sortDir.push(sortProp[col])
				sortStr += dataProp[sortColumnIndex[col]] + " " + sortProp[col]
						+ " , "
			}
		}

		if (tableObj.aaSorting && tableObj.aaSorting.length == 0) {
		} else {
			sortStr = sortStr.slice(0, -2);
		}

		var trimStr = $.trim(sortStr);
		if (trimStr.charAt(trimStr.length - 1) == ",") {
			sortStr = sortStr.slice(0, -2);
		}

		// 合并参数 方便后台管理获取
		aoData.push({
			"name" : "sort",
			"value" : sortStr
		})
		aoData.push({
			"name" : "order",
			"value" : ""
		})
	}
	else if(sortColumnCount==1){
		// 合并参数 方便后台管理获取
		aoData.push({
			"name" : "sort",
			"value":dataProp[sortColumnIndex[0]]
		})
		aoData.push({
			"name" : "order",
			"value" : sortProp[0]
		})		
	}
	else {
		// 合并参数 方便后台管理获取
		if (tableObj.aaSorting && tableObj.aaSorting.length == 0) {
			aoData.push({
				"name" : "sort",
				"value" : sortColumnIndex[0] != undefined
						? sortColumnIndex[0]["default_param"]
						: ""
			})
			aoData.push({
				"name" : "order",
				"value" : sortProp[0] != undefined ? sortProp[0] : ""
			})
		}
	}
	 //添加额外的参数
	if (parmObj) {
		if(parmObj instanceof Array){
			aoData = aoData.concat(parmObj)
		}else{
			for (var a in parmObj) {
				aoData.push({
					"name" : a,
					"value" : parmObj[a]
				})
			}
		}
	}
	//console.log(sortProp)
	//console.log(dataProp)
	//console.log(sortColumnIndex)
	for(var t=0;t<sortProp.length;t++){
		var curColIndex=sortColumnIndex[t]
		var curSortFName=dataProp[curColIndex]
		if(sortProp[t]=="desc"){
			sortdesc.push(curSortFName)
		}
		if(sortProp[t]=="asc"){
			sortasc.push(curSortFName)
		}
	}
	
	//判断是否有添加的默认排序
	if(sortColumnIndex.length>sortProp.length){
		var lastObj=sortColumnIndex[sortColumnIndex.length-1]
		var lastStr=lastObj.default_param.split(",")
		for(var sL=0;sL<lastStr.length;sL++)
		{
			
			if($.trim(lastStr[sL]).split(" ")[1]=="desc")
			{
				sortdesc.push($.trim(lastStr[sL]).split(" ")[0])
			}
			if($.trim(lastStr[sL]).split(" ")[1]=="asc")
			{
				sortasc.push($.trim(lastStr[sL]).split(" ")[0])
			}
		}
		
	}
	retObj.sortdesc=sortdesc.toString();
	retObj.sortasc=sortasc.toString();
	$("#grid-table").data("sortObj",retObj)
	return aoData;
}
// datatable checkbox
function headCheck(nHead, aData, iStart, iEnd, aiDisplay) {
	if ($(nHead).parents("table").hasClass("Js_singleCheck")) {
		$("input:checkbox", nHead).remove();
	} else {
		$("input:checkbox", nHead).live("change", function() {
			var checked = $(this).is(":checked");
			if (checked) {
				$(this).parents("table").find("input:checkbox:visible:enabled").attr(
						"checked", checked)
				$(this).parents("table").find("input:checkbox:visible:enabled")
						.parents("tr").addClass("selectedtr")
			} else {
				$(this).parents("table").find("input:checkbox:visible:enabled")
						.removeAttr("checked")
				$(this).parents("table").find("input:checkbox:visible:enabled")
						.parents("tr").removeClass("selectedtr")
			}
		})
	}

}
// datatable tbody checkbox check
function setCheckRecord(nRow, aData, iDataIndex) {
	$(nRow).live("click", function(e) {
		if ($(this).find("input:checkbox").length > 0) {
			if ($(this).find("input:checkbox").attr("checked") == "checked" && $(this).find("input:checkbox").is(":enabled")) {
				$(this).find("input:checkbox").removeAttr("checked")
				$(this).removeClass("selectedtr")
			} else {
				//单选情况
				if ($(this).parents("table").hasClass("Js_singleCheck")) {
					$(this).find("input:checkbox").attr("checked", "checked")
					$(this).addClass("selectedtr").siblings("tr")
							.removeClass("selectedtr")
					$(this).siblings("tr").find("input:checkbox")
							.removeAttr("checked")
				} else {
					$(this).find("input:checkbox").attr("checked", "checked")
					$(this).addClass("selectedtr")
				}
			}
		}
		var checked = $(this).parents("table").find("tbody")
				.find("input:checkbox:checked").length
		var all = $(this).parents("table").find("tbody").find("input:checkbox").length
		if (checked == all) {
			$(this).parents("table").find("th").find("input:checkbox").attr(
					"checked", "checked")
		} else {
			$(this).parents("table").find("th").find("input:checkbox")
					.removeAttr("checked")
		}
	})
	$("input:checkbox", nRow).live("click", function(e) {
		$(this).parents("tr").click();
	});
}


// 获取选中的对象内容
function getSeleteObjs(datatable) {
	// 获取选中的行的数据
	var selectedObj = [];
	for (var chktr = 0; chktr < $("#grid-table").find("tbody")
			.find("input:checkbox:checked").length; chktr++) {
		var thisChkTr = $("#grid-table").find("tbody")
				.find("input:checkbox:checked").eq(chktr).parents("tr")
		var thisIndex = $("#grid-table").find("tbody").find("tr")
				.index(thisChkTr)
		selectedObj.push(datatable.fnGetData(thisChkTr[0]))
	}
	return selectedObj;
}

//显示遮罩层
function showCover(string){
	if(fmeeting_loginType == "sso"){
	    var topBody=getTbody();
	   	var hMax=topBody.height();
		var string=(string !=undefined && string!="") ? string : "正在处理中······";
		var clientH=hMax;
		var clientW=topBody.width();
		//-ms-filter:”progid:DXImageTransform.Microsoft.Alpha(opacity=50)”; 解决IE8的各个小版本问题
		var coverDiv='<div class="Js_cover" style="position:absolute;top:0px;opacity:0.4;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);filter:alpha(opacity=40); left:0px;z-index:9998; background-color:#fff;width:'+clientW+'px;height:'+clientH+'px;" class="coverbg"></div>'
		var coverContents='<div class="Js_coverMsg" style="position:absolute;z-index:9999; left:50%; top:50%; margin-top:-40px; margin-left:-125px; width:200px; height:30px; text-align:center;line-height:30px; padding:20px; background:#fff; border:5px solid #424954">'+string+'</div>'
		topBody.append(coverDiv)
		topBody.append(coverContents)
		topBody.find(".Js_cover").css("opacity","0.4")
	}else{
		var hMax=Math.max(top.document.documentElement.clientHeight,top.document.body.offsetHeight)
		var string=(string !=undefined && string!="") ? string : "正在处理中······";
		var clientH=hMax;
		var clientW=top.document.documentElement.clientWidth;
		//-ms-filter:”progid:DXImageTransform.Microsoft.Alpha(opacity=50)”; 解决IE8的各个小版本问题
		var coverDiv='<div class="Js_cover" style="position:absolute;top:0px;opacity:0.4;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);filter:alpha(opacity=40); left:0px;z-index:9998; background-color:#fff;width:'+clientW+'px;height:'+clientH+'px;" class="coverbg"></div>'
		var coverContents='<div class="Js_coverMsg" style="position:absolute;z-index:9999; left:50%; top:50%; margin-top:-40px; margin-left:-125px; width:200px; height:30px; text-align:center;line-height:30px; padding:20px; background:#fff; border:5px solid #424954">'+string+'</div>'
		$(top.document.body).append(coverDiv)
		$(top.document.body).append(coverContents)
		$(top.document.body).find(".Js_cover").css("opacity","0.4")
	}
}
$(window).resize(function(){
	reszeWin();
})
function reszeWin(){
    var hMax=Math.max(document.documentElement.clientHeight,document.documentElement.scrollHeight,document.body.scrollHeight)
	var clientH=hMax
	var clientW=document.documentElement.clientWidth;
	$("body").find(".Js_cover").css({"width":clientW+"px","height":clientH+"px"})
	$("body").find(".pop-mask").css({"width":clientW+"px","height":clientH+"px"})
}
//关闭遮罩层
function hideCover()
{
	var topBody = null;
	if(fmeeting_loginType == "sso"){
	   topBody=getTbody();
	}else{
	   topBody=$(top.document.body);
	}
	if(topBody && topBody.find(".Js_cover") && topBody.find(".Js_cover").length>0){
		topBody.find(".Js_cover").remove();
	}
	if(topBody && topBody.find(".Js_coverMsg") && topBody.find(".Js_coverMsg").length>0){
		topBody.find(".Js_coverMsg").remove();
	}
}

function getTbody(){
   if(document.body.id == "in-body"){
	  topBody=$(window.document.body);
   }else{
   	  topBody=$(parent.window.document.body);
   }
   return topBody;
}


//模拟浏览器默认的几个弹出窗效果功能
	/*
	*obj：表示自定义弹出窗的外观大小
	*type:表示弹出窗类型(1:alert,2:promp窗体)
	*/
	function popWin(obj,popContent,okhandle,canclehandle){
	/*
	*shadow:表示是否显示阴影
	*close:是否在头部添加可关闭的按钮
	*/
		var topWin = null;
		var H = 0;
		var W = 0;
		if(fmeeting_loginType == "sso"){
		   topWin=getTbody();
		   H = topWin.height();
		   W = topWin.width();
		}else{
		   topWin=$(top.document.body);
		   H=Math.max(top.document.documentElement.clientHeight,top.document.body.offsetHeight)
		   W=top.document.documentElement.clientWidth;
		}
		if(topWin.find(".alert-popbox")) topWin.find(".alert-popbox").remove();
		if(topWin.find(".alert-popshadow")) topWin.find(".alert-popshadow").remove();
		var defaultObj={
			"width":"280",
			//"height":"50",
			"title":"提示",
			"shadow":true,
			"close":false
		}
		var settings=$.extend({},defaultObj,obj)
		var content=popContent!=" " ? popContent : "输入需要提示的内容！";
		var type= 1;//默认alert窗体
		//var okHtml=typeof(okhandle)=="function" ? '<a href="javascript:void(0)" class="alert-btn alert-ok">确定</a>' : ''
		var okHtml='<a href="javascript:void(0)" class="alert-btn alert-ok">确定</a>';
		var cancelHtml=typeof(canclehandle)=="function" ? '<a href="javascript:void(0)" class="alert-btn alert-cancel">取消</a>' : ''
		var closeHd=settings.close ? '<a class="alert-close"></a>' : ''
		var stylePopShadow='<div class="alert-shadow alert-popshadow"></div>'
		var stylePop='<div class="alert-box alert-popbox" style="position:absolute;width:'+settings.width+'px;top:50%;left:50%;margin-left:-'+Math.floor(parseInt(settings.width)/2)+'px;">'
		//head
		var hdtype=""
		//模拟pomp弹出窗式模块
		if(type==1){
			hdtype="alert-warnning"
		}
		if(hdtype==2)
		{
			hdtype="alert-tips"
		}
		//纯粹的alert模块
		if(type==3){
			hdtype="alert-warnning"
		}
		stylePop+='<div class="alert-hd '+hdtype+'">'+settings.title+closeHd+'</div>'
		//content
		stylePop+='<div class="alert-bd">'+content+'</div>'
		//foot
		stylePop+='<div class="alert-fd">'+okHtml+cancelHtml+'</div>'
		stylePop+='</div>'
		styleShadow='<div class="alert-shadow" style="width:'+W+'px; height:'+H+'px;"></div>'
		if(settings.shadow){
			topWin.append(styleShadow)
			topWin.find(".alert-shadow").css("opacity","0.3")
		}
		topWin.append(stylePop)
			topWin.find(".alert-box").css({
			"marginTop":"-"+Math.floor(parseInt($(".alert-box").outerHeight())/2)+"px"
		})
		//绑定事件
		topWin.find(".alert-ok").one("click",function(e){
			if(type==3){
				closeAlert();
				return;
			}
			if(typeof(okhandle)=="function"){
				//关闭alert模块
				closeAlert()
				okhandle();
				
			}
			e.preventDefault();
			e.stopImmediatePropagation();
		})
		topWin.find(".alert-cancel").one("click",function(){
			if(typeof(canclehandle)=="function"){
				//关闭alert模块
				closeAlert()
				canclehandle();
				
			}
		})
		topWin.find(".alert-close").one("click",function(){
			if(typeof(canclehandle)=="function"){
				topWin.find(".alert-box").remove();
				topWin.find(".alert-shadow").remove();
				canclehandle();
				//关闭alert模块
				if(typeof(callback)=="function"){
					callback();
				}
			}
		})
	}
	
	//关闭alert层
	//var alertCallback;
	//纯粹的alert模块
	
	function popWinAlert(popContent,callback,showClose){
		var callFun=""
		callFun=callback;
		var topWin = null;
		var H = 0;
		var W = 0;
		if(fmeeting_loginType == "sso"){
		   topWin=getTbody();
		   H = topWin.height();
		   W = topWin.width();
		}else{
		   topWin=$(top.document.body)
		   H=Math.max(top.document.documentElement.clientHeight,top.document.body.offsetHeight)
		   W=top.document.documentElement.clientWidth;
		}
		topWin.find(".alert-box").remove();
		topWin.find(".alert-shadow").remove();
		var content=popContent!=" " ? popContent : "输入需要提示的内容！";
		var okHtml='<a href="javascript:void(0)" class="alert-btn pop-alert-ok">确定</a>';
		var closeHd=(showClose && showClose==1)?'' : '<a class="alert-close" onclick="closeAlert()"></a>'
		var stylePopShadow='<div class="alert-shadow"></div>'
		var stylePop='<div class="alert-box" style="position:absolute;width:200px;top:50%;left:50%;margin-left:-100px;z-index:9999">'
		//head
		var hdtype="alert-warnning"
		stylePop+='<div class="alert-hd '+hdtype+'">提示'+closeHd+'</div>'
		//content
		stylePop+='<div class="alert-bd"  style="max-height:100px;word-break: break-all; word-wrap:break-word; overflow:auto;">'+content+'</div>'
		//foot
		stylePop+='<div class="alert-fd">'+okHtml+'</div>'
		stylePop+='</div>'
		styleShadow='<div class="alert-shadow" style="width:'+W+'px; height:'+H+'px;"></div>'
		topWin.append(styleShadow)
		topWin.find(".alert-shadow").css("opacity","0.3")
		topWin.append(stylePop)
		topWin.find(".alert-box").css({
			"marginTop":"-"+Math.floor(parseInt($(".alert-box").outerHeight())/2)+"px"
			})
		if(callFun!=undefined && callFun!="" && typeof(callFun)=="function"){
				topWin.find(".pop-alert-ok").removeAttr("onclick").one("click",function(e){
				//关闭弹出窗后解绑定tab键的阻止事件
				$(document).unbind("keydown")
					topWin.find(".alert-box").first().remove();
					topWin.find(".alert-shadow").first().remove();
					callFun();
			})
		}
		else
		{
			//$("input:text").first().focus();
			$(document).unbind("keydown")
			//topWin.find(".pop-alert-ok").unbind("click").attr("onclick","closeAlert()")
			topWin.find(".pop-alert-ok").unbind("click").one("click",function(){closeAlert();})
		}
		//确定按钮聚焦
		//$()
		//取消聚焦
		//取消tab键的功能
		
		$(document).keydown(function(e){
			var e=e || window.event;
			var obj = e.srcElement ? e.srcElement : e.target;
			if($(obj).parents(".login-box").size() == 0 ){
				topWin.find(".alert-box .pop-alert-ok").focus();
			}
			//console.log(obj)
			//if(){
			//	topWin.find(".alert-box .pop-alert-ok").focus();
			//}
			if(e.keyCode==9) {
				return false;
			}
		})
		/*
		topWin.find(".alert-close").live("click",function(){
			closeAlert();
		})
		*/
	}
	function closeAlert(){
		//取消tab键的功能
		$(document).unbind("keydown");
		var topWin = null;
		if(fmeeting_loginType == "sso"){
		   topWin=getTbody();
		}else{
		   topWin=$(top.document.body)
		}
		
		//if(typeof(alertCallback)=="function"){
		//	alertCallback();
		//}
		topWin.find(".alert-box").first().remove();
		topWin.find(".alert-shadow").first().remove();
	}
	//窗体resize的时候要计算弹出窗北京的长于宽
	function resizeBg(){
	
		if(fmeeting_loginType == "sso"){
			if(window.frameElement && window.frameElement.id == "frame1" && window.frameElement.className == "tab-frame"){
				$("body,html").css({background:"#ffffff"});
				$("body").addClass("tab-body")
    			$("body .main-hd").css({height:"0px","borderBottom":"none"});
			}
			
			$(window).resize(function(){
				if(($(".alert-shadow") && $(".alert-shadow").size()>0) || ($(".pop-mask") && $(".pop-mask").size()>0)){
					var topWin= getTbody();
					var H=topWin.height();
					var W=topWin.width();
					topWin.find(".alert-shadow,.pop-mask").css({"width":W+"px","height":H+"px"})
				}
			})
		}else{
		   var topWin=$(top.document.body);
		   if($(".alert-shadow")){
				$(window).resize(function(){
					var H=Math.max(top.document.documentElement.clientHeight,top.document.body.offsetHeight)
					var W=top.document.documentElement.clientWidth;
					topWin.find(".alert-shadow").css({"width":W+"px","height":H+"px"})
				})
			}
			else
			return;
		}
	}
	
	
/*------------------------弹出窗模块 Begin--------------------------*/
/*
*弹出窗需要的元素：title(标题),width(宽度),height(高度)
*包含块（title区域，以及内容区域）
*closeCallback :关闭窗体头部的关闭按钮时执行的回调
*2012-03-09:添加
*/
function showPopWindow(obj,url,type,closeCallback)
{
	//top.url=url;
	var type=type ? type:0;//传入参数类型 ，如果参数不存在则直接关闭当前已经存在的弹出窗所有模块
	var topBody = null;
	var w=0;
	var H=0;
	if(fmeeting_loginType == "sso"){
	   topBody=getTbody();
       w=topBody.width();
	   H=topBody.height();
	}else{
	  topBody=$(top.document.body);
	  w=Math.max(top.document.documentElement.clientWidth,document.documentElement.clientWidth);
	  H=Math.max(top.document.documentElement.clientHeight,top.document.body.offsetHeight);
	}
	var topPopBox=topBody.find(".pop-box").first();
	var topPopMask=topBody.find(".pop-mask").first();
	//未传入相关的属性  默认值
	var defaultOpts={
		title:"弹出窗",
		width:"600px",
		height:"335px",
		okHtml:null,//确定按钮文字（可自定义）
		cancelHtml:"",//取消按钮文字(可自定义)
		okCallBack:null,//确定按钮回调
		cancelBack:null//取消按钮回调
	}
	var settings=$.extend({},defaultOpts,obj)
	//遮罩层
	var marking='<div class="pop-mask" style="width:'+w+'px;height:'+H+'px;"></div>'
	if(type!=0){
		marking='<div class="pop-mask" style="width:'+w+'px;height:'+H+'px;z-index:'+parseInt(parseInt(topBody.find(".pop-mask").eq(topBody.find(".pop-mask").length-1).css("zIndex"))+1)+';"></div>'		
	}
	
	//拼装弹出窗的整体结构
	var mL=-Math.floor(parseInt(settings.width.slice(0,-2))/2)+"px";
	var mT=-Math.floor(parseInt(settings.height.slice(0,-2))/2)+"px";
	var popFrame='<div class="pop-box" style=" margin-left:'+mL+';width:'+settings.width+'; margin-top:-'+Math.ceil((parseInt((settings.height).slice(0,-2))+80)/2)+'px;">'
	if(type!=0){
		 popFrame='<div class="pop-box" style=" margin-left:'+mL+';margin-top:-'+Math.ceil((parseInt((settings.height).slice(0,-2))+80)/2)+'px;width:'+settings.width+';z-index:'+parseInt(parseInt(topBody.find(".pop-box").eq(topBody.find(".pop-box").length-1).css("zIndex"))+1)+';">'	
	}
	//title
	popFrame+='<div class="pop-hd-l"></div><div class="pop-hd"><span></span>'+settings.title+'<span class="pop-close" onclick="closePopWin(this);"></span></div><div class="pop-hd-r"></div>'
	//body
	popFrame+='<div class="pop-bd" style="background:url(../images/loading.gif) #fff no-repeat center center"></div>'
	popFrame+='</div>';
	//嵌入顶层body标签最后
	topBody.append(marking)
	topBody.append(popFrame)
	//topBody.find(".pop-box").last().css({"margin-top":mT})
	topBody.find(".pop-mask").last().css({"opacity":"0.4","width":w+"px","height":H+"px"})
	if(url!=undefined && url!=""){
	//通过iframe进行加载
	var iframeHtml=""
	if(type!=0){
	
	 iframeHtml='<iframe id="pop-Childframe" src="'+url+'" scrolling="auto" frameborder="0" width="100%" style="height:'+settings.height+';" ></iframe>';
	 
	}
	else
	 iframeHtml='<iframe id="pop-frame" src="'+url+'" scrolling="auto" frameborder="0" width="100%" style="height:'+settings.height+';" ></iframe>';
	 
	 iframeHtml+='<div class="pop-btns">'
	 if(settings.okHtml && settings.okHtml!=""){
		iframeHtml+='<a href="javascript:;" class="button pop-btn-ok"><em>'+settings.okHtml+'</em></a>'
	}
	if(settings.cancelHtml && settings.cancelHtml!=""){
		iframeHtml+='<a href="javascript:;" class="button pop-btn-cancel" onclick="closePopWin(this);" ><em>'+settings.cancelHtml+'</em></a>'
	}
	iframeHtml+='</div>'
	topBody.find(".pop-bd").last().html(" ")
	topBody.find(".pop-bd").last().append(iframeHtml).css("background","#fff")
	//绑定确定/取消回调函数
	 if(settings.okCallBack && settings.okCallBack!=""){
		 topBody.delegate(".pop-bd .pop-btn-ok","click",function(){
			 settings.okCallBack();
		 })
	 }
	 if(settings.cancelBack && settings.cancelBack!=""){
		 topBody.delegate(".pop-bd .pop-btn-cancel","click",function(){
			 settings.cancelBack();
		 })
	 }
	//取消tab键的功能
	$(document).keydown(function(e){
		var e=e || window.event;
		if(e.keyCode==9) {
			return false;
		}
	})
	//弹出窗位置居中显示
	/*var lmT=-(Math.floor(parseInt(topBody.find(".pop-box").height())/2))+top.document.documentElement.scrollTop+"px";
	setTimeout(function(){
		topBody.find(".pop-box").css({
		"margin-top":lmT
	})
	},10)
	*/
	//$(topBody.find(".pop-bd").last().find("iframe")[0].contentWindow.document.body).append("<div style='display:none'>"+topBody.find(".pop-bd").last().find("iframe").attr("id")+"</div>");
	/*$.ajax({
			type:"POST",
			dataType:"html",
			url:url,
			beforeSend:function(){
				showCover("正在加载页面...")
			},
			success:function(data){
				hideCover();
				topBody.find(".pop-bd").css("background","#fff")
				topBody.find(".pop-bd").html(" ")
				topBody.find(".pop-bd").html(data)
				var mT=-(Math.floor(parseInt(topBody.find(".pop-box").height())/2))+top.document.documentElement.scrollTop+"px";
				setTimeout(function(){
					topBody.find(".pop-box").css({
					"margin-top":mT
				})
				},10)
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
			//session 超时
			var xmlRequest=XMLHttpRequest
			top.document.location.href=xmlRequest.responseText
			//根据textStatus判断出错的类型 并给出相应的提示
			if(errorcallback && typeof(errorcallback)=="function")
			{
				errorcallback();
			}
		}
		})
		*/
	}
	else
	{
		var contentFrame=""
		var contentStr='<div style="height:'+settings.height+'; background:#fff;">'+url+'</div>'
		 contentFrame+='<div class="pop-btns">'
		 if(settings.okHtml && settings.okHtml!=""){
			contentFrame+='<a href="javascript:;" class="button pop-btn-ok single-btn-ok"><em>'+settings.okHtml+'</em></a>'
		}
		if(settings.cancelHtml && settings.cancelHtml!=""){
			contentFrame+='<a href="javascript:;" class="button pop-btn-cancel" onclick="closePopWin(this);" ><em>'+settings.cancelHtml+'</em></a>'
		}
		contentFrame+='</div>'
		topBody.find(".pop-box").last()
		topBody.find(".pop-box").last().find(".pop-bd").html(contentStr+contentFrame)
		topBody.find(".single-btn-ok").click(function(){
			closeCallback();
			closePopWin();
		})
	}
	
	//改变删除之前模块的位置，兼容各个浏览器
	if(type==0){
		topPopMask.remove();
		topPopBox.find("iframe").remove();
		topPopBox.remove();
	}	
	

	

	//点击遮罩层 弹出窗消失
	/*topBody.find(".pop-mask").last().live("click",function(){
		var _this=$(this)
		//_this.siblings(".pop-box").remove();
		topBody.find(".pop-box").last().remove();
		_this.remove();
	})
	*/
	//控制可拖拽弹出窗
	if(fmeeting_loginType == "sso"){
	   if($(".main-hd") && $(".main-hd").size()>0){
		 	if(typeof(setMoveaBle)=="function")
			{
				setMoveaBle();
			}
	   }else{
	   		if(typeof(parent.setMoveaBle)=="function")
			{
				parent.setMoveaBle();
			}
	   }
	}else{
		if(typeof(top.setMoveaBle)=="function")
		{
			top.setMoveaBle();
		}
	}
}



//给父亲页面添加方法
/*
	@param :obj:确定按钮以及取消按钮自定义操作句柄
	        {
	        	okFun:确定按钮操作句柄,
	        	cancelFun:取消按钮操作句柄
	        	userFun:用户添加自定义操作按钮模块
	        }
	//使用方法
	addParentBtn({
		okFun:函数名,
		cancelFun:函数名,
		userFun:{text:取消,fun:函数}用户自定义方法
	})
*/
	function addParentBtn(obj){
		var okFun=obj && obj.okFun!=null ? obj.okFun : "";
		var cancelFun=obj&&obj.cancelFun ? obj.cancelFun : "";
		if(this.frameElement){
			if(typeof(okFun)=="function"){
				$(this.frameElement).siblings(".pop-btns").find(".pop-btn-ok").bind("click",function(){
					okFun();
				})
			}
			if(typeof(cancelFun)=="function")
			{
				$(this.frameElement).siblings(".pop-btns").find(".pop-btn-cancel").bind("click",function(){
					cancelFun();
				})
			}
			if(obj&&obj.userFun && typeof(obj.userFun)=="object"){
				var userBtn='<a href="javascript:;" class="button pop-btn-user"><em>'+(obj.userFun.text ? obj.userFun.text : "拒绝")+'</em></a>'
				$(userBtn).insertAfter($(this.frameElement).siblings(".pop-btns").find(".pop-btn-ok"))
				$(this.frameElement).siblings(".pop-btns").find(".pop-btn-user").bind("click",function(){
					if(typeof(obj.userFun.fun)=="function")
					obj.userFun.fun();
				})
			}
		}
	}
	


//关闭并移除弹出窗(如果有多个可以删除最后一个弹出的弹出窗模块)
/*
	*2013-04-11bug修复：
	*修复bug：在IE下以及ff几个版本中 无法删除内容
*/
function OkFunPopWin(fun){
	if(fun && typeof(fun)=="function"){
		fun();
	}
}
function closePopWin(obj){
	var $=(window.jQuery)
	//取消tab键的功能
	$(document).unbind("keydown");
	if(fmeeting_loginType != "sso"){
		if(obj){
			//判读是否是顶级窗体
			if(window==top){
				$("body").find(".pop-mask").last().remove();
				$("body").find(".pop-box").last().find(".pop-bd").html("");
				$("body").find(".pop-box").last().remove();
			}
			else
			{
				$(obj).parents(".pop-box").siblings(".pop-mask").last().remove();
				$(obj).parents(".pop-box").last().find(".pop-bd").html("");
				$(obj).parents(".pop-box").last().remove();
			}
	
		}
		else
		{
			//判读是否是顶级窗体
			if(window==top){
				$("body").find(".pop-mask").last().remove();
				//移除iframe（）
				if(document.all){
					$("body").find(".pop-box").last().find(".pop-bd iframe").attr("src","");
				}
				
				$("body").find(".pop-box").last().remove();
				//document.body.removeChild($("body").find(".pop-box").last()[0])
			}
			else
			{
				$(top.document.body).find(".pop-mask").last().remove();
				if(document.all){
					$(top.document.body).find(".pop-box").last().find(".pop-bd iframe").attr("src","");
				}
				//$(top.document.body).find(".pop-box").last().find(".pop-bd").html("");
				$(top.document.body).find(".pop-box").last().remove();
			}
		}
	}else{
		var topBody = getTbody();
		topBody.find(".pop-mask").last().remove();
		topBody.find(".pop-box").last().find(".pop-bd").html("");
		topBody.find(".pop-box").last().remove();
	}
	return false;
}

/*------------------------弹出窗模块 END--------------------------*/

//获取顶级iframe
function getFrameBody(str)
{
	if(fmeeting_loginType != "sso"){
	    var topW=$(top.window.document.body);
		if(str){
			return topW.find("#"+str)[0].contentWindow;
		}
		else
		{
			return topW.find("#mainFrame")[0].contentWindow;
		}
	}else{
		var topW = null;
		if(document.body.id == "in-body"){
			topW = window;
		}else{
			if(topW = $(parent.window.document.body).find(".tab-frame").length>0){
				topW = $(parent.window.document.body).find(".tab-frame")[0].contentWindow;
			}
		}
	   	return  topW;
	}
}

/*
* @descript: 根据传入的frame的ID获取当前frame的窗体对象
* @param : id,对应的iframe的ID
* @return  : 返回frame窗体
*/
function getInnerWin(id){
	var parentWin=$($(top.document.body).find("#mainFrame")[0].contentWindow.document.body)
	try{
		if(parentWin.find("#"+id) && parentWin.find("#"+id).length>0){
			return parentWin.find("#"+id)[0].contentWindow
		}
	}
	catch(e){
		popWinAlert(e)
	}
}
//公共Ajax函数
/*function ajaxFun(url,data,callback){
	$.ajax({
		"type":"POST",
		"dataType" : "json",
		"url" : url,
		"data" : data ? data : "",
		"success" : function(data){
			if(data && typeof(callback)=="function"){
				callback(data);
			}
		}
	})
}*/


//弹出窗可以拖拽移动 (公用拖拽功能)
	var dragobj={}
	function setMoveaBle(){
		if($(".pop-hd") && $(".pop-hd").length>0){
			$(".pop-hd").live("mousedown",function(e){
			var _this=$(this)
		  //判断当前点击的对象
		  var e=e || window.event;
		  var target=e.target ? e.target : e.srcElement;
		  var targetClass=$(target).attr("class")
		  if(targetClass.indexOf("pop-hd")<0)
		  	{
		  		//点击的对象不是  头部则返回 不能进行拖拽
		  		return;
		  	}
		   //当前拖动对象的父亲容器  即表示待被拖动的整个容器对象
		   dragobj.o=_this.parents(".pop-box")
		   dragobj.xy=_getxy(dragobj.o)
		   //鼠标点击的位置
		   dragobj.xx=new Array((e.clientX-dragobj.xy[1]),(e.clientY-dragobj.xy[0]))
			});

		}
	}	
	
	//窗体聚焦时执行
	if(window.onfocus){
	window.onfocus=function(){document.onmouseup()}
	}
	//窗体失去焦点的时候执行
	if(window.onblur){
		window.onblur=function(){document.onmouseup()}
	}	
	document.onmouseup=function(){
				//清楚可拖拽的对象
				 dragobj={}
				 return;
			}
			//移动鼠标执行的函数
	document.onmousemove=function(e){
			 var e=e||window.event
			 if(dragobj.o!=null){
			 var curTotalH=e.clientY-dragobj.xx[1]+$(".pop-box").last().outerHeight(true)
			 var maxH=Math.max(document.documentElement.clientHeight,document.documentElement.scrollHeight,document.body.clientHeight)
			 var curTotalW=e.clientX-dragobj.xx[0]+$(".pop-box").last().outerWidth(true)
			 var objH=$(".pop-box").last().outerHeight(true)
			 var objW=$(".pop-box").last().outerWidth(true);
			 var maxW=Math.max(document.documentElement.clientWidth,document.documentElement.scrollWidth,document.body.clientWidth)
			 if(curTotalW<=objW || curTotalW>=maxW || curTotalH<=objH || curTotalH>=maxH  )
			 {
			 	return;
			 }
			
			 	//if(curTotalH>=maxH || curTotalW>=maxW ){
			 	//	(dragobj.o).css({"left":e.clientX-dragobj.xy[2]+"px","top":e.clientY-dragobj.xy[3]+"px","margin-left":"0px","margin-top":"0px"})
			 	//}
			 	//else
			 	var left=e.clientX-dragobj.xx[0]+"px";
			 	var top=e.clientY-dragobj.xx[1]+"px";
			 	//if()
			 	(dragobj.o).css({"left":left,"top":top,"margin-left":"0px","margin-top":"0px"})
			 }
			}
	
	//param: 待拖动的整个对象容器
	var _getxy=function(e){
	 var a=new Array()
	 //对象距离顶的高度
	 var t=e.offset().top;
	 //距离左侧的距离
	 var l=e.offset().left;
	 //宽度
	 var w=e.outerWidth(true);
	 //高度
	 var h=e.outerHeight(true);
	 //返回一个数据 分别存储：top,left,width,height
	 a[0]=t;a[1]=l;a[2]=w;a[3]=h
	  return a;
	}  	

	
	
	//模拟下拉列表添加绑定点击事件
	function bindLinkClick(){
			$(".Js_dropMod").each(function(){
			var _this=$(this)
			var _this=$(this)
			//_this.find(".Js_hiddenVal").val("")
			var curObj=_this.find(".Js_curVal");
			if(curObj.find("input:text").length<=0){
				var curText=curObj.text();
				curObj.html("");
				curObj.append("<input type='text' value='"+curText+"' />")
			}
			//_this.find(".Js_hiddenVal").val("")
			var curObj=_this.find(".Js_curVal");
			if(curObj.find("input:text").length<=0){
				var curText=curObj.text();
				curObj.html("");
				curObj.append("<input type='text' value='"+curText+"' />")
			}
			_this.find(".Js_hiddenVal").attr("normal",_this.find(".Js_curVal").find("input:text").val())
			_this.hover(function(){
				_this.find(".Js_hiddenVal").attr("normal",_this.find(".Js_curVal").find("input:text").val())
				//添加zIndex的值是为了兼容IE8以下浏览器层级
				_this.css("zIndex","5")
				_this.parents(".pop-conlists").css("z-index","2")
				if(_this.find(".select-list").find("li").length<=0) return;
				_this.find(".select-list").show().find("li").show();
			},function(){
				_this.css("zIndex","1")
				_this.find(".select-list").hide();
			})
			
			$(".Js_dropMod").find("a").live("click",function(e){
					if($(this).parents("ul").siblings(".Js_curVal").find("input:text").length<=0){
						$(this).parents("ul").siblings(".Js_curVal").text($(this).text()).css("color","#5A5A5A")
					}
					else
					{
						$(this).parents("ul").siblings(".Js_curVal").find("input:text").val($(this).text().replace("&lt;","<").replace("&gt;",">")).css("color","#5A5A5A")
					}
					$(this).parents("ul").siblings(".Js_hiddenVal").attr("normal",$(this).text())
					$(this).parents("ul").siblings(".Js_hiddenVal").val($(this).attr("rel"))
					$(this).parents("ul").siblings("label.error").remove();
					$(this).parents("ul.select-list").hide()
					e.preventDefault();
					//e.stopImmediatePropagation()
				})
			
		//添加hover方法
		_this.find("ul li").each(function(){
			$(this).hover(function(){
				$(this).addClass("hover").siblings("li").removeClass("hover")
			},function(){
				$(this).removeClass("hover")
			}).click(function(e){
				var that=$(this).find("a")
				//$(this).find("a:first").click();
				that.parents("ul").siblings(".Js_curVal").find("input:text").val(that.text()).css("color","#5A5A5A")
				$(this).parents("ul").siblings(".Js_hiddenVal").attr("normal",that.text())
				that.parents("ul").siblings(".Js_hiddenVal").val(that.attr("rel"))
				that.parents("ul").siblings("label.error").remove();
				that.parents("ul.select-list").hide()
				
				//e.preventDefault();
				//e.stopImmediatePropagation()
			})
		})
		
		//当前select list下input输入筛选
		_this.find(".Js_curVal input:text").click(function(){
			$(this).select();
		}).keyup(function(){
			//筛选机构
			var keyVal=$(this).val();
			if($.trim(keyVal)==""){
				$(this).parent(".Js_curVal").next(".select-list").show().find("li").show();	
			}
			else
			{
				//alert($(this).parents(".Js_curVal").next(".select-list").find("li:contains('"+keyVal+"')").length)
				if($(this).parents(".Js_curVal").next(".select-list").show().find("li:contains('"+keyVal+"')").length<=0){
					$(this).parents(".Js_curVal").next(".select-list").hide();
				}
				else
				{
					$(this).parents(".Js_curVal").next(".select-list").show().find("li:contains('"+keyVal+"')").show();
				}
				$(this).parents(".Js_curVal").next(".select-list").find("li").not(":contains('"+keyVal+"')").hide()
			}
		}).focusout(function(){
			_this.find(".Js_curVal input:text").val(_this.find(".Js_hiddenVal").attr("normal"))
		})
		
		})
	}
	
	
	function bindLinkActive(callback){
		//active弹出弹出窗效果
			$(".Js_coverDropMod").each(function(){
			var _this=$(this)
			var _this=$(this)
			//_this.find(".Js_hiddenVal").val("")
			var curObj=_this.find(".Js_curVal");
			if(curObj.find("input:text").length<=0){
				var curText=curObj.text();
				curObj.html("");
				curObj.append("<input type='text' value='"+curText+"' />")
			}
			//_this.find(".Js_hiddenVal").val("")
			var curObj=_this.find(".Js_curVal");
			if(curObj.find("input:text").length<=0){
				var curText=curObj.text();
				curObj.html("");
				curObj.append("<input type='text' value='"+curText+"' />")
			}
			_this.find(".Js_hiddenVal").attr("normal",_this.find(".Js_curVal").find("input:text").val())
			_this.click(function(){
				_this.find(".Js_hiddenVal").attr("normal",_this.find(".Js_curVal").find("input:text").val())
				//添加zIndex的值是为了兼容IE8以下浏览器层级
				_this.css("zIndex","5")
				_this.parents(".pop-conlists").css("z-index","2")
				if(_this.find(".select-list").find("li").length<=0) return;
				//map  以数组形式返回所有的项
				var mapArrary=_this.find(".select-list").find("li").map(function(){
					return $(this).find("a").text()
				}).get().join(",")
				var mapKeyArrary=_this.find(".select-list").find("li").map(function(){
					return $(this).find("a").attr("rel");
				}).get().join(",")
				//使用弹出窗效果显示更多的信息
				//将传入的信息 在新弹出的窗中显示出来 并设置单选 ，单选后直接返回到当前的弹出选择页面
				callback(mapArrary,mapKeyArrary)
				//showMoreInfos(mapArrary);
				//_this.find(".select-list").show().find("li").show();
			})
			
			$(".Js_dropMod").find("a").live("click",function(e){
					if($(this).parents("ul").siblings(".Js_curVal").find("input:text").length<=0){
						$(this).parents("ul").siblings(".Js_curVal").text($(this).text()).css("color","#5A5A5A")
					}
					else
					{
						$(this).parents("ul").siblings(".Js_curVal").find("input:text").val($(this).text().replace("&lt;","<").replace("&gt;",">")).css("color","#5A5A5A")
					}
					$(this).parents("ul").siblings(".Js_hiddenVal").attr("normal",$(this).text())
					$(this).parents("ul").siblings(".Js_hiddenVal").val($(this).attr("rel"))
					$(this).parents("ul").siblings("label.error").remove();
					$(this).parents("ul.select-list").hide()
					e.preventDefault();
					//e.stopImmediatePropagation()
				})
			
		//添加hover方法
		_this.find("ul li").each(function(){
			$(this).hover(function(){
				$(this).addClass("hover").siblings("li").removeClass("hover")
			},function(){
				$(this).removeClass("hover")
			}).click(function(e){
				var that=$(this).find("a")
				//$(this).find("a:first").click();
				that.parents("ul").siblings(".Js_curVal").find("input:text").val(that.text()).css("color","#5A5A5A")
				$(this).parents("ul").siblings(".Js_hiddenVal").attr("normal",that.text())
				that.parents("ul").siblings(".Js_hiddenVal").val(that.attr("rel"))
				that.parents("ul").siblings("label.error").remove();
				that.parents("ul.select-list").hide()
				
				//e.preventDefault();
				//e.stopImmediatePropagation()
			})
		})
		
		//当前select list下input输入筛选
		_this.find(".Js_curVal input:text").click(function(){
			$(this).select();
		}).keyup(function(){
			//筛选机构
			var keyVal=$(this).val();
			if($.trim(keyVal)==""){
				$(this).parent(".Js_curVal").next(".select-list").show().find("li").show();	
			}
			else
			{
				//alert($(this).parents(".Js_curVal").next(".select-list").find("li:contains('"+keyVal+"')").length)
				if($(this).parents(".Js_curVal").next(".select-list").show().find("li:contains('"+keyVal+"')").length<=0){
					$(this).parents(".Js_curVal").next(".select-list").hide();
				}
				else
				{
					$(this).parents(".Js_curVal").next(".select-list").show().find("li:contains('"+keyVal+"')").show();
				}
				$(this).parents(".Js_curVal").next(".select-list").find("li").not(":contains('"+keyVal+"')").hide()
			}
		}).focusout(function(){
			_this.find(".Js_curVal input:text").val(_this.find(".Js_hiddenVal").attr("normal"))
		})
		
		})
	
	}
	
	//重新绑定可houver事件
	function bindLinkHover(obj){
		$(obj).each(function(){
		var _this=$(this)
		//_this.find(".Js_hiddenVal").val("")
		_this.find(".Js_hiddenVal").attr("normal",_this.find(".Js_curVal").text())
		_this.hover(function(){
			//添加zIndex的值是为了兼容IE8以下浏览器层级
			_this.css("zIndex","5")
			_this.find(".select-list").show();
			//判断显示的位置(向上显示 或是 向下显示)
			
			
		},function(){
			_this.css("zIndex","1")
			_this.find(".select-list").hide();
		})
	})
	}
	//这里是弹出页面
	function popPage(title,url,width,height){
		if(url){
			showPopWindow({"title":(title? title:""),"width":width ? width : "300px","height":height ? height : "300px"},url)
		}
	}
	/*
		*@param :obj ：传入的参数对象
		  title:标题
		  url：请求的url
		  width:宽度值
		  height:高度值
		  okHtml:确定按钮文字（可自定义）
		  cancelHtml：取消按钮文字（自定义）
		  
	*/
	function popPageUrl(obj,url,type,callback){
		var type= type ? type : 0;
		if(url){
			showPopWindow({
				"title":(obj.title? obj.title:""),
				"width":obj.width ? obj.width : "300px",
				"height":obj.height ?obj.height : "300px",
				okHtml : obj.okHtml  ? obj.okHtml : "",
				cancelHtml:obj.cancelHtml ? obj.cancelHtml : "",
				okCallBack:obj.okCallBack ? obj.okCallBack : "",
				cancelBack:obj.cancelBack ? obj.cancelBack : ""
			},url,type,callback)
		}
	}
	//显示页面上的隐藏弹出窗
	function showpagePop(domId){
		var _this="";
		if($("#"+domId)){
			_this=$("#"+domId)
			_this.show();
		}
		_this.find(".page-close").click(function(){
			_this.hide();
		})
		setMoveaBle();
	}

	//固定jquery validate插件label错误提示内容的位置
	//验证正确后错误信息删除
	
	//移除焦点后执行的
	$("input,textarea").each(function(){
		var _this=$(this)
		_this.blur(function(){
			if(_this.hasClass("error")){
				//_this.siblings("label.error").hide();
				setErrorPos();
			}
		})
	})
	function setErrorPos(){
		$(window).scrollTop(0);
		//这里控制验证错误信息的位置
		/*$(".pop-conlists>label.error").each(function(){
			var that=$(this);
			that.css({
				"right":"-"+that.outerWidth(true)+"px",
				"top":"0px"
			})
		})
		*/
	/*
		$("label.error").css({"position":"absolute","left":"-9999"}).hide();
		$("input,textarea").each(function(){
			var _this=$(this)
			if(_this.hasClass("error")){
			_this.css("border","1px solid #f00")
			}
			var _thisLabel=_this.siblings("label.error")
				//表单验证时修改页面样式
			_this.live("keyup",function(e){
				$("label.error").css({"position":"absolute","left":"-9999"}).hide();
				//$("body").find("label.error").last().remove();
				setTimeout(function(){
					if(_this.hasClass("valid")){
						_thisLabel.remove();
						_this.css("border","1px solid #ccc")
					}
					if(_this.hasClass("error")){
						$("body > label.error").text(_this.siblings("label.error").text()).show();
						_this.siblings("label.error").hide();
						_this.css("border","1px solid #f00")
					}
				})
				
			}).focusin(function(){
				if(_this.hasClass("valid")){
					_this.css("border","1px solid #ccc")
				}
				if(_this.hasClass("error")){
					_this.css("border","1px solid #f00")
				}
			}).focusout(function(){
				if(_this.hasClass("valid")){
					$("label.error").css({"position":"absolute","left":"-9999"}).hide();
					_this.css("border","1px solid #ccc")
				}
				if(_this.hasClass("error")){
					_this.css("border","1px solid #f00")
				}
				$("label.error").css({"position":"absolute","left":"-9999"}).hide();
			})
			_this.mousemove(function(e){
				if(_this.hasClass("valid"))
				{
					_thisLabel.hide();
					return;
				}
				var x=e.clientX+document.documentElement.scrollLeft;
				var y=e.clientY+document.documentElement.scrollTop;
				$("label.error").hide();
				if(_this.siblings("label.error").length>0){
					_thisLabel=_this.siblings("label.error")
				}
				$("body > label.error").remove();
				_thisLabel.appendTo("body").css({
					"position":"absolute",
					"left":x+10+"px",
					"top": y+10+"px",
					"z-index":"500"
				}).show();
			}).mouseout(function(){
				$("label.error").hide();
				_thisLabel.appendTo(_this.parent("li")).hide()
			}).click(function(){
				//$("label.error").not(_thisLabel).hide();
				$("label.error").hide();
				//_thisLabel.appendTo(_this.parent("li")).hide()
			}).blur(function(){
				_thisLabel.appendTo(_this.parent("li")).hide();
				$("label.error").hide();
			})
		})
		
		*/
		/*重新定义表单验证提示的交互效果*/
	}
	//删除错误信息
	function removeErrorPos(){
		$("label.error").remove();
	}
	//添加与删除模块
	function hoverLi(){
		$(".choice-list").each(function(){
			var _this=$(this)
			_this.find(".choice-item").each(function(){
				var that=$(this)
				that.hover(function(){
					that.addClass("hover-item").siblings("li.choice-item").removeClass("hover-item");
				},function(){
					that.removeClass("hover-item");
				}).click(function(e){
					if(that.hasClass("current")){
						that.removeClass("current")
					}
					else
					{
						if(_this.hasClass("mulit")){
							that.addClass("current")
						}
						else
						that.addClass("current").siblings("li.choice-item").removeClass("current");
					}
					e.stopImmediatePropagation();
				}
)
			})
	})
	}
	function getAndDel(){
		$(".choice-list").each(function(){
			var _this=$(this)
		    //按钮操作
			//添加按钮
			_this.siblings(".choice-btns").find(".Js-addChoice").click(function(){
				//动态加入文本框模块
				var inputStr='<div class="Js-addChoiceItem"><input class="input-item" type="text" /><a class="Js-addItemOk common-btn" href="javascript:;">确定</a></div>'
				if($(".Js-addChoiceItem") && $(".Js-addChoiceItem").length>0){
					$(".Js-addChoiceItem").remove();
				}
				else
				{
					$("body").append(inputStr);
					$(".Js-addChoiceItem").css({"position":"absolute","top":parseInt($(this).offset().top)+"px","left":parseInt($(this).offset().left)+110+"px"})
					$(".Js-addChoiceItem").find(".Js-addItemOk").live("click",function(){
						if($(".Js-addChoiceItem").find(".input-item") && $.trim($(".Js-addChoiceItem").find(".input-item").val())==""){
							return;
						}
						else if($(".Js-addChoiceItem").find(".input-item")&& $.trim($(".Js-addChoiceItem").find(".input-item").val())!="")
						{
							var addStr='<li class="choice-item">'+$(".Js-addChoiceItem").find(".input-item").val()+'</li>'
							_this.append(addStr)
							$(".Js-addChoiceItem").remove();
							hoverLi();
						}
						return false;
					})
				}
				return false;
			});
			//删除按钮
			_this.siblings(".choice-btns").find(".Js-delChoice").click(function(){
				_this.find("li.current").remove();
				hoverLi();
				return false;
			});
		})
	}
	
	//tab内容页签内iframe高度的计算
	/*
		减去的20值修改去除，同时设置iframe父节点li的高度值
	*/
	function setLiIframeH(par){
			if($(".tab-conlist").find("iframe") && $(".tab-conlist").find("iframe").length>0){
				//获取父亲iframe的高度
				var parentH = 0;
				var iframeH = 0;
				if(fmeeting_loginType == "sso"){
				   var tBody =getTbody();
				   parentH=tBody.height();
				   iframeH=parentH-$(".tab-list").outerHeight(true) - 40 -40;
				}else{
				   parentH=$(top.document.body).find("#mainFrame").height();
				   iframeH=parentH-$(".tab-list").outerHeight(true)-$(".main-hd").outerHeight(true);
				}
				$(".tab-conlist").find("iframe").each(function(){
					var _this=$(this)
					//-20(tab-conlist的上下padding值)
					//-2(tab-conlist的border值)
					//-20(外层div的padding值)
					//-4(tab-list 与tab-conlist之间使用relative z-index产生的一个重叠值)
					var h=iframeH;
					if((_this.attr("id")=="mainFrame")||(_this.attr("id")=="frame1" && _this.hasClass("tab-frame")))
					{
						_this.height(h+"px")
					}
					else
					{
						//resize的时候 高度问题要少减去30(？？？？)
						if(par!=undefined){
							_this.height(h-20-2-20-4+"px")
						}
						else
						_this.height(h-20-2-20-4-30+"px")
					}
					//_this.parents("li").eq(0).height(h+"px")
					//IE8中内页高度计算有问题（修改bug如下）
					if(navigator.userAgent.indexOf("MSIE 8.0")>=0){
						$(_this[0].contentWindow.document.body).find("aside").height(h+"px");
					}
				})
				
			}
			else
			{
				//页面内容模块高度设置
				var parentH= 0;
				var iframeH = 0;
				if(fmeeting_loginType == "sso"){
					var tBody=getTbody();
					parentH=tBody.height();
				    iframeH=parentH-$(".tab-list").outerHeight(true) - 40;
				}else{
				    parentH=$(top.document.body).find("#mainFrame").height();
				    iframeH=parentH-$(".tab-list").outerHeight(true)-$(".main-hd").outerHeight(true);
				}
				var h=iframeH-20-2-4;
				//过滤掉弹出窗中的tab页签的高度
				if($(window.frameElement) && $(window.frameElement).parents("div.pop-box").length<=0 )
				{
					$(".tab-conlist > li.tab-conitem").not(".normal-conitem").each(function(){
						//$(this).css({"min-height":h+"px"})
					})
				}
				//含有Js-calHeight类名的容器内计算
				$(".Js-calHeight .aside,.Js-calHeight .main").css("height",parseInt(parentH)-parseInt($(".main-hd").outerHeight(true))-14-16+"px")
				
			}
			if($(".tab-conlist").length<=0 && $(".tab-conlist").find("iframe").length<=0 && $("body .main-cons").length>0&& ($(window.frameElement).attr("id")=="mainFrame" || $(window.frameElement).attr("id") == undefined)){
				if($("body > .main-wrap").length<=0)
				{
					$("body > .main-cons").wrap("<div class='main-wrap'></div>")
				}
				var parentH= 0;
				var iframeH = 0;
				if(fmeeting_loginType == "sso"){
					var tBody=getTbody();
					parentH=tBody.height();
				    iframeH=parentH-40;
				}else{
				    parentH=$(top.document.body).find("#mainFrame").height();
				    iframeH=parentH-$(".main-hd").outerHeight(true);
				}
				
				$("body > .main-wrap").css({
					height:iframeH+"px",
					overflow:"auto"
				})
				
			}
		}
	
	
	/*
	*@descript:	表格显示隐藏列问题
	*@param clickObj  :点击的按钮对象 
	*@param obj  : 需要显示隐藏列的table的class
	*/
	
	function showHideColum(clickObj,obj){
		var clickMenus =""
		try{
			if($("."+obj) && $("."+obj).length>0 && $(clickObj) && $(clickObj).length>0){
				var eventObj=$(clickObj);
				var parent = $("."+obj);
				var _thisH=$("."+obj).find("th");
				var eventX=eventObj.offset().left+eventObj.outerWidth();
				var eventY=eventObj.offset().top+document.documentElement.scrollTop;
				var titleArrary = [];
				$(".Js_tdMenu").hide();
				var space = /^\s?$/
				var thL = _thisH.length
				var space = /^\s?$/
				for (var i = 0; i < thL; i++) {
					space.test(_thisH.eq(i).text())
							? titleArrary.push("选择")
							: titleArrary.push(_thisH.eq(i).text())
				}
				clickMenus = "<div class='rightMenu Js_rightMenu'><ul>"
				for (var m = 0; m < thL; m++) {
					var isHide=_thisH.eq(m).hasClass("hide") ? "background:none" : ""
					var isOk = _thisH.eq(m).hasClass("hide") ? "relok='ok'" : ""
					clickMenus += "<li><a href='' "+ isOk +" style='"+isHide+"' rel='" + m + "'>"
							+ titleArrary[m] + "</a></li>"
				}
				clickMenus += "</ul></div>"
				if ($(".Js_rightMenu").length <= 0) {
					$("body").append(clickMenus).show();
				} else {
					$("body").find(".Js_rightMenu").show()
				}
				if($(".Js_rightMenu>ul > li").length>10){
					$(".Js_rightMenu").addClass("wrapmenu")
				}
				//$("body").find(".Js_rightMenu").find("li:first").css("border","none")
				
				if(document.documentElement.clientWidth<parseInt(eventX)+250)
				{
					$(".Js_rightMenu").removeAttr("style");
					$(".Js_rightMenu").css({
						"right" : document.documentElement.clientWidth - parseInt(eventX),
						"top" : parseInt(eventY)
								+ parseInt(document.documentElement.scrollTop)
					})
				}
				else
				{
					$(".Js_rightMenu").removeAttr("style");
					
					$(".Js_rightMenu").css({
						"left" : parseInt(eventX),
						"top" : parseInt(eventY)
								+ parseInt(document.documentElement.scrollTop)
					})
				}
				
				
				//点击 显示与隐藏
				$("body").find(".Js_rightMenu a").each(function() {
					var _this = $(this)
					var index = _this.attr("rel")
					// _this.removeAttr("title")
					_this.unbind("click").live("click", function(e) {
						if (_this.attr("relok") == "ok") {
							_this.removeAttr("relok")
							_this.removeAttr("style")
							//在没有数据的情况下  显示 与隐藏的对象是th，body体内的td不进行计算
							parent.find("tbody tr").each(function() {
								var that = $(this)
								
								_thisH.eq(index).removeClass("hide");
								
								if(that.find("td").length<=1){

									that.find("td").attr("colspan",that.parents("table").find("th:visible").length)
								}
								else
								{
									that.find("td").eq(index).removeClass("hide");
								}
								
								/*
								* 与服务器端数据交互
								*/
								//$(parent).dataTable().fnSetColumnVis(index,true)
								// $(datableTable).dataTable().fnSetColumnVis(index,true)
								});
							return false;
							// e.returnValue=false;
						} else {
							if (_this.parents("ul").find("a")
									.not("a[relok='ok']").length <= 1)
								return false;
							else {
								_this.attr("relok", "ok")
								_this.css("background", "none")
								parent.find("tbody tr").each(function() {
									var that = $(this)
								
									_thisH.eq(index).addClass("hide")
									
									if(that.find("td").length<=1){
										that.find("td").attr("colspan",that.parents("table").find("th:visible").length)
									}
									else
									{
										that.find("td").eq(index).addClass("hide");
									}
									//$(parent).dataTable().fnSetColumnVis(index,false)
									// $(datableTable).dataTable().fnSetColumnVis(index,false);
									});
							}
							return false;
						}
						e.returnValue = false;
						e.preventDefault();
						return false;
					})
				})
			}
		}
		catch(e){
			alert(e)
		}
		
		// document上点击的时候 去掉显示的右击显示对象
		$(document).click(function(e) {
			if($(e.target).text()=="显示/隐藏列")
			return;
			if (e.button == 0) {
				$(".rightMenu").hide();
				//$("#grid-table").find("tr.contenttr").removeClass("contenttr")
			}
		})
	}
	/*
		调用这个函数  只刷新当前显示的iframe页面内容
	*/
	function reloadCurIframe(){
		$("body").find("iframe:visible")[0].contentWindow.document.location.reload();
	}

	//文字截取公共函数
	function cutStr(str,num,cutstr){
		var strs=str;
		var nums=num ? num : 30;
		var cutstrs= cutstr ? cutstr : "..."
		if(strs.length > nums){
			strs=strs.substring(0,nums)
			return strs+cutstrs
		}
		else
		return str;
	}
	
	//jquery ajax扩展
	jQuery.extend({
		  fhPost: function(url, param, successCallBack ,errorCallBack,asyncFlag) {
			  var u = url;
		      if(u.indexOf("?")!=-1){
		    	  u = u.substring(0,u.indexOf("?"));
		      }
		      if(typeof(u)=="object"){
		    	  var d = url;
		    	  if(typeof(successCallBack)=="function"){
		    		  successCallBack(d);
		    	  }
		    	  return;
		      }
			  if(u.endWith("mdmRequestCreate.htm") ||u.endWith("Modify.htm") || u.endWith("Update.htm")
					  || u.endWith("Delete.htm") || u.endWith("Add.htm") || u.endWith("Upload.htm")
					  || u.endWith("Insert.htm") || u.endWith("Handler.htm") || u.endWith("Save.htm")){
			      //显示遮罩层
				  showCover("正在处理中，请稍候······");
			  }
			  if(asyncFlag==null){
				  asyncFlag = true;
			  }
		      return jQuery.ajax({
				type : "POST",
				url : url,
				data : param,
				async: asyncFlag,
				complete : function(xmlHttpRequest){
					//隐藏遮罩层
					hideCover();
					//判断对象的状态是交互完成
					if (xmlHttpRequest.readyState == 4) {
						//判断http的交互是否成功
						if(xmlHttpRequest.status == 200){
							var responseBody = xmlHttpRequest.responseText;
							var resultcode = xmlHttpRequest.getResponseHeader("resultcode");
							var resultmessage = decodeURI(xmlHttpRequest.getResponseHeader("resultmessage"));
							if(resultcode>0){
								var data;
								if(""!=responseBody && null!=responseBody && undefined != responseBody){
									//统一对获取机构selelct的响应值做<>替换
									if(u.endWith("orgInfoManage/orgInit.htm")){
										//对响应的json串做html注入处理
										responseBody = responseBody.replaceAll("<","&lt;").replaceAll(">","&gt;");
									}
									//data = eval( "(" + responseBody + ")" );
									data = JSON.parse(responseBody);
								}
								if(typeof(successCallBack)=="function"){
								successCallBack(data,resultcode,resultmessage);
								}
							}else{
								if("-102"==resultcode){
									top.location.href = $(top.document.body).find("#contextPath").val()+"m";
									return false;
								}else if("-1021"==resultcode){
									top.location.href = $(top.document.body).find("#contextPath").val();
									return false;
								}
								else if("-104"==resultcode){
									top.location.href = $(top.document.body).find("#contextPath").val()+"PageRedirect?path=accessRefused.jsp";
									return false;
								}
								else if("-500"==resultcode){
									popWinAlert(resultmessage);
									return false;
								}
								if(typeof(errorCallBack)=="function"){
									errorCallBack(resultcode,resultmessage);
								}
							}
						}else{
							popWinAlert("访问后台数据异常！");
						}
					}
				},
				contentType:"application/json",
				dataType : "json"
			});
		}
	})
//*************************************************************add by lisf********************************************************************
    function loadDepTree(json,jsonBox){
		if(typeof(json)=="object"){
			var topP=[]
			var liStr=""
			for(var i=0; i<json.length;i++ ){
					if(json[i]["parentId"]==0){
					    if(json[i]["isCheck"]==1){
					        liStr+='<li class="aside-item"><input checked type="checkbox" class="tree-chk" value="'+json[i]["depId"]+'" /><a href="javascript:void(0)">'+json[i]["depName"]+'</a>';//</li>'
					    } else {
					        liStr+='<li class="aside-item"><input type="checkbox" class="tree-chk" value="'+json[i]["depId"]+'" /><a href="javascript:void(0)">'+json[i]["depName"]+'</a>';//</li>'
					    }
						
						liStr+=loadDepSubTree(json[i]["depId"],json);
					}
				}
			
			if($("#"+jsonBox)){
				$("#"+jsonBox).append(liStr)
			}
			//绑定点击事件
			bindClick();
		}
	}
	
    function loadDepSubTree(parentId,json){
		var liStr=""
		var childMenu=[]
		for(var j=0;j<json.length;j++)
		{
			if(json[j]["parentId"]==parentId)
			{
				childMenu.push(json[j])
			}
		}
		if(childMenu.length<=0)
		{			
			liStr+='</li>'
			return liStr;	
		}
		liStr='<ul class="sub-navlist">';
		for(var a=0;a<childMenu.length;a++)
		{
		    if(childMenu[a]["isCheck"] == 1){
		        liStr+='<li class="sub-navitem"><input checked type="checkbox" class="tree-chk" value="'+childMenu[a]["depId"]+'" /><a href="javascript:void(0)">'+childMenu[a]["depName"]+'</a>'//</li>'
		    }else{
		        liStr+='<li class="sub-navitem"><input type="checkbox" class="tree-chk" value="'+childMenu[a]["depId"]+'" /><a href="javascript:void(0)">'+childMenu[a]["depName"]+'</a>'//</li>'
		    }
			
			liStr+=loadDepSubTree(childMenu[a]["depId"],json)
		}
		liStr+='</ul>'
		liStr+='</li>'
		return liStr;
		
	}
	
	
	//控制显示类型
	function switchMode(){
		$(".switch-mod").each(function(){
			var _this=$(this)
			_this.find("a").each(function(index){
				$(this).click(function(){
				if(index==0){
					_this.removeAttr("style")
				}
				if(index==1){
					_this.css("background-position","0 0")
				}
				$(".chart-mod").eq(index).show().siblings(".chart-mod").hide();
				return false;
			})
			})
		})
	}
	
	//正常情况下的
	function normalSwitch(){
		$(".normal-switch > a").each(function(index){
			var _this=$(this)
			_this.click(function(){
				_this.addClass("current").siblings("a").removeClass("current");
				$(".chart-mod").first().show().siblings(".chart-mod").hide();
				if(index==$(".normal-switch > a").length-1)
				{
					$(".chart-mod").last().show().siblings(".chart-mod").hide();
				}
				return false;
			})
		})
	}
	normalSwitch();
	
	
	
	
	
	//ajax上传文件扩展
		jQuery.extend({
			  fhPostFileUpload: function(url, param , fileFilter, fileSize, fileId, successCallBack ,errorCallBack) {
				  //显示遮罩层
				  showCover("正在处理中，请稍候······");
			      return jQuery.ajaxFileUpload({
					type : "POST",
					url : url,
					data : param,
					fileFilter:fileFilter,
					fileSize:fileSize,
					secureuri:false,
	                fileElementId:fileId,
	                dataType: 'json',//返回值类型 json
					complete : function(data,status){
					    //隐藏遮罩层
					   // alert(status)
					    //alert(data)
					   // console.log(data)
						hideCover();
						if(status == "success"){
							hideCover();
							var data = data.responseText;
							//if(navigator.userAgent.toLowerCase().indexOf("chrome") != -1){
							//    data=($(data).appendTo("body").hide().html());
							//};
							if(""!=data && null!=data && undefined != data){
								data = eval("(" + data + ")" );
							}
							successCallBack(data);
						}else{
							errorCallBack();
						}
					}
				});
			}
		})

	//替换所有元素
	String.prototype.replaceAll = function(s1,s2) { 
	    return this.replace(new RegExp(s1,"gm"),s2); 
	}
	
	//java endWith
	String.prototype.endWith=function(s){
	    if(s==null||s==""||this.length==0||s.length>this.length){
		    return false;
		}
		if(this.substring(this.length-s.length)==s){
			return true;
		} else{
			return false;
		}
		return true;
	}
	
	//java starWith
	String.prototype.startWith=function(s){
		if(s==null||s==""||this.length==0||s.length>this.length){
			return false;
		}	
		if(this.substr(0,s.length)==s){
			return true;
		}else{
			return false;
		}	
		return true;
	}
	
	
	/**
	 * 特殊字符转换
	 * [["a1","b1"],["a2","b2"]]
	 * arr中的["a1","b1"]代表的是一个特殊字符，其中a1为特殊字符，b1为将要替换成的字符
	 * 如发现其他特殊字符，则往arr里追加，注意arr里的顺序
	 */
	function escapeChar(str){
		var arr = [["\\\\","\\\\"],["\"","\\\""],["\t","    "]];
		str = jQuery.trim(str);
		for(var i=0;i<arr.length;i++){
			str = str.replaceAll(arr[i][0],arr[i][1]);
		}
		return str;
	}	
	
	/**
	 * 转换textarea中的换行符为br，用于详情展示
	 * @param str
	 */
	function escapeTextArea(str){
		str = str.replace("/\r\n/g","<br>");
		str = str.replace("/\r/g","<br>");
		str = str.replace("/\n/g","<br>");
		return str;
	}
	/**
	 * @container  绘制图标的容器ID
	 * @param type 图标类型，必填 line：曲线图，bar：柱状图，area：曲线+区域图，pie：饼图
	 * @param type的值是pie的时候注意点（1.type类型是处在数据返回区域的 如下）
	 	[{
           type: 'pie',
           name: 'Browser share',
           data:  [
                ['Firefox',   45.0],
                ['IE',       26.8],
                ['Chrome',   12.8],
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
            ]
       	}]
       	(2.如果是饼图的话，传入的参数只需要两个container,type,以及datalist)
	 * @param toptitle 图标名称，显示在图标最顶端，可空
	 * @param xtoptitle 图标正上方显示名称，可空
	 * @param ytitle y轴标题，可空
	 * @param xaxisdata 坐标点类型名称集合，eg:[a,b,c]
	 * @param datalist 坐标点数值集合,eg:[{name: '图例名称',data: [1,3,2]}, {name: '图例名称',data: [1,3,2]}]
	 * @param lengend 是否显示提示
	 * @param colors 自定义颜色
	 * @param allowPointSelect 是否允许选中
	 * @param titlestyle 主要针对pie图表 的title样式
	 * @returns
	 */
	function  highchartsprint(container,type,toptitle,xtoptitle,ytitle,xaxisdata,datalist,rotation,lengend,colors,allowpointselect,titlestyle){
		try{
		var retChart;
		if(retChart){retChart.destroy();}
		if(type=="pie"){
			retChart=new Highcharts.Chart({
	            chart: {
	                renderTo: container,
	                plotBackgroundColor: null,
	                plotBorderWidth: 0,
	                plotShadow: false,
	                borderWidth:0
	            },
	             colors : colors !=undefined ? colors : ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', 
   '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
	            title:titlestyle !=undefined && titlestyle != "" ? titlestyle : {
	                text: toptitle
	            },
	            tooltip: {
	            	enabled:true,
	            	headerFormat:'',
	        	    pointFormat: function(){ return '{point.name}: <b>{point.y}</b>'}(),
	            	percentageDecimals: 1
	            },
	            plotOptions: {
	                pie: {
	                    allowPointSelect: allowpointselect!=undefined ? allowpointselect : true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled:  datalist[0].datalabels!= undefined ? datalist[0].datalabels : true,
	                        formatter: function() {
                           		return '<b>'+ this.point.name +'</b> ' ;
                        	}
	                    },
	                    showInLegend: false
	                }
	            },
	            series:[{
                type: 'pie',
                innerSize : datalist[0].innerSize !=undefined ? datalist[0].innerSize : null,
                name: datalist[0].name,
                data: datalist[0].data
            
	            }]
			})
		}
		else
		{
			var rotation=(rotation!=undefined && rotation!=="") ? rotation : 0;
			retChart= new Highcharts.Chart({
		            chart: {renderTo: container,type: type,plotBorderWidth:0, borderWidth:0},
		            title: {text: toptitle,x: -20,style:{fontSize:"16px",color:'#9c9c9c',fontFamily:'microsoft yahei'} },
		            colors : colors !=undefined ? colors : ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', 
   '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
		            subtitle: {text: xtoptitle,x: -20},
		            xAxis: {
		            			showEmpty:false,
		            			categories: eval(xaxisdata),
		            			labels:{
		            				rotation:rotation,
		            				useHTML:true,
		            				style:{
		            					paddingTop:'5px',
		            					fontSize:"14px",
		            					color:'#9c9c9c'
		            				}
		            			}
		            		},
		            yAxis: {
		            	min:0,
		            	allowDecimals:false,
		                title: {text: ytitle},
		                labels:{
		                	step:1
		                },
		                plotLines: [{value: 0,width: 1,color: '#808080'}]
		            },
		            tooltip: {formatter: function() {return '<b>'+ this.series.name +'</b><br/>'+this.x +': '+ this.y;}},
		            legend: { enabled:lengend!=undefined ? lengend : true},
		            series: eval(datalist)
		        });
	       }
	        return retChart;
	      }
	      catch(e){
	      	alert(e);
	      }
		}
		
function  pieChartCommon(container,type,toptitle,xtoptitle,ytitle,xaxisdata,datalist,rotation){
		var retChart=new HighCharts.Chart({
           chart: {
               renderTo: container,
               plotBackgroundColor: null,
               plotBorderWidth: null,
               plotShadow: false,
               type:type
           },
           title: {
               text: toptitle
           },
           tooltip: {
       	    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
           	percentageDecimals: 1
           },
           plotOptions: {
               pie: {
                   allowPointSelect: true,
                   cursor: 'pointer',
                   dataLabels: {
                       enabled: true
                   },
                   showInLegend: true
               }
           },
           series: eval(datalist)
	})
	return retChart;
}		
		/*
			@descript: 表单重置公共
			@param formId：需要重置表单的ID
		*/
		function resetForm(formId){
			if($("#"+formId) && $("#"+formId).length>0)
			{
				$("#"+formId).find(".error").not("label.error").each(function(){
					var _this=$(this)
					_this.removeClass("error").css("border","1px solid #ccc").addClass("valid")
					//_this.find("input,textarea").rules("remove")
					_this.unbind("mousemove").hover(function(){return;}).removeClass("error").css("border","1px solid #ccc").focusin(function(){return false;}).focusout(function(){return false;});
				})
				$("#"+formId).find("label.error").remove();
				$("#"+formId).validate().resetForm();
				
			}
			
			
		}
		
		//根据传入的key获取cookie中的值
		function customPreferenceLoad(name){
			var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		    if(arr != null && arr != "" && arr != undefined){  
			    return unescape(arr[2]);
		    }
		    return "";
		}

		
		//个人偏好信息设置cookie
		function customPreferenceSet(name,value){
			//设置偏好
			if(undefined != value && ""!=value && null!=value){
			    var Days = 30; //此 cookie 将被保存 30 天
				var exp  = new Date(); //new Date("December 31, 9998");
				exp.setTime(exp.getTime() + Days*24*60*60*1000); 
				document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
			}
		}
		
		//个人偏好信息设置cookie
		function customPreferenceDelete(name){
		    var Days = 31; //此 cookie 将被保存 30 天
			var exp  = new Date(); //new Date("December 31, 9998");
			exp.setTime(exp.getTime() - Days*24*60*60*1000); 
			document.cookie = name + "=a;expires=" + exp.toGMTString();
		}
		
	
		//公共函数调用，表格列的显示与隐藏
		/*
		* index:表示传入的第几列
		* hide： 表示页面初始化的时候就是隐藏的状态
		*/
		function controlCol(index,hide){
			var rightMenu=$(".rightMenu") && $(".rightMenu").length>0 ? $(".rightMenu") : "";
			var reclass=""
			if(hide){
				reclass=(rightMenu!="" ? (rightMenu.find("a").eq(index).attr("relok")=="ok" ? "hide" : "") : "hide")
			}
			else
			{
				reclass=(rightMenu!="" ? (rightMenu.find("a").eq(index).attr("relok")=="ok" ? "hide" : "") : "")
			}
			return reclass;
		}
		
		
		/*公共转义方法*/
		function hereDoc(f) {
			//alert(f)
			//alert(f.toString().replace(/\/\*/, '').replace(/\*\//, ''))
		    return f.toString().replace(/\/\*/, '').replace(/\*\//, '');
		}		
		function escapeChar_(str){
			var arr = [["<","&lt;"],[">","&gt;"]];
			str = jQuery.trim(str);
			for(var i=0;i<arr.length;i++){
				str = str.replaceAll(arr[i][1],arr[i][0]);
			}
			return str;
		}		
	/*设备策略管理相关公共函数*/
	//拼json数据字符串
	function mergeFormParams(formId)
	{
		var retJson={}
		if($("#"+formId) && $("#"+formId).length>0){
			var form=$("#"+formId)
			//找模块
			var formSubObj='{'
			form.find(".main-item").each(function(){
				var item=$(this)
				var itemKey=item.attr("key")
				var subitem=item.find(".tempbd-item")
				//遍历子集
				for(var i=0;i<subitem.length;i++){
					var subitemForm=subitem.eq(i).find("input,textarea")
					if(subitemForm.length<=0){
						continue;
					}
					var formObj='{'
					for(var f=0; f<subitemForm.length;f++){
						var attr_name=$(subitemForm[f]).attr("name");
							if (attr_name != undefined && attr_name != null
									&& attr_name.length > 0
									&& attr_name.indexOf("undefined_") == -1
									&& attr_name.indexOf("checkbox_")==-1) {
								formObj += '"' + attr_name + '":"'
										+ $(subitemForm[f]).val() + '",'
								// formObj[$(subitemForm[f]).attr("name")]=$(subitemForm[f]).val();
							}
					}
					formObj=formObj.slice(0,-1)
					formObj+='}';
					formSubObj+='"'+[itemKey+i]+'":'+formObj+','
				}
			})
		formSubObj=formSubObj.slice(0,-1)
		formSubObj+='}'
		return formSubObj;
			
		}
	}
	
	//进度条模块插件
	//参数格式：12/45
	//unit:显示数据的单位
	$.fn.processPlugin=function(data,unit){
		var _this=$(this);
		if(data && data!=""){
			var left=data.split("/")[0];
			var all=data.split("/")[1];
			var used = all - left;
			var percent=((used/all)*100).toFixed(0)+"%"
			var unit=unit ? unit : "G";
			var percentNum=((used/all)*100).toFixed(0);
			var bgcolor="background:"+ (percentNum>=90 ? "#f00" : "#77B94E");
			
			if(left-1<0){
				left = left * 1024 + "M";
			}else{
				left = left + "G";
			}
			
			if(all-1<0){
				all = all * 1024 +"M";
			}else{
				all = all + "G";
			}
				
			var box='<div class="data-box"><div class="data-inner" style="width:'+percent+';'+bgcolor+'"></div></div><div class="data-text" style="display:inline-block;">&nbsp;剩'+left+'&nbsp;|&nbsp;共'+all+'</div>';
			if(_this.find(".data-box") && _this.find(".data-box").length>0){
				
			}
			else
			{
				_this.html(box);
			}
		}
	}
	//开关插件前端模块 
	$.fn.switchPlugin=function(data){
		var _this=$(this)
			//1表示开启
			var domSwitch='<div class="switch-box">'
			if(data=="1"){
				domSwitch+='<img src="../images/icon/on.png" />'
			}else if(data=="0")
			{   //0表示关闭
				domSwitch+='<img src="../images/icon/off.png" />'
			}
			else
			{
				domSwitch+='未知'
			}
			domSwitch+='</div>';
			if(_this.find(".switch-box") && _this.find(".switch-box").length>0){}
			else
			{
				_this.html(domSwitch)
			}
	}
	
	//添加点击 显示帮助内容模块
	showHelpBox();
	function showHelpBox(){
		$(".help-btn").each(function(){
			var $this=$(this)
			$this.click(function(){
				//var top=$this.offset().top+document.documentElement.scrollTop;
				var top=20;
				var left=$this.offset().left+$this.outerWidth(true);
				//解决火狐下td里面
				//if(navigator.userAgent.toLowerCase().indexOf("firefox")>-1 || navigator.userAgent.toLowerCase().indexOf("msie")>-1){
					//$this.next(".help-cons").css({"left":left+"px","top":$this.offset().top+"px"}).show();
				//}
				//else
				//{
					$this.next(".help-cons").css({"left":left+"px","top":top+"px"}).show();
				//}
			})
		})
		$(".help-close").each(function(){
			$(this).click(function(){
				$(this).parents(".help-cons").hide();
			})
		})
	}
	
	//图片滚动模块,插件
	/*
	* Author:LN(lining)
	*Date:2013-12-26
	*Desceipt:判断图片模块,图片模块个数超过一定的个数  就添加滚动效果
	*Attentions：1.调用的是ul > li 的格式
	*/
	$.fn.fixedScrollContainer=function(options){
		var that=$(this)//当前调用插件的就是li的父容器 ul
		//每次调用前先删除插件调用 还原原始状态
		that.parents(".ln-wrapoutbox").find(".scroll-l").remove();
		that.parents(".ln-wrapoutbox").find(".scroll-r").remove();
		if(that.parent(".ln-wrapbox").parent(".ln-wrapoutbox").length>=1){
			that.parent(".ln-wrapbox").unwrap();
		}
		if(that.parent(".ln-wrapbox").length>=1){
			that.unwrap();
		}
		if(that.siblings(".ln-btn-shadow-l,.ln-btn-shadow-r").length>=1){
			that.siblings(".ln-btn-shadow-l,.ln-btn-shadow-r").remove();
		}
		that.wrap("<div class='ln-wrapbox clearfix' style='overflow:hidden;'></div>")
		that.parent(".ln-wrapbox").wrap("<div class='ln-wrapoutbox clearfix'></div>")
		var defaultOptions={
			"cycle":false //是否左右按键的时候循环显示，默认不循环
			//"width":"195",//单独对象li的宽度
			//"height":"325"//单独对象li的高度
		}
		that.css("width",(that.find("li:first").outerWidth(true))*(that.find("li").length))
		var settings=$.extend({},defaultOptions,options)
		var cycle=settings.cycle;//判断是否是循环；
		var parentBoxW=that.parent(".ln-wrapbox").outerWidth();
		var childLiW=that.find("li:first").outerWidth(true);
		//计算能显示几个
		var liLen=Math.floor(parentBoxW/childLiW)
		var realLiLen=that.find("li").length;
		//获取剩余的空隙
		var leftedSize=parentBoxW-liLen*(that.find("li:first").outerWidth(true))
		var liMargin=Math.floor(leftedSize/2)+1
		var plusLen=realLiLen-liLen;
		var curSingleCycleIndex=0
		that.parent(".ln-wrapbox").css("margin","0px "+liMargin+"px")
		
		//如果小于的话 就要添加滚动条
		if(liLen<realLiLen){
			//添加的阴影
			var shadow='<span class="ln-btn-shadow-l"></span>'
			var shadow2='<span class="ln-btn-shadow-r"></span>'
			var scrollL='<span class="scroll-l"></span>'
			var scrollR='<span class="scroll-r"></span>'
			that.parents(".ln-wrapoutbox").append(scrollR)
			that.parents(".ln-wrapoutbox").prepend(scrollL)
			that.parents(".ln-wrapoutbox").prepend(shadow)
			that.parents(".ln-wrapoutbox").append(shadow2)
			that.parents(".ln-wrapoutbox").find(".ln-btn-shadow-l,.ln-btn-shadow-r").css("opacity","0.6");
		}
		else{
			if(that.parent(".ln-wrapbox").parent(".ln-wrapoutbox").length>=1){
			that.parent(".ln-wrapbox").unwrap();
			}
			if(that.parent(".ln-wrapbox").length>=1){
				that.unwrap();
			}
		}
		that.animate({"margin-left":"0px"},500);
		var curIndex=0;
		
		//向左，第一个跑到最后一个
		var liFiW=that.find("li:first").outerWidth(true)
		that.parents(".ln-wrapoutbox").find(".scroll-l").click(function(){
			that.parents(".ln-wrapoutbox").find(".ln-btn-shadow-r").hide();
			var _this=$(this)
			that.parents(".ln-wrapoutbox").find(".ln-btn-shadow-l").show();
			if(cycle){
				that.parent(".ln-wrapbox").find("ul").find("li:last").prependTo(that.parent(".ln-wrapbox").find("ul"))
				that.parent(".ln-wrapbox").find("ul").css("margin-left","-"+liFiW+"px")
				that.parent(".ln-wrapbox").find("ul").animate({
					"margin-left":"0px"
				},500,function(){
					that.parent(".ln-wrapbox").find("ul").css("margin-left","0")
					that.parents(".ln-wrapoutbox").find(".ln-btn-shadow-l").hide();
				})
			}
			else
			{
				var curMargR=that.parent(".ln-wrapbox").find("ul").css("marginLeft").slice(0,-2)
				curSingleCycleIndex-=1;
				if(curSingleCycleIndex<0){
					curSingleCycleIndex=0;
					//that.parents(".ln-wrapoutbox").find(".ln-btn-shadow-l").show();
					return;
				}
				that.parent(".ln-wrapbox").find("ul").animate({
					"margin-left":parseInt(liFiW)+parseInt(curMargR)+"px"
				},500,function(){
					if(curSingleCycleIndex == 0){
						that.parents(".ln-wrapoutbox").find(".ln-btn-shadow-l").show();
					}else{
						that.parents(".ln-wrapoutbox").find(".ln-btn-shadow-l").hide();
					}
				})
				
			}
			
		})
		//向右,最后一个跑到第一个
		that.parents(".ln-wrapoutbox").find(".scroll-r").click(function(){
			that.parents(".ln-wrapoutbox").find(".ln-btn-shadow-l").hide();
			var _this=$(this)
			that.parents(".ln-wrapoutbox").find(".ln-btn-shadow-r").show();
			if(cycle){ //循环
				that.parent(".ln-wrapbox").find("ul").animate({
					"margin-left":"-"+liFiW+"px"
				},500,function(){
					that.parent(".ln-wrapbox").find("ul").find("li:first").appendTo(that.parent(".ln-wrapbox").find("ul"))
					that.parent(".ln-wrapbox").find("ul").css("margin-left","0")
					that.parents(".ln-wrapoutbox").find(".ln-btn-shadow-r").hide();
				})
			}
			else
			{//不循环
					var curMargL=that.parent(".ln-wrapbox").find("ul").css("marginLeft").slice(0,-2)
					curSingleCycleIndex+=1;
					if(curSingleCycleIndex > plusLen)
					{
						curSingleCycleIndex=plusLen
						//that.parents(".ln-wrapoutbox").find(".ln-btn-shadow-r").show();
						return;
					}
					//console.log(that.parent(".ln-wrapbox").find("ul").queue())
					that.parent(".ln-wrapbox").find("ul").queue();
					that.parent(".ln-wrapbox").find("ul").animate({
						"margin-left":parseInt("-"+parseInt(liFiW))+parseInt(curMargL)+"px"
					},500,function(){
						if(curSingleCycleIndex == plusLen){
							that.parents(".ln-wrapoutbox").find(".ln-btn-shadow-r").show();
						}else{
							that.parents(".ln-wrapoutbox").find(".ln-btn-shadow-r").hide();
						}
					})
			}
		})
	}
	
    //统计分析中监控ajax请求session超时的处理
	$.ajaxSetup({
	    contentType:"application/x-www-form-urlencoded;charset=utf-8",
	    complete:function(XMLHttpRequest,textStatus){
	      try{
	        var responseText=XMLHttpRequest.responseText;
	        if(responseText != null && "" != responseText){
	        	responseText = eval("(" + responseText + ")");
	        	if(responseText.code=="1021")
	        	{
	        		window.top.location.replace("PageRedirect?path=login.jsp");
	        	}
	        }
	      }catch(e){}
	    }
	  });
	
	//页面树形根据关键字模糊匹配，静态的，不走后台
	function searchTreeNode(treeULId,obj){
		if(""!=obj.value){
			//先设置所有li ul为hide
			$("#"+treeULId).find("li").hide();
			$("#"+treeULId).find("ul").hide();
			$("#"+treeULId).find("a").css("background-color","");
			$("#"+treeULId).find("span[class*=tree-normal]").removeClass("tree-open");
			
			//根据关键字找出所有匹配的节点的li的id
			var as = $("#"+treeULId).find("a:contains("+obj.value+")");
			$(as).each(function(i,d){
				var liId = $(d).parent().attr("id");
				//显示当前节点
				$("#"+liId).show();
				//找到当前节点的所有父，并show
				upFindParentId(treeULId,$(d).attr("id"));
				//如果当前节点有子部门，则显示
				$("#"+liId).children("span[class*=tree-normal]").addClass("tree-open");
				$("#"+liId).next("ul").show();
				$("#"+liId).next("ul").find("li").show();
				
				//匹配到的节点，背景高亮
				$(d).attr("style","background-color:yellow");
			});
		}else{
			//一层根节点的li显示
			$("#"+treeULId).find("li").show();
			$("#"+treeULId).find("a").css("background-color","");
		}
	}
	
	//递归找出节点的所有父,把所有的父节点显示show
	function upFindParentId(treeULId,sId){
		var li_id = $("#"+treeULId+" li[id^="+sId+"]").attr("id");
		if(li_id){
			var sId = li_id.split("_")[2];
			upFindParentId(treeULId,sId);
		}
		$("#"+treeULId+" li[id^="+sId+"]").show();
		
		$("#"+treeULId+" li[id^="+sId+"]").children("span[class*=tree-point]").addClass("tree-open");
		$("#"+treeULId+" li[id^="+sId+"]").next("ul").show();
	}
	/*
		var b=["1","2","3","4","5","6"]
		alert(b.indexOf("5"))
		alert(b.splice(4,1))
		alert(b)
	*/
	//ios 策略模块 checkbox绑定事件
	function iosWifiCredential(){
		$(".credential-list").each(function(){
			var $this=$(this)
			var $thisVals=[]
			$this.find("input:checkbox").each(function(){
				var that=$(this)
				that.change(function(){
					var relkey=that.siblings("input:hidden").attr("rel");
					if(that.is(":checked")){
						$thisVals.push(relkey)
					}
					else{
						//删除数组中某个对应的数值
						var keyIndex=$thisVals.indexOf(relkey)
						if(keyIndex>=0){
							//删除指定的值
							$thisVals.splice(keyIndex,1);
						}
					}
				that.parents(".credential-list").eq(0).prev("input.PayloadCertificateAnchorUUID:hidden").val($thisVals.join(","))
				})
			})
		})
	}
