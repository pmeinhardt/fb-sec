// Generate tbe RSA key pair asynchronously.

importScripts('/lib/jsbn.js');
importScripts('/lib/jsbn2.js');
importScripts('/lib/prng4.js');
importScripts('/lib/rng.js');
importScripts('/lib/rsa.js');
importScripts('/lib/rsa2.js');

var keygen = function(options) {
  var key = new RSAKey();
  key.generate(options.bits, options.e);
  return key;
};

self.onmessage = function(e) {
  var options = e.data;
  var key = keygen(options);
  self.postMessage({
    n: key.n.toString(16),
    e: key.e.toString(16),
    d: key.d.toString(16)
  });
};
