/* jshint node: true */

module.exports = {
  production: {
    assets: {
      gzip: false,
      type: 'rsync',
      dest: process.env.KOWA_CLIENT_RSYNC_DEST,
      ssh: true,
      port: 22,
      privateKey: process.env.KOWA_SSH_PRIVATE_KEY,
      args: ['-avz', '--no-p']
    }
  }
};
