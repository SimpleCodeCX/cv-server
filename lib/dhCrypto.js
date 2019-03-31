const logger = require('./logger')();
const common = require('./common');
const crypto = require('crypto');
// 密钥协商协议
class DHCrypto {
  constructor() {
    this.pubN = common.randomN(1, 99999);
    this.modN = common.randomN(1, 99999);
    this.sPrivN = common.randomN(1, 99999);
    while (this.pubN % this.modN === 0 || this.modN % this.pubN === 0) {
      this.pubN = common.randomN(1, 99999);
    }
    while (this.sPrivN % this.modN === 0 || this.modN % this.sPrivN === 0) {
      this.sPrivN = common.randomN(1, 99999);
    }
    this.sPubResultN = this.pubN * this.sPrivN % this.modN;
  }

  getPubN() {
    return this.pubN;
  }

  getModN() {
    return this.modN;
  }

  getSPubResultN() {
    return this.sPubResultN;
  }

  generateSecretKey(_cPubResultN) {
    if (!_cPubResultN) {
      logger.info('error:_cPubResultN is must be number.');
      return '';
    }
    let sKeyN = _cPubResultN * this.sPrivN % this.modN;
    sKeyN = sKeyN + this.modN + 1;
    const hash = crypto.createHash('sha1');
    hash.update(sKeyN.toString());
    return hash.digest('hex');
  }

}

const dhCrypto = new DHCrypto;
module.exports = dhCrypto;