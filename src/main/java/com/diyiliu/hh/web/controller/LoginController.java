package com.diyiliu.hh.web.controller;

import com.diyiliu.hh.web.bean.SysResource;
import com.diyiliu.hh.web.service.SysResourceService;
import com.diyiliu.hh.web.service.SysUserService;
import com.diyiliu.shiro.exec.KaptchaException;
import com.diyiliu.support.other.Constant;
import com.diyiliu.support.util.JsonUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.code.kaptcha.Constants;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Description: LoginController
 * Author: DIYILIU
 * Update: 2017-03-20 17:30
 */

@Controller
@RequestMapping(produces = "text/html;charset=UTF-8")
public class LoginController {

    @Resource
    private SysUserService sysUserService;

    @Resource
    private SysResourceService sysResourceService;

    @RequestMapping(value = "/toLogin", method = RequestMethod.GET)
    public String toLogin(HttpServletRequest request) {
        request.removeAttribute("error");

        return "/login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public void login(HttpServletRequest request, HttpServletResponse response) {
        String exceptionClassName = (String) request.getAttribute("shiroLoginFailure");

        Map resultMap = new HashMap();

        // 登录成功
        if (StringUtils.isEmpty(exceptionClassName)) {

            resultMap.put("redirectURL", "toMain.htm");
            resultMap.put("success", true);
        } else if (UnknownAccountException.class.getName().equals(exceptionClassName)
                || IncorrectCredentialsException.class.getName().equals(exceptionClassName)) {

            resultMap.put("errorCode", "2");
            resultMap.put("errorMsg", "用户名/密码错误!");
        } else if (ExcessiveAttemptsException.class.getName().equals(exceptionClassName)) {

            resultMap.put("errorMsg", "登录错误次数超限，请稍后再试!");
        } else if (KaptchaException.class.getName().equals(exceptionClassName)) {

            resultMap.put("errorCode", "1");
            resultMap.put("errorMsg", "验证码错误,请重新输入!");
        } else {

            resultMap.put("errorMsg", "登录异常：" + exceptionClassName);
        }

        try {
            JsonUtil.renderJson(resultMap, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/toMain")
    public String toMain(Model model) {

        SysResource condition = new SysResource();
        condition.setWhere(Constant.QBuilder.EQUAL, "type", "menu");
        condition.setWhere(Constant.QBuilder.ORDER_BY, null, "PARENT_SYSRES_IDS,SORT");

        List resList = sysResourceService.selectForList(condition);
        model.addAttribute("resList", JsonUtil.toJson(resList));

        return "main";
    }

    @RequestMapping("/logout")
    public String logout(){
        SecurityUtils.getSubject().logout();

        return "redirect:/toLogin.htm";
    }
}
