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

  var encrypt = function(msg, key) {};

  var decrypt = function(msg, key) {};
})(window, '<private-key>');
