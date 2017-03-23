<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="select-btn">
	<a id="prev" class="previous" title="向前" href="javascript:;" onclick="$(this).daterange({reloadDataHandle:${parameters.handle}})">&nbsp;</a>
	<a id="next" class="next" title="向后" href="javascript:;" onclick="$(this).daterange({reloadDataHandle:${parameters.handle}})">&nbsp;</a>
</div>
<div class="day">
	<ul>		
			<li id="today" class='${(parameters.ds == null||parameters.ds=="today")&& parameters.range == null ? "selected":""}' onclick="$(this).daterange({reloadDataHandle:${parameters.handle}})"><a info="1">今日</a></li>
			<li id="yesterday" class='${parameters.ds =="yesterday" && parameters.range == null ? "selected" : ""}' onclick="$(this).daterange({reloadDataHandle:${parameters.handle}})"><a info="-1">昨日</a></li>
			<li id="week" class='${parameters.ds =="week" && parameters.range == null ? "selected" : ""}' onclick="$(this).daterange({reloadDataHandle:${parameters.handle}})"><a info="7">最近7日</a></li>
			<li id="month" class='${parameters.ds =="month" && parameters.range == null ? "selected" : ""}' onclick="$(this).daterange({reloadDataHandle:${parameters.handle}})"><a info="30">最近30日</a></li>
			<li>
				<input type="text" id="calendar" range="${parameters.range}" handler="${parameters.handle}" class="day-selector"/>
				<input type="hidden" id="startTime" name="${parameters.startDate}"/>
				<input type="hidden" id="endTime" name="${parameters.endDate}"/>
			</li>
	</ul>
</div>

