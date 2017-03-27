package com.diyiliu.hh.web.bean;

import com.diyiliu.hh.web.bean.base.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Table;
import java.util.Date;

/**
 * Description: SysUser
 * Author: DIYILIU
 * Update: 2017-03-21 08:25
 */

@Table(name = "SYS_USER", schema = "SYSU_ID")
public class SysUser extends BaseEntity{

    @Column(name = "SYSU_ID")
    private Long userId;
    @Column(name = "USERNAME")
    private String username;
    @Column(name = "PASSWORD")
    private String password;
    @Column(name = "SALT")
    private String salt;
    @Column(name = "REAL_NAME")
    private String realName;
    @Column(name = "TEL")
    private String tel;
    @Column(name = "EMAIL")
    private String email;
    @Column(name = "SYSO_ID")
    private Long orgId;
    @Column(name = "CREATE_TIME")
    private Date createTime;
    @Column(name = "UPDATE_TIME")
    private Date updateTime;
    @Column(name = "LAST_LOGIN_TIME")
    private Date lastLoginTime;
    @Column(name = "LAST_LOGIN_IP")
    private Date lastLoginIp;
    @Column(name = "COUNT")
    private Integer count;
    @Column(name = "STATE")
    private Integer state;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getOrgId() {
        return orgId;
    }

    public void setOrgId(Long orgId) {
        this.orgId = orgId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginTime(Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    public Date getLastLoginIp() {
        return lastLoginIp;
    }

    public void setLastLoginIp(Date lastLoginIp) {
        this.lastLoginIp = lastLoginIp;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getCredentialsSalt() {
        return username + salt;
    }
}
