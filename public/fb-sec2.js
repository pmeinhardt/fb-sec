(function(global, key, pubkey) {
  // Create a proxy for the window object, so we do not pollute the global
  // namespace with our internally used libraries which may export objects
  // to `window`.

  var Environment = function() {};

  Environment.prototype = global; // inherit from window

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

  // Include the Zepto Cookie plugin: https://github.com/dcompute/Zepto-Cookie

  // ...

  // Alias Zepto as $ within the local scope.
  var $ = Zepto;

  // Include Underscore.js and Backbone.js

  // ...

  // User, Conversation, Session...

  // TODO:
  //  User -> Backbone.Model
  //  Conversation -> Backbone.View?
  //  Session -> Backbone.Router?
  //  UI -> Backbone.View

  var InvalidUserIdException = function(id) {
    this.id = id;
  };

  InvalidUserId.prototype.toString = function() {
    return 'Invalid user id: ' + this.id;
  };

  var User = function(id, pubkey, key) {
    if (typeof id !== 'string' || id.length === 0) {
      throw new InvalidUserIdException(id);
    }

    this.id     = id;
    this.pubkey = pubkey;
    this.key    = key;
  };

  User.prototype.readKey = function(callback) {
    var self = this;
    // $.get({ url: '', success: ... });
  };

  // Conversation

  var Conversation = function(session) {
    this.session = session;
    this.users   = {};
  };

  Conversation.prototype.init = function() {
    /* on loaded messages */ this.trigger('load:messages');
  };

  Conversation.prototype.addUser = function(user) {
    this.users[user.id] = user;
  };

  Conversation.prototype.getUser = function(id) {
    return this.users[id];
  };

  Conversation.prototype.eachUser = function(handler) {
    for (var id in this.users) handler(this.users[id]);
  };

  Conversation.prototype.decrypt = function(content, me) {
    var matcher = /\[\[fbsmsg\:([^|]+)\|([0-9a-f]+)\]\]/g;

    var decrypt = function(msg, key) {
      var rsa = new RSAKey();
      key = key.split('|');
      rsa.setPrivate(key[0], key[1], key[2]);
      return rsa.decrypt(msg);
    };

    return content.replace(matcher, function(match, id, ciphertext) {
      return id === me.id ? decrypt(ciphertext, me.key) : '';
    });
  };

  Conversation.prototype.encrypt = function(message) {
    var versions = [];

    var encrypt = function(msg, key) {
      var rsa = new RSAKey();
      key = key.split('|');
      rsa.setPublic(key[0], key[1]);
      return rsa.encrypt(msg);
    };

    this.eachUser(function(user) {
      var ciphertext = encrypt(message, user.pubkey);
      versions.push('[[fbsmsg:' + user.id + '|' + ciphertext + ']]');
    });

    return versions.join('');
  };

  // Session

  var InvalidSessionUserException = function(message) {
    this.message = message;
  };

  InvalidSessionUserException.prototype.toString = function() {
    return 'Invalid session user: ' + this.message;
  };

  var Session = function(me) {
    if (!me.id) {
      throw new InvalidSessionUserException('missing id');
    } else if (!me.pubkey) {
      throw new InvalidSessionUserException('missing pubkey');
    } else if (!me.key) {
      throw new InvalidSessionUserException('missing key');
    }

    this.conversations = {};
    this.users         = {};
    this.me            = me;
  };

  Session.prototype.init = function() {
    /* on navigate */ this.trigger('change:conversation');
    // this.trigger('ready');
  };

  Session.prototype.addUser = function(user) {
    this.users[user.id] = user;
  };

  Session.prototype.getUser = function(id) {
    return this.users[id];
  };

  /*Session.prototype.start = function() {
    // Hook into the Facebook message input field, to encrypt messages before
    // they are actually sent to the server.

    var $input = $('textarea[name=message_body]');

    $.event.add($input.parent()[0], 'keydown', function(e) {
      if (e.keyCode !== 13 || e.shiftKey) return true;

      // Extract the original, plaintext message to be encrypted.

      var message = $input.val();

      // Encrypt the original message from the input field for each user
      // participating in the current conversation and send the concatenation
      // of all cipher strings instead of the plaintext message.

      var conversation = {}; // TODO: fetch current conversation

      $input.val(conversation.encrypt(message));

      // Let the event trigger the default action, submitting encrypted
      // cipher text, which we swapped in for the plaintext.

      return true;
    }, null, null, true);

    // Listen to change events on the document to detect when we're switching
    // to another conversations or loading of more, older messages.

    // $('body').on('change', function(e) { ... });
  };*/

  // User interface

  var UI = function(session) {
    this.session = session;
  };

  UI.prototype.init = function() {
    this.session.on('ready', function() {
      // show that fb-sec's ready in the ui
    });

    this.session.on('change:conversation', function(conversation) {
      // retrieve current conversation info and update interface
    });
  };

  UI.prototype.render = function() {
    // TODO: create a user interface for fb-sec.
    var markup = ['<div id="fb-sec">', '</div>'].join('');
    this.$el = $(markup);
    $('body').append(this.$el);
  };

  // Main.

  var id = (function() { return $.fn.cookie('c_user'); })();
  var me = new User(id, pubkey, key);

  // Create a new FB-sec session.

  var session = new Session(me);

  // Provide a user interface to show current session information, a set of
  // controls to switch between encrypted/normal conversations and more...

  var ui = new UI(session);
  ui.render();

  // Finally start the session.

  session.init();
})(window, '<private-key>', '<public-key>');
