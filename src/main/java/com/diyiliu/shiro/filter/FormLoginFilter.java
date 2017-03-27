package com.diyiliu.shiro.filter;

import com.diyiliu.hh.web.bean.SysUser;
import com.diyiliu.hh.web.service.SysUserService;
import com.diyiliu.shiro.exec.KaptchaException;
import com.diyiliu.support.other.Constant;
import com.diyiliu.support.util.CommonUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.code.kaptcha.Constants;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;

import javax.annotation.Resource;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Description: FormLoginFilter
 * Author: DIYILIU
 * Update: 2015-10-20 13:56
 */
public class FormLoginFilter extends FormAuthenticationFilter {

    @Resource
    private SysUserService sysUserService;

    private String loginUrl;
    private String successUrl;

    private String username;
    private String password;
    private String rememberMe;

    @Override
    protected boolean executeLogin(ServletRequest request, ServletResponse response) throws Exception {
        // System.out.println("FormLoginFilter -- ");

        AuthenticationToken token = createToken(request, response);
        if (token == null) {
            String msg = "createToken method implementation returned null. A valid non-null AuthenticationToken " +
                    "must be created in order to execute a login attempt.";
            throw new IllegalStateException(msg);
        }
        try {
            Subject subject = SecurityUtils.getSubject();
            subject.login(token);

            return onLoginSuccess(token, subject, request, response);
        } catch (AuthenticationException e) {
            return onLoginFailure(token, e, request, response);
        }
    }

    @Override
    protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request, ServletResponse response) throws Exception {

        HttpServletRequest httpServletRequest = (HttpServletRequest) request;

        String kaptchaText = request.getParameter("rand");
        if (!checkKaptcha(kaptchaText, httpServletRequest.getSession())){

            return super.onLoginFailure(token, new KaptchaException(), request, response);
        }

        SysUser sysUser = (SysUser) subject.getSession().getAttribute(Constant.CURRENT_USER);
        sysUser.setCount(sysUser.getCount() + 1);
        sysUser.setLastLoginTime(new Date());
        sysUser.setLastLoginIp(CommonUtil.getIpAddress(httpServletRequest));

        sysUser.setWhere(Constant.QBuilder.EQUAL, "userId", sysUser.getUserId());
        sysUser.setNonNull(true);

        sysUserService.update(sysUser);


        if ("XMLHttpRequest".equalsIgnoreCase(httpServletRequest.getHeader("X-Requested-With"))) {
            Map resultMap = new HashMap();
            resultMap.put("redirectURL", successUrl);
            resultMap.put("success", true);

            response.setContentType("application/json;charset=UTF-8");
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(response.getWriter(), resultMap);

            return false;
        }

        return super.onLoginSuccess(token, subject, request, response);
    }

    @Override
    protected AuthenticationToken createToken(ServletRequest request, ServletResponse response) {

        boolean rememberMe = isRememberMe(request);

        return new UsernamePasswordToken(getUsername(request), getPassword(request), rememberMe, getHost(request));
    }


    /**
     * 校验验证码
     *
     * @param text
     * @param session
     * @return
     */
    private boolean checkKaptcha(String text, HttpSession session){

        String capText = (String) session.getAttribute(Constants.KAPTCHA_SESSION_KEY);

        if (StringUtils.isEmpty(text) || StringUtils.isEmpty(capText)){
            return  false;
        }

        return text.equalsIgnoreCase(capText);
    }

    @Override
    public boolean isRememberMe(ServletRequest request) {
        return WebUtils.isTrue(request, rememberMe);
    }

    @Override
    public String getLoginUrl() {
        return loginUrl;
    }

    @Override
    public String getSuccessUrl() {
        return successUrl;
    }

    @Override
    public String getUsernameParam() {
        return username;
    }

    @Override
    public String getPasswordParam() {
        return password;
    }

    public void setLoginUrl(String loginUrl) {
        this.loginUrl = loginUrl;
    }

    public void setSuccessUrl(String successUrl) {
        this.successUrl = successUrl;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRememberMe(String rememberMe) {
        this.rememberMe = rememberMe;
    }
}

