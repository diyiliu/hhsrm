<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/common/include/includejs.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<body style="overflow: hidden">  
<script type="text/javascript">
var id = $(window.frameElement).attr("id");
fh.alert('报表内容为空，请重新填写查询条件！',false,function(){
    if(id!='showReportFrame'){
        history.back();
    }
});
</script>
    </body>
</html>
