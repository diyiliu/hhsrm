<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<html class="logobg">
<head>
    <title>淮海控股</title>
    <link type="text/css" rel="stylesheet" href="${path}/common/css/allnew.css"/>
</head>
<body class="logobg">
<div class="bg-login-c"></div>
<div class="login-box">
    <img class="logo2" id="manageLoginLogo" src="${path}/common/images/meeting/logo/logo.png"/>
    <div class="login-box-l"></div>
    <div class="login-box-c">
        <div class="login-form">
            <form id="loginForm" name="loginForm" method="post" action="index.html">
                <input type="hidden" id="json" name="json" value="">
                <ul class="form-list">
                    <li class="form-item">
                        <span class="login-label">用户名</span>
                        <input type="text" value="${j_username }" id="username" name="j_username" class="login-text"/>
                    </li>
                    <li class="form-item">
                        <span class="login-label">密　码</span>
                        <input type="password" id="password" name="j_password" class="login-text"/>
                    </li>
                    <li class="form-item">
                        <span class="login-label">验证码</span>
                        <input type="text" id="rand" name="rand" class="login-text vali-text" maxlength="4"/>
                        <img src="${path}/kaptcha.htm" class="vali-img" style="cursor: pointer;" id="kaptchaImage"
                             onclick="refreshKaptcha()"/>
                    </li>
                    <li class="form-item check-item">
                        <span class="login-label">&nbsp;</span>
                        <label><input type="checkbox" name="rememberName" id="rememberName" ${check } />记住账号</label>
                    </li>
                    <li class="form-item">
                        <span class="login-label" style="width:11px;margin-right:0px;">&nbsp;</span>
                        <button type="button" class="login-btn" id="loginBtn"></button>
                    </li>
                </ul>
            </form>
        </div>

    </div>
    <div class="login-box-r"></div>
</div>
<script type="text/javascript" src="${path}/common/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="${path}/common/js/framenew.js"></script>
<script type="text/javascript" src="${path}/common/js/base64.js"></script>
<script type="text/javascript" src="${path}/common/js/lhgdialog/lhgdialog.min.js"></script>
<script type="text/javascript" src="${path}/common/js/fh.dialog.js"></script>
<script type="text/javascript" src="${path}/common/js/common.js"></script>


<script type="text/javascript">
    $(document).ready(function () {
        $("#loginBtn").click(function () {
            checkInput();
        });
        var state = '${state}';
        if (state == 'noLogin') {
            if (window != top) {
                top.location.href = window.location.href;
            }
        }
        $("#username").focus();
        $("#username").bind('keydown', 'return', function (event) {
            if (event.keyCode == 13) {
                $("#password").select();
            }
        });
        $("#password").bind('keydown', 'return', function (event) {
            if (event.keyCode == 13) {
                $("#rand").select();
            }
        });
        $("#rand").bind('keydown', 'return', function (event) {
            if (event.keyCode == 13) {
                $("#rand").blur();
                checkInput();
            }
        });
    });

    function refreshKaptcha() {
        $("#kaptchaImage").attr("src", "${ctx}/kaptcha.htm?" + Math.floor(Math.random() * 100));
    }

    function checkInput() {
        if ($("#username").val() == "") {
            fh.alert('请输入用户名!', false, function () {
                $("#register").removeAttr("disabled");
                $("#username").focus();
            });
        } else if ($("#password").val() == "") {
            fh.alert('请输入密码!', false, function () {
                $("#password").focus();
            });
        } else if ($("#rand").val().length != 4) {
            fh.alert('请输入正确的验证码!', false, function () {
                $("#rand").select();
                $("#rand").focus();
            });
        } else {
            $.ajax({
                type: "POST",
                url: "${path}/login.htm",
                data: "username=" + $("#username").val() + "&password=" + $("#password").val() + "&rand=" + $("#rand").val(),
                dataType: "json",
                success: function (msg) {
                    if (msg.success){
                        window.location.href = "${path}" + msg.redirectURL;
                    }else if (msg.errorCode == "1") {
                        fh.alert('验证码错误，请重新输入！', false, function () {
                            $("#rand").select();
                        });
                    } else if (msg.errorCode == "2") {
                        fh.alert(msg.errorMsg, false, function () {
                            $("#rand").val("");
                            $("#username").select();
                        });
                    } else {
                        fh.alert(msg.errorMsg, false, function () {
                        });
                    }
                    refreshKaptcha();
                }
            });
        }
    }
</script>
</body>
</html>