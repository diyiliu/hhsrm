<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/common.jsp"%>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<form id="accountForm" name="accountForm" action="" method="post">
    <div class="contenbox">
        <!--options-->
        <div class="grid_summay_opts">
            <div class="left_opts">
                <a hideFocus="true" href="javascript:toInput()" class="gray_radiu_btn">
                    <em class="gray_l"></em>
                    <em class="gray_r"></em>
                    新增
                </a>
                <a hideFocus="true" href="javascript:edit()" class="gray_radiu_btn">
                    <em class="gray_l"></em>
                    <em class="gray_r"></em>
                    编辑
                </a>
                <a hideFocus="true" href="javascript:deleteObjects();" class="gray_radiu_btn">
                    <em class="gray_l"></em>
                    <em class="gray_r"></em>
                    删除
                </a>
                <a hideFocus="true" href="javascript:changePassword()" class="gray_radiu_btn">
                    <em class="gray_l"></em>
                    <em class="gray_r"></em>
                    修改密码
                </a>
                <a hideFocus="true" href="javascript:openRoleTree()" class="gray_radiu_btn">
                    <em class="gray_l"></em>
                    <em class="gray_r"></em>
                    设置角色
                </a>
            </div>
        </div>
        <div class="sprite_mod">
            <a class="Js_showSearch mod_opts" hidfocus="true" id="searchnav">查询条件</a>
        </div>
        <!-- 表格列表过滤条件设置 -->
        <div class="filter-mod">
            <ul class="filter-list">
                <li class="filter-item">
                    <label class="filter-label">
                        工号：
                    </label>
                    <input type="text" id="name" class="filter-text"/>
                </li>
                <li class="filter-item">
                    <label class="filter-label">
                        手机：
                    </label>
                    <input type="text" id="nameCn" class="filter-text"/>
                </li>
                <li class="filter-item">
                    <label class="filter-label">
                        是否为缺省密码：
                        <select name="customerStatus" id="customerStatus" class="filter-select">
                            <option value=""></option>
                            <option value="1">是</option>
                            <option value="9">否</option>
                        </select>
                    </label>

                </li>
                <li class="filter-item filter-btns">
                    <a hideFocus="true" class="gray_radiu_btn Js_searchTable">
                        <em class="gray_l"></em>
                        <em class="gray_r"></em>
                        查询
                    </a>
                    <a hideFocus="true" href="javascript:clearCondition();" class="gray_radiu_btn Js_reLoadTable">
                        <em class="gray_l"></em>
                        <em class="gray_r"></em>
                        清空
                    </a>
                </li>
            </ul>
        </div>

        <table cellpadding="0" cellspacing="0" border="0" id="grid-table" width="100%"
               class="common_table Js_contextMenuOpt">
            <thead>
            <tr>
                <th><input type="checkbox"/></th>
                <th>账号</th>
                <th>手机</th>
                <th>姓名</th>
                <th>登录时间</th>
                <th>登录IP</th>
                <th>当前状态</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</form>
<!-- 右击td显示的右击菜单 -->
<div class="rightMenu bodyMenu Js_tdMenu">
    <!--存储当前点击行的数据-->
    <input type="hidden" class="Js_curIndex" value=""/>
    <ul>
        <li><a hideFocus="true" href="javascript:edit()">编辑</a></li>
        <li><a hideFocus="true" href="javascript:openRoleTree()">设置角色</a></li>
    </ul>
</div>
</body>
<script type="text/javascript">
    FhFormSerializer.bindUnload();
    var datatable;
    $(document).ready(function () {
        var tableObj = FhFormSerializer.restore();
        tableObj.url = "${path}/";
        tableObj.bPanination = false;
        tableObj.aoColumns = [
            {
                "mDataProp": "",
                "sDefaultContent": "<input type='checkbox' />",
                "bSortable": false,
                "sWidth": "20px",
                sClass: "checkbox"
            },
            {"mDataProp": "username", "sDefaultContent": "", "bSortable": false, "sClass": "text-align-mid"},
            {"mDataProp": "tel", "sDefaultContent": "", "bSortable": false, "sClass": "text-align-mid"},
            {"mDataProp": "realName", "sDefaultContent": "", "bSortable": false, "sClass": "text-align-mid"},
            {"mDataProp": "lastLoginTime", "sDefaultContent": "", "bSortable": false, "sClass": "text-align-mid"},
            {"mDataProp": "lastLoginIp", "sDefaultContent": "", "bSortable": false, "sClass": "text-align-mid"},
            {"mDataProp": "state", "sDefaultContent": "", "bSortable": false, "sClass": "text-align-mid"},
        ];
        datatable = datatableObj(tableObj);
    })
</script>
</html>
