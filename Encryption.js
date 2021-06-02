export const encryptAlgo = (data) => {
  var encrypted = Crypto(Alphabet, 69);
  var publicKey = Crypto(Alphabet, 69);
  const encryptedmessage = encrypted.encrypt(data, publicKey.pubKey);

  const decryptionMessage = publicKey.decrypt(encryptedmessage);
  console.log(decryptionMessage);
  return { data, encryptedmessage, decryptionMessage };
};

var Alphabet =
  '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ π®ƒ©∆';

Alphabet = Alphabet.split('');

var Crypto = function (alpha, gen, C) {
  var p, B, encrypt, decrypt, f, g, modInv, modPow, toAlpha, to10;
  toAlpha = function (x) {
    var y, p, l, n;
    if (x === 0) {
      return '!!!!';
    }
    y = [];
    n = 4;
    n = Math.ceil(n);
    while (n--) {
      p = Math.pow(alpha.length, n);
      l = Math.floor(x / p);
      y.push(alpha[l]);
      x -= l * p;
    }
    y = y.join('');
    return y;
  };
  to10 = function (x) {
    var y, p, n;
    y = 0;
    p = 1;
    x = x.split('');
    n = x.length;
    while (n--) {
      y += alpha.indexOf(x[n]) * p;
      p *= alpha.length;
    }
    return y;
  };
  modInv = function (gen, mod) {
    var v, d, u, t, c, q;
    v = 1;
    d = gen;
    t = 1;
    c = mod % gen;
    u = Math.floor(mod / gen);
    while (d > 1) {
      q = Math.floor(d / c);
      d = d % c;
      v = v + q * u;
      if (d) {
        q = Math.floor(c / d);
        c = c % d;
        u = u + q * v;
      }
    }
    return d ? v : mod - u;
  };
  modPow = function (base, exp, mod) {
    var c, x;
    if (exp === 0) {
      return 1;
    } else if (exp < 0) {
      exp = -exp;
      base = modInv(base, mod);
    }
    c = 1;
    while (exp > 0) {
      if (exp % 2 === 0) {
        base = (base * base) % mod;
        exp /= 2;
      } else {
        c = (c * base) % mod;
        exp--;
      }
    }
    return c;
  };
  p = 91744613;
  C = parseInt(C, 10);
  if (isNaN(C)) {
    C = Math.round(Math.sqrt(Math.random() * Math.random()) * (p - 2) + 2);
  }
  B = modPow(gen, C, p);
  decrypt = function (a) {
    var d, x, y;
    x = a[1];
    y = modPow(a[0], -C, p);
    d = (x * y) % p;
    d = Math.round(d) % p;
    d %= alpha.length;
    return alpha[d - 2];
  };
  encrypt = function (key, d) {
    var k, a;
    k = Math.ceil(Math.sqrt(Math.random() * Math.random()) * 1e10);
    d = alpha.indexOf(d) + 2;
    a = [];
    a[0] = modPow(key[1], k, key[0]);
    a[1] = (d * modPow(key[2], k, key[0])) % key[0];
    return a;
  };
  f = function (message, key) {
    var n, x, y, w;
    y = [];
    message = message.split('');
    n = message.length;
    while (n--) {
      x = encrypt(key, message[n]);
      y.push(toAlpha(x[0]));
      y.push(toAlpha(x[1]));
    }
    y = y.join('');
    return y;
  };
  g = function (message) {
    var n, m, d, x;
    m = [];
    n = message.length / 8;
    while (n--) {
      x = message[8 * n + 4];
      x += message[8 * n + 5];
      x += message[8 * n + 6];
      x += message[8 * n + 7];
      m.unshift(x);
      x = message[8 * n];
      x += message[8 * n + 1];
      x += message[8 * n + 2];
      x += message[8 * n + 3];
      m.unshift(x);
    }
    x = [];
    d = [];
    n = m.length / 2;
    while (n--) {
      x[0] = m[2 * n];
      x[1] = m[2 * n + 1];
      x[0] = to10(x[0]);
      x[1] = to10(x[1]);
      d.push(decrypt(x));
    }
    message = d.join('');
    return message;
  };
  return {
    pubKey: [p, gen, B],
    priKey: C,
    decrypt: g,
    encrypt: f
  };
};

// var Eve = Crypto(Alphabet, 69);

// var message1 = 'Hello!';
// var message2 =
//   'Dear Bob, I wanted to tell you that my Very Important Secret Number is 1234567890.';

// message1 = Alice.encrypt(message1, Bob.pubKey);
// message2 = Alice.encrypt(message2, Bob.pubKey);

// console.log('Alice writes: ');
// console.log('     ' + message1);
// console.log('     ' + message2);
/*Alice writes: 
     qZqffP9O(3xw<Z{?Te&$Xw:8OR®aOB/8)Pi@0PnADt``E<En
     D_2fxid$D:!suIs?=|fDXaMXm|R:tqU3Fl1(rPp+lFXq3[crJP/U`MXpsxp@"cb?h^dM1F"TXπBUT∆\h5_®wsTbZ.J,yGn%s{',jOπ2>2`y({Y∆EwuY4\7hπFdZTu9>%N'yFizmTjAEBdDPGCETALWZOO>kM@I∆U\i<;AiW@t6ifH1M-`IcrcOwDaFOU!4d.9=rB2®ms0{π><Bdi;PfO$ƒZgUi`©PP0®.edZ9^x=k'kz7mnF`"ƒJJ_/Vd%jDF:U®&EN'$-hn[®E:L6c?&©tfE{7_V;π93N/NN+*i"\#pF"tS90j∆N_2JaY/h!n6wQ8®/IS®3'j?®^i _]SEwdM%_6∆J/==[%3>=#E.qKk/'A&y#+l[-'QUx7G`R`ZmASJ)nE%ss%(=&>iRƒ'**ƒC;]l"f@Q.xo>I/ZI|wk[πHGpS1I_B]DKb%aeFKzAP6:®(KW;6;4Da;D.>Rq{pLvP/$XN/;e2∆ta+V=>W:"e=!T>8)q8w*f+J,kWv@`@x®K-7`mb%9r]Xrcx(π'R&8+"{|[xj'^!)4eLF<Ngi;OufZp0(π\(6x<1Qja=Jhqπ(J,k[ZF9©{96IjF∆®3c6[p6hs8IJs"/S$O-(cLgzGJ`r{&&;#=K 3q,"cy/I$*,n\∆I9dnE7*HNb8<vj^]$35^rLmj
*/

// console.log('Bob reads: ');
// console.log('     ' + Bob.decrypt(message1));
// console.log('     ' + Bob.decrypt(message2));
/*
    Bob reads: 
         Hello!
         Dear Bob, I wanted to tell you that my Very Important Secret Number is 1234567890.
*/

// console.log('Eve reads: ');
// console.log('     ' + Eve.decrypt(message1));
// console.log('     ' + Eve.decrypt(message2));
var result = encryptAlgo('Nidhi Rai');
