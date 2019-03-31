const devConfig = require('./dev.config');
const devServer = require('./dev-server.config');
const prodConfig = require('./prod.config');

function generateGlobalConfig() {
  let globalConfig = {
    mariadb: devConfig.mariadb,
    isDev: /^dev.*/.test(process.env.npm_lifecycle_event),
    logstashUrl: '148.70.160.165'
  };
  switch (process.env.npm_lifecycle_event) {
    case 'dev': {
      globalConfig = Object.assign(globalConfig, {
        mariadb: devConfig.mariadb
      })
      break;
    }
    case 'devServer': {
      globalConfig = Object.assign(globalConfig, {
        mariadb: devServer.mariadb
      })
      break;
    }
    case 'prod': {
      globalConfig = Object.assign(globalConfig, {
        mariadb: prodConfig.mariadb
      })
      break;
    }
    default: {
      globalConfig = Object.assign(globalConfig, {
        mariadb: devConfig.mariadb
      })
      break;
    }
  }
  return globalConfig;
}
console.log('************************************');
console.log(`global config: `);
console.log(generateGlobalConfig());
console.log('************************************');
exports.GLOBAL_CONFIG = generateGlobalConfig();



