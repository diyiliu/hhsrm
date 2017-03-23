<%@ page contentType="application/uixml+xml;charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>	
	
	var haveUpFile=false; <%-- 是否有上传附件--%>
	var postion_ctrl_id="";
	var customer_ctrl_id="";
	<%-- 清空弹出框控件中的数据 --%>
	function delChooseData(id,name){				
		document.getElementById(id).value="";
		var ele = document.getElementById(name);
		if(ele.type && ele.type=="text")
			ele.value="";
		else
			ele.innerHTML="请点击选择";
	}
	<%-- 判断某个字段的输入是否非法,本函数名不要改动--%>
	function invalid(ctrlId,fieldDesc,reqired,minlen,maxlen,regxp,errTip){
		var ele = document.getElementById(ctrlId);
		if(ele)
		{
			<%-- 下拉框判断--%>
			if(ele.type=="select-one")
			{
				var selectValue = ele.options[ele.selectedIndex].value;
				if (reqired && !selectValue){
					alert("请选择"+fieldDesc,"提示");
					return 1;
				}else{
					return 0;
				}
			}
			var content = ele.value;
			if (reqired){
				content = trim(content);
				if(!content){
					if(ctrlId==postion_ctrl_id)
						alert("正在定位，请等待定位成功后再试！","提示");
					else if(ele.type=="hidden")
						alert("请选择"+fieldDesc,"提示");
					else
						alert("请输入"+fieldDesc,"提示");
						
					return 1;
				}
				
			}
			if(content)
			{
				if(ele.name.indexOf('upFileMap')>=0){
					haveUpFile=true;
				}else{
					if(content.length<minlen || content.length>maxlen){
						var msg ="";
						if(minlen==maxlen)
							msg = fieldDesc+"内容长度应为"+minlen+"位!";
						else
							msg = fieldDesc+"内容长度应在"+minlen+"到"+maxlen+"之间!";
						alert(msg,"提示");
						return 1;
					}
					if(regxp!=''){
						if(!regxp.test(content)){
							if(errTip!='')
								alert(fieldDesc+"格式不正确!"+errTip,"提示");
							else
								alert(fieldDesc+"格式不正确!","提示");
							return 1;
						}
					}
				}
			}
		}else
		{
			//may be checkBox
			var selectItems= document.getElementsByName(ctrlId);		
			if(selectItems && reqired)
			{
				var hasValue = false;
				for(i=0;i<selectItems.length;i++){
					if(selectItems[i].checked){
						hasValue = true;
						break;
					}
				}
				if(!hasValue)
				{
					alert("请选择"+fieldDesc,"提示");
					return 1;
				}
			}
		}
		return 0;
	}
	
	function trim(str){
		if(str)
	     	return str.replace(/(^\s*)(\s*$)/g,'');
	     else
	     	return "";
	}
	
	<%--自定义消息确认后的操作--%>
     function AlertOk() {
    <%--
		if(haveUpFile){
			confirm("照片或文件上传时需要占用较大流量，是否继续？",doCfmOP);
		}else{
			doCfmOP();
		}
	--%>
		doCfmOP();
     }
     <%--附件上传占流量确认后的操作--%>
	 function doCfmOP(){
	 	if(postion_ctrl_id!="" ){
			safeStopGPS();
		}
		<%--记住最近选择的客户--%>
	 	if(customer_ctrl_id!="" ){
			var cusId = document.getElementById(customer_ctrl_id).value;
			if(cusId){
				recordRecentCustomer(cusId);
			}
		}
					
		if(opReqType=="get"){
			if(cfmOpenMethod=="_self"){
				window.open(cfmAction,false,false);
			}else{
				window.open(cfmAction,true,false);
			} 
		}else{
	     	var myForm=document.getElementById("edit_form");
			myForm.action = cfmAction;
			myForm.target = cfmOpenMethod;
			myForm.submit();		
		}
	 }
	<%--返回操作确认--%> 		
	function confirmReturn(){
		confirm("确认离开当前页面吗?",doReturnAction);
	}
	function doReturnAction()
	{
	 	if(postion_ctrl_id!="" ){
			safeStopGPS();
		}	
		<s:if test='xmapReturnAction eq "script:close"'>
			close();
		</s:if>	
		<s:else>
			window.open("<s:property value="%{xmapReturnAction}"/>",false,false);
		</s:else>
		
	}
	<%--在地图上显示坐标--%> 	
	function showLocOnMap(lat,lon,addr){		
		var paramArr = new Array(lat,lon,addr);
		window.setArraySession('locInfo',paramArr);
		openPage("http://IORDER_URL/platform/gaea/showLocOnMap.jsp", "showLocOnMap_v2.xhtml");
	}	