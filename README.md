# fb-sec

*Note: I have concerns about potential attack vectors, which could allow Facebook to steal private keys from the bookmarklet. This would compromise the very goal of fb-sec: total confidentiality of your messages. Therefore, unfortunately, this project is discontinued.*

Private messages should be private. Even when sent through Facebook. We aim to accomplish just that.

## Usage

To obtain your personal *fb-sec bookmarklet* and *public key*, visit the [fb-sec homepage](https://fb-sec.herokuapp.com/) and follow the instructions there. Basically:

1. Install the bookmarklet by dragging the key symbol to the bookmarks bar and copy the public key from the text field

  ![Step 0](https://raw.github.com/pmeinhardt/fb-sec/master/public/img/step-0.jpg "Install the bookmarklet by dragging it to the bookmarks bar")

2. Go to your Facebook profile's ["About" page](https://www.facebook.com/me/info)

  ![Step 1](https://raw.github.com/pmeinhardt/fb-sec/master/public/img/step-1.jpg "Go to your Facebook 'About' page")

3. Paste the public there, so that others can send you encrypted messages

  ![Step 2](https://raw.github.com/pmeinhardt/fb-sec/master/public/img/step-2.jpg "Paste the public key into the 'Quotations' section of your about page so that others can send you encrypted messages")

4. Before [reading/writing messages on Facebook](https://www.facebook.com/messages/), click the bookmark

  ![Step 3](https://raw.github.com/pmeinhardt/fb-sec/master/public/img/step-3.jpg "…")

## How it works

The core principle of fb-sec is its use of [public-key cryptography](http://en.wikipedia.org/wiki/Public-key_cryptography). In short:

  * Every user posesses a pair of exactly 2 keys:
    * a *private key*, which has to be kept secret,
    * and a *public key*, which can be published anywhere.
  * A message encrypted with a user's public key, can only be decrypted with the corresponding private key.

This means, that not even Facebook (nor anyone else except the person you're writing to) can read your messages.

Currently fb-sec uses the [RSA](http://en.wikipedia.org/wiki/RSA_\(algorithm\)) asymmetric key algorithm. Keys are generated in your browser, so no one else has knowledge about your personal key pair.

Before any message is sent to a Facebook server, fb-sec encrypts it with the public keys of your friends. Their public keys are simply published on their [Facebook profile's info page](https://www.facebook.com/me/info) and thus accessible to the bookmarklet.

Similarly, messages sent to you and encrypted with your own public key, can only be read by you alone.

## Security considerations

Because your private key is stored inside the fb-sec bookmark, it is crucial that nobody except you ever has access to your bookmark data.

When you are signed in to *Google Chrome*, you should not [sync your bookmarks](http://support.google.com/chrome/bin/answer.py?hl=en&answer=185277&topic=1693469&ctx=topic).

If you still want to synchronize, at least make sure to [encrypt all synced data](http://support.google.com/chrome/bin/answer.py?hl=en&answer=1181035&topic=1693469&ctx=topic) using a custom passphrase. Know however, that your best option may be to not sync bookmarks at all.

## Further Reading

* Recommended RSA key size: [Wikipedia RSA (algorithm) - Integer factorization and RSA problem](http://en.wikipedia.org/wiki/RSA_\(algorithm\)#Integer_factorization_and_RSA_problem) and [Technical Report by Robert D. Silverman, RSA Laboratories](http://www.rsa.com/rsalabs/node.asp?id=2007)
* Recommended value for the public exponent "e": [Wikipedia RSA (algorithm) - RSA Faulty Key Generation](http://en.wikipedia.org/wiki/RSA_\(algorithm\)#Faulty_Key_Generation)
