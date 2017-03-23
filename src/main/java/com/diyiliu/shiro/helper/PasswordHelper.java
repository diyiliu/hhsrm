package com.diyiliu.shiro.helper;

import com.diyiliu.hh.web.bean.SysUser;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Value;

/**
 * Description: PasswordHelper
 * Author: DIYILIU
 * Update: 2015-10-28 13:49
 */
public class PasswordHelper {
    private String algorithmName = "md5";
    private int hashIterations = 2;
    private RandomNumberGenerator randomNumberGenerator;

    public void setRandomNumberGenerator(RandomNumberGenerator randomNumberGenerator) {
        this.randomNumberGenerator = randomNumberGenerator;
    }

    public void setAlgorithmName(String algorithmName) {
        this.algorithmName = algorithmName;
    }

    public void setHashIterations(int hashIterations) {
        this.hashIterations = hashIterations;
    }

    public void encryptPassword(SysUser sysUser) {

        sysUser.setSalt(randomNumberGenerator.nextBytes().toHex());

        String newPassword = new SimpleHash(
                algorithmName,
                sysUser.getPassword(),
                ByteSource.Util.bytes(sysUser.getCredentialsSalt()),
                hashIterations).toHex();

        sysUser.setPassword(newPassword);
    }
}
