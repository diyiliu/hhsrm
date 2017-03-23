		function encode(password){
  			var t ="{SHA}" +hexSha1(password);
  			return t;
  		}
	
  		function hexSha1(s)
  		{
  		  return binb2b64(core_sha1(str2binb(s),s.length * chrsz));
  		}

  		function binb2b64(binarray)
  		{
  		  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  		  var str = "";
  		  for(var i = 0; i < binarray.length * 4; i += 3)
  		  {
  		    var triplet = (((binarray[i   >> 2] >> 8 * (3 -  i   %4)) & 0xFF) << 16)
  		                | (((binarray[i+1 >> 2] >> 8 * (3 - (i+1)%4)) & 0xFF) << 8 )
  		                |  ((binarray[i+2 >> 2] >> 8 * (3 - (i+2)%4)) & 0xFF);
  		    for(var j = 0; j < 4; j++)
  		    {
  		      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
  		      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
  		    }
  		  }
  		  if(binarray.length%3==1)//剩余1个字节
  		  str=str+"==";
  		  else if(binarray.length%3==2) //剩余2个字节
  		  str=str+"=";
  		  return str;
  		}

  		function core_sha1(x, len)
  		{
  		  /* append padding */
  		  x[len >> 5] |= 0x80 << (24 - len % 32);
  		  x[((len + 64 >> 9) << 4) + 15] = len;

  		  var w = Array(80);
  		  var a =  1732584193;
  		  var b = -271733879;
  		  var c = -1732584194;
  		  var d =  271733878;
  		  var e = -1009589776;

  		  for(var i = 0; i < x.length; i += 16)
  		  {
  		    var olda = a;
  		    var oldb = b;
  		    var oldc = c;
  		    var oldd = d;
  		    var olde = e;

  		    for(var j = 0; j < 80; j++)
  		    {
  		      if(j < 16) w[j] = x[i + j];
  		      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
  		      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
  		                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
  		      e = d;
  		      d = c;
  		      c = rol(b, 30);
  		      b = a;
  		      a = t;
  		    }

  		    a = safe_add(a, olda);
  		    b = safe_add(b, oldb);
  		    c = safe_add(c, oldc);
  		    d = safe_add(d, oldd);
  		    e = safe_add(e, olde);
  		  }
  		  return Array(a, b, c, d, e);

  		}


  		var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
  		var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
  		var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

  		var   base64EncodeChars   =   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";   
  		var   base64DecodeChars   =   new   Array(   
  		  -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   
  		  -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   
  		  -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   62,   -1,   -1,   -1,   63,   
  		  52,   53,   54,   55,   56,   57,   58,   59,   60,   61,   -1,   -1,   -1,   -1,   -1,   -1,   
  		  -1,   0,   1,   2,   3,   4,   5,   6,   7,   8,   9,   10,   11,   12,   13,   14,   
  		  15,   16,   17,   18,   19,   20,   21,   22,   23,   24,   25,   -1,   -1,   -1,   -1,   -1,   
  		  -1,   26,   27,   28,   29,   30,   31,   32,   33,   34,   35,   36,   37,   38,   39,   40,   
  		  41,   42,   43,   44,   45,   46,   47,   48,   49,   50,   51,   -1,   -1,   -1,   -1,   -1);
  		  
  		  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  		  
  		  /*
  		 * Convert an 8-bit or 16-bit string to an array of big-endian words
  		 * In 8-bit function, characters >255 have their hi-byte silently ignored.
  		 */
  		function str2binb(str)
  		{
  		  var bin = Array();
  		  var mask = (1 << chrsz) - 1;
  		  for(var i = 0; i < str.length * chrsz; i += chrsz)
  		    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);
  		  return bin;
  		}

  		function safe_add(x, y)
  		{
  		  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  		  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  		  return (msw << 16) | (lsw & 0xFFFF);
  		}
  		
  		function rol(num, cnt)
  		{
  		  return (num << cnt) | (num >>> (32 - cnt));
  		}
  		 
  		function sha1_ft(t, b, c, d)
  		{
  		  if(t < 20) return (b & c) | ((~b) & d);
  		  if(t < 40) return b ^ c ^ d;
  		  if(t < 60) return (b & c) | (b & d) | (c & d);
  		  return b ^ c ^ d;
  		}
  		function sha1_kt(t)
  		{
  		  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
  		         (t < 60) ? -1894007588 : -899497514;
  		}