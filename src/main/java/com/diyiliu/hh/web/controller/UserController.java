package com.diyiliu.hh.web.controller;

import com.diyiliu.hh.web.bean.SysUser;
import com.diyiliu.hh.web.service.SysUserService;
import com.diyiliu.support.other.Constant;
import com.diyiliu.support.other.Pagination;
import com.diyiliu.support.other.PaginationHelper;
import com.diyiliu.support.util.JsonUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Description: UserController
 * Author: DIYILIU
 * Update: 2017-03-24 09:20
 */

@Controller
@RequestMapping(value = "/sys/user", produces = "text/html;charset=UTF-8")
public class UserController {

    @Resource
    private SysUserService sysUserService;

    @RequestMapping("/toList")
    public String toList() {

        return "sys/user/userList";
    }

    @RequestMapping("/list")
    public void list(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        SysUser sysUser = (SysUser) session.getAttribute(Constant.CURRENT_USER);

        // 分页
        int pageNow = Integer.parseInt(request.getParameter("iDisplayStart"));
        int pageSize = Integer.parseInt(request.getParameter("iDisplayLength"));
        PaginationHelper.page(pageNow, pageSize);

        SysUser condition = new SysUser();
        condition.setWhere(Constant.QBuilder.EQUAL, "orgId", sysUser.getOrgId());
        List list  = sysUserService.selectForList(condition);

        Pagination page= PaginationHelper.getPagination();
        page.setRows(list);

        JsonUtil.renderJson(page, response);
    }

}
