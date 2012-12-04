(function(env, key) {
  var sane = (function(url) {
    if (url.hostname != 'www.facebook.com') return false;
    if (!/^\/messages/.test(url.pathname)) return false;
    return true;
  })(env.location);

  if (!sane) return;

  var friend = {
    username: url.pathname.match(/^\/messages\/(.+)$/)[1]
  };

  var encrypt = function(msg, key) {
    var rsa = new RSAKey();
    key = key.split('|');
    rsa.setPublic(key[0], key[1]);
    return rsa.encrypt(msg);
  };

  var decrypt = function(msg, key) {
    var rsa = new RSAKey();
    key = key.split('|');
    rsa.setPrivate(key[0], key[1], key[2]);
    return rsa.decrypt(msg);
  };
})(window, '<private-key>');
