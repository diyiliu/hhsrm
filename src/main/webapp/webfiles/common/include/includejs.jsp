<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
    String skinPath = path+"/webfiles/common/skin";
    String webfilesPath = path+"/webfiles";
%>
<link type="text/css" rel="stylesheet" href="<%=path %>/webfiles/common/js/jquery/easyui/themes/default/easyui.css"/>
<link type="text/css" rel="stylesheet" href="<%=path %>/webfiles/common/js/jquery/easyui/themes/icon.css"/>
<link type="text/css" rel="stylesheet" href="<%=skinPath %>/css/jquery_plugin.css" />
<link type="text/css" rel="stylesheet" href="<%=skinPath %>/css/common.css" />
<link rel="stylesheet" type="text/css" href="<%=skinPath%>/css/main_form.css" />
<script type="text/javascript">
if(window.navigator.userAgent.indexOf("Chrome") != -1){
   document.write("<link rel='stylesheet' type='text/css' href='<%=skinPath %>/css/chrome.css' />");
}
</script>
<script type="text/javascript" src="<%=path %>/webfiles/common/js/jquery/easyui/jquery-1.7.1.js"> </script>
<script type="text/javascript" src="<%=path %>/webfiles/common/js/jquery/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=path %>/webfiles/common/js/jquery/easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript"  src="<%=path %>/webfiles/common/js/lhgdialog/lhgdialog.min.js"></script>
<script type="text/javascript"  src="<%=path %>/webfiles/common/js/fh.dialog.js"></script>
<script type="text/javascript" src="<%=path %>/webfiles/common/js/style.js"></script>
<script type="text/javascript" src="<%=path %>/webfiles/common/js/commonoperate.js" ></script>