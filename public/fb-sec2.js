(function(global, key, pubkey) {
  // Create a proxy for the window object, so we do not pollute the global
  // namespace with our internally used libraries which may export objects
  // to `window`.

  var Environment = function() {};

  Environment.prototype = global;

  var env = new Environment();

  // Cover the global window object with a local `window` variable
  // so we don't make any undesired changes to the original page.
  //
  // In subsequent code `window` will refer to the local `env` proxy:
  //
  //    window.variable = ...;      => will set `variable` on the window proxy,
  //                                   overriding, but not replacing, any
  //                                   variable value on the "real" window
  //
  //    var o = window.variable;    => will read `variable` from the proxy or
  //                                   - if not present - will delegate to the
  //                                   global, "real" window object
  //
  // Things that will not work as they would with the true window object:
  //
  //    window.variable = 12;       => sets variable on the proxy, not globally
  //    variable == 12              => false, where it would be true
  //
  //    window.location = '...'     => will not trigger a page load here
  //
  // However, this way, we leave the original page's behavior untouched.

  var window = env;

  // Perform a "sanity check" - i.e. check that we're on Facebook really
  // and do not execute any other code, if we're on a different page.

  var sane = (function(url) {
    if (url.hostname != 'www.facebook.com') return false;
    if (!/^\/messages/.test(url.pathname)) return false;
    return true;
  })(window.location);

  if (!sane) return;

  // Below jsbn.js, prng4.js, rng.js and rsa.js have been compiled with
  // https://developers.google.com/closure/compiler/

  // ...

  // Include Zepto for DOM node selection, XHR requests, event listeners etc.
  // http://zeptojs.com/, http://zeptojs.com/license/, v1.0rc1

  // ...

  // Alias Zepto as $ within the local scope.
  var $ = Zepto;

  // User, Conversation, Context...

  var User = function() {};

  var Conversation = function() {};

  var Context = function() {};

  // Main.

  var context = new Context();

  var conversation = context.conversation();

  // ...
})(window, '<private-key>', '<public-key>');
