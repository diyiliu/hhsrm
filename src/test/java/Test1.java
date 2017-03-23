import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.junit.Test;

import java.util.UUID;

/**
 * Description: Test1
 * Author: DIYILIU
 * Update: 2017-03-21 09:01
 */
public class Test1 {


    @Test
    public void testLongId() {

        System.out.println(Math.abs(UUID.randomUUID().getLeastSignificantBits()));
    }

    @Test
    public void testSalt() {

        RandomNumberGenerator randomNumberGenerator = new SecureRandomNumberGenerator();

        System.out.println(randomNumberGenerator.nextBytes().toHex());
    }

    @Test
    public void testPassowrd() {
        String salt = "admin" + "5c4717053f72908b8aa396559b46e931";
        String password = "717admin";

        String newPassword = new SimpleHash("MD5", password, ByteSource.Util.bytes(salt), 2).toHex();

        System.out.println(newPassword);
    }
}
