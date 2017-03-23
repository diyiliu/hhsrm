<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<html>
  <head>
   <style type="text/css">
   		body{margin:0px;padding:0px}
		.welcome{width:100%;height:100%;background:url(${path}/webfiles/common/skin/images/main/welcome.jpg) no-repeat center center;}
	</style>

  </head>
  
  <body>
    <div class="welcome"></div>
  </body>
</html>
