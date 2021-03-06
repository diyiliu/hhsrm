package com.diyiliu.shiro.realm;

import com.diyiliu.hh.web.bean.SysUser;
import com.diyiliu.hh.web.service.SysUserService;
import com.diyiliu.support.other.Constant;
import org.apache.commons.collections.CollectionUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;

import javax.annotation.Resource;
import java.util.List;

/**
 * Description: UserRealm
 * Author: DIYILIU
 * Update: 2015-10-16 16:21
 */
public class UserRealm extends AuthorizingRealm {

    @Resource
    private SysUserService sysUserService;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {

        String username = (String) principals.getPrimaryPrincipal();

        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        /*authorizationInfo.setRoles(userService.findRoles(username));
        authorizationInfo.setStringPermissions(userService.findPermissions(username));*/

        return authorizationInfo;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

        String username = (String) token.getPrincipal();

        SysUser sysUser = new SysUser();
        sysUser.setWhere(Constant.QBuilder.EQUAL, "username", username);

        List<SysUser> list = sysUserService.selectForList(sysUser);
        if (CollectionUtils.isEmpty(list) || list.size() != 1) {

            // 找不到用户
            throw new UnknownAccountException();
        }

        sysUser = list.get(0);

        // 用户锁定
        if (sysUser.getState() == Integer.valueOf(5)) {

            throw new LockedAccountException();
        }

        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
                sysUser.getUsername(),
                sysUser.getPassword(),
                ByteSource.Util.bytes(sysUser.getCredentialsSalt()),
                getName());

        // 当验证都通过后，把用户信息放在session里
        Session session = SecurityUtils.getSubject().getSession();
        session.setAttribute(Constant.CURRENT_USER, sysUser);

        return authenticationInfo;
    }

    @Override
    public void clearCachedAuthorizationInfo(PrincipalCollection principals) {
        super.clearCachedAuthorizationInfo(principals);
    }

    @Override
    public void clearCachedAuthenticationInfo(PrincipalCollection principals) {
        super.clearCachedAuthenticationInfo(principals);
    }

    @Override
    public void clearCache(PrincipalCollection principals) {
        super.clearCache(principals);
    }

    public void clearAllCachedAuthorizationInfo() {
        getAuthorizationCache().clear();
    }

    public void clearAllCachedAuthenticationInfo() {
        getAuthenticationCache().clear();
    }

    public void clearAllCache() {
        clearAllCachedAuthenticationInfo();
        clearAllCachedAuthorizationInfo();
    }
}
