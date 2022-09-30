# crypttool

A simple encryption / decryption tool in JS using native Crypto API (AES 256 CBC & PBKDF2 for key derivation).

It uses browser’s native crypto API.

The output will contains the password salt, initiazation vector and encrypted message encoded in base64.
Since salt and IV are random, encrypting same message with same password will always produce a different output.
