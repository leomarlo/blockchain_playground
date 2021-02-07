import elliptic from 'elliptic';

const ec = new elliptic.ec('secp256k1');

const key = ec.genKeyPair();

console.log({
  privateKey: key.getPrivate().toString(16),
  publicKey: key.getPublic().encode('hex'),
});
