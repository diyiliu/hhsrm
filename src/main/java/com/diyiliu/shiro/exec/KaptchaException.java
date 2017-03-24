package com.diyiliu.shiro.exec;

import org.apache.shiro.authc.AuthenticationException;

/**
 * Description: KaptchaException
 * Author: DIYILIU
 * Update: 2017-03-24 18:08
 */
public class KaptchaException extends AuthenticationException {

    public KaptchaException() {
        super("验证码错误！");
    }
}