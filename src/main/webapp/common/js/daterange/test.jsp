<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="/include_new/include.jsp" %>
		<script type="text/javascript" src="/common_new/component/daterange/daterange.js"></script>
	</head>
	<body>
		<s:component theme="daterange" templateDir="/common_new/component" template="daterange.jsp">
			<%-- 用于绑定的隐藏域名称--开始日期 --%>
			<s:param name="startDate">conditions.startTime</s:param>
			<%-- 用于绑定的隐藏域名称--结束日期 --%>
			<s:param name="endDate">conditions.endTime</s:param>
			<%-- 默认选择日期类型－－today:今天，yesterday：昨天，week：最近７天，month：最近３０天 --%>
			<s:param name="ds">yesterday</s:param>
			<!-- 指定日期区间(与ds互斥) -->
			<s:param name="range">{startDate:'2013-12-16',endDate:'2013-12-22'}</s:param>
			<%-- 用于绑定的隐藏域名称--数据刷新回调（组件会将区间的开始与结束日期用ＪＳＯＮ形式回带给调用者，key分别为startDate,endDate） --%>
			<s:param name="handle">reloadData</s:param>
		</s:component>
	</body>
	<SCRIPT type="text/javascript">
		/**
		 * 回调
		 * @param data 将区间的开始与结束日期以ＪＳＯＮ形式回带给调用者（key分别为startDate,endDate）
		 */
		function reloadData(data){
			alert("调用了reloadData({startDate:"+data.startDate+",endDate:"+data.endDate+"})函数");
		}
	</SCRIPT>
</html>
			
		
