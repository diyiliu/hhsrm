<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%
	String webRoot = request.getContextPath();
%>

<link type="text/css" rel="stylesheet" href="<%=webRoot %>/common/js/umeditor/themes/default/css/umeditor.css">
<script type="text/javascript">
	var webRoot="<%=webRoot %>";
</script>
<!-- <script type="text/javascript" src="<%=webRoot %>/common/js/umeditor/third-party/jquery.min.js"></script> -->
<script type="text/javascript" charset="utf-8" src="<%=webRoot %>/common/js/umeditor/umeditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="<%=webRoot %>/common/js/umeditor/umeditor.min.js"></script>
<script type="text/javascript" src="<%=webRoot %>/common/js/umeditor/lang/zh-cn/zh-cn.js"></script>