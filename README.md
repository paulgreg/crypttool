# crypttool

A simple encryption / decryption tool in JS using native Crypto API (AES 256 GCM & PBKDF2 for key derivation).

It uses browser’s native crypto API.

The output will contains the password salt, initiazation vector and encrypted message encoded in base64.
Since salt and IV are random, encrypting same message with same password will always produce a different output.

## Warning, security concerns

I build that tool to « play » with native crypto API.

I’m not a cryptograph expert so it may have bugs and not be as secure as it could/should be.

Do not use that for « important » things but more as a playground or as an example of what can be done in JS.

Use existing proven solution like OpenPGP for « important » purposes.
