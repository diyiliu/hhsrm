<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <title>淮海控股</title>
    <link rel="stylesheet" type="text/css" href="${path}/common/css/all.css"/>
    <link rel="stylesheet" type="text/css" href="${path}/common/css/layout.css"/>
    <link rel="stylesheet" type="text/css" href="${path}/common/js/ztree/zTreeStyle.css"/>

    <style type="text/css">
        .ui-menu li a {
            background: url("${path}/common/images/main/bg-menu-tit.png") repeat-x left -30px;
            cursor: pointer;
        }

        .ui-menu li a {
            width: 100%;
            height: 28px;
            line-height: 28px;
            display: block;
            position: relative;
            float: left
        }

        .ui-menu li a span {
            background: none;
            padding-left: 10px;
            color: #828C96;
            margin-left: 20px;
        }

        .ui-menu li.sel span {
            color: #F6F9FC;
        }

        .ui-menu li.sel a {
            font-weight: 700;
            background: url(${path}/common/images/main/bg-menu-tit-selected.png) repeat-x left -30px;
            cursor: pointer;
        }

        .ui-menu li.sel li a span.ico_docu {
            vertical-align:middle;
            background: url('${path}/common/js/tree/images/tree/menu-r.png') no-repeat;
        }

    </style>
</head>
<body class="layoutbody">

<div style="position: absolute;
					height:50px;
					margin-left:10px;
					background-color:transparent;
					z-index:10;
					text-align:center;">
    <img style="height: 50px;"
         src="${path}/common/images/meeting/logo/logo2.png"/>
</div>
<div class="ui-layout-north">
    <div id="top_menu">
        <div class="login-info clear"></div>
        <div class="nav fr" style="margin-right: 15px;">
            <ul>
                <li><a href="javascript:showPortal();" class="logout"
                       title="我的首页"></a></li>
                <li><a href="javascript:changePassword();" class="password"
                       title="修改密码"></a></li>
                <li><a href="javascript:logonOff();" class="exit"
                       title="安全退出"></a></li>
            </ul>
        </div>
    </div>
</div>
<div class="ui-layout-west">
    <ul id="menuTree" class="ui-menu"></ul>
</div>
<div class="ui-layout-center">
    <span id="Js_Tabpre" class="tabpre"></span>
    <span id="Js_Tabnext" class="tabnext"></span>
    <div class="lnui-tabs" id="Js_LnTabCon" size="10">
        <div id="tab1" class="contenbox" title="我的首页"
             tabImg="${path}/common/images/icon/tablist.png" closable="false" href="${path}/welcome.jsp">
        </div>
    </div>
</div>
<div class="ui-layout-south">
    <div class="version">
        Copyright 2017
    </div>
    <div class="copyright">
        淮海控股集团有限公司
    </div>
</div>
<!--tab 右击菜单-->
<div id="Js_tabContextMenu" class="rightMenu bodyMenu hide">
    <ul>
        <li>
            <a href="" id="Js_refreshCur">刷新当前页</a>
        </li>
        <li>
            <a href="" id="Js_closeCur">关闭当前页</a>
        </li>
        <li>
            <a href="" id="Js_closeOther">关闭其他页</a>
        </li>
        <li>
            <a href="" id="Js_closeAll">关闭所有页</a>
        </li>
    </ul>
</div>
<!-- drag depend on ui js -->
<script type="text/javascript" src="${path}/common/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="${path}/common/js/jquery-ui.js"></script>
<script type="text/javascript" src="${path}/common/js/jquery.layout.js"></script>
<script type="text/javascript" src="${path}/common/js/frame.js"></script>
<script type="text/javascript" src="${path}/common/js/ztree/jquery.ztree.core-3.5.js"></script>

<!-- dialog 相关js -->
<script type="text/javascript" src="${path}/common/js/lhgdialog/lhgdialog.min.js"></script>
<script type="text/javascript" src="${path}/common/js/fh.dialog.js"></script>
<script type="text/javascript" src="${path}/common/js/common.js"></script>
<script type="text/javascript" src="${path}/common/js/FhFormSerializer.js"></script>

<!--Wdate -->
<script type="text/javascript" src="${path}/common/js/datapicker/WdatePicker.js" defer="defer"></script>

<script type="text/javascript">
    var zTree;
    var curNode;
    var setting = {
        data: {
            key: {
                children: "children",
                name: "resName",
                title: "",
                url: ""
            },
            simpleData: {
                enable: true,
                idKey: "resId",
                pIdKey: "parentResId"
            }
        },
        callback: {
            beforeClick: function (treeId, treeNode) {
                var url = '${ctx}' + treeNode.url;
                addTab(treeNode.tId, url, treeNode.resName, treeNode.icon);
            },
            beforeExpand: function (treeId, treeNode) {
                if (curNode){
                    if (changeTree(treeNode)){
                        zTree.expandNode(curNode, false, true, false, false);
                        $("#" + curNode.tId).removeClass('sel');
                    }
                }
                $("#" + treeNode.tId).addClass('sel');
            },
            beforeCollapse: function (treeId, treeNode) {

                $("#" + treeNode.tId).removeClass('sel');
            },
            onExpand: function (event, treeId, treeNode) {

                curNode = treeNode;
            }
        }
    };

    function changeTree(treeNode) {
        var flag = true;
        while (treeNode){
            if (treeNode == curNode){
                flag =  false;
                break;
            }
            treeNode = treeNode.getParentNode();
        }

        return flag;
    }

    function addTab(id,url,title,tabImg)
    {
        addTabCon({id:id,url:url,title:title,tabImg:tabImg,tabClose:"true"});
    }

    $(document).ready(function () {
        layout = $("body").layout({
            defaults: {
                paneClass: "ln_panelbox",
                resizerClass: "ln_resize",
                "livePaneResizing": true,
                "maskObjects": true,
                "maskZindex": "10"
            },
            north: {
                paneClass: "ln_northpanebox",
                spacing_open: 0,
                spacing_closed: 0,
                size: 45,
                closable: false,
                resizable: false,
                slidable: false

            },
            south: {
                paneClass: "ln_southpanebox",
                spacing_open: 0,
                spacing_closed: 0,
                size: 22,
                closable: false,
                resizable: false,
                slidable: false
            },
            center: {
                onresize_end: function () {
                    resizeIframe()
                    tabControlW();
                }
            },
            east: {
                paneClass: "ln_eastpanebox",
                spacing_open: 0,
                spacing_closed: 0,
                size: 0,
                closable: false,
                resizable: false,
                slidable: false,
                maskContents: true
            },
            west: {
                minSize: 180,
                maxSize: 180,
                resizerTip: "拖拽条",
                togglerTip_open: "隐藏菜单",
                togglerTip_closed: "显示菜单",
                sliderTip: "显示菜单",
                onresize_end: function () {

                }
            }
        });
        //顶部操作 显示隐藏
        $("#Js_topHandle").toggle(function () {
            var _this = $(this)
            _this.addClass("top_hand_hover")
            $("#top_banner").hide();
            layout.sizePane("north", 40)

        }, function () {
            var _this = $(this)
            _this.removeClass("top_hand_hover")
            $("#top_banner").show();
            layout.sizePane("north", 108)
        });

        $.fn.zTree.init($("#menuTree"), setting, ${resList});
        zTree = $.fn.zTree.getZTreeObj("menuTree");

    });
</script>
</body>
</html>