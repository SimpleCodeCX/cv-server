const devConfig = require('./dev.config');
const devServer = require('./dev-server.config');
const prodConfig = require('./prod.config');
function generateGlobalConfig() {
  let globalConfig = {
    mariadb: devConfig.mariadb,
    isDev: /^dev.*/.test(process.env.npm_lifecycle_event),
    logstashUrl: devConfig.logstashUrl
  };
  switch (process.env.npm_lifecycle_event) {
    case 'dev': {
      globalConfig = Object.assign(globalConfig, {
        mariadb: devConfig.mariadb,
        logstashUrl: devConfig.logstashUrl
      });
      break;
    }
    case 'devServer': {
      globalConfig = Object.assign(globalConfig, {
        mariadb: devServer.mariadb,
        logstashUrl: devServer.logstashUrl
      });
      break;
    }
    case 'prod': {
      globalConfig = Object.assign(globalConfig, {
        mariadb: prodConfig.mariadb,
        logstashUrl: prodConfig.logstashUrl
      });
      break;
    }
    default: {
      globalConfig = Object.assign(globalConfig, {
        mariadb: devConfig.mariadb,
        logstashUrl: devConfig.logstashUrl
      });
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



