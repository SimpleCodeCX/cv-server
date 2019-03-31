const log4js = require('log4js');
const { GLOBAL_CONFIG } = require('../config/system.config');
/**
 * ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
 */
log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    logstash: {
      url: `${GLOBAL_CONFIG.logstashUrl}:9200/_bulk`,
      type: '@log4js-node/logstash-http',
      logType: 'application',
      logChannel: 'node',
      application: 'itti-assistant', // 名字必须小写
      layout: {
        type: 'pattern',
        pattern: '%m'
      }
    }
  },
  categories: {
    // default: { appenders: ['console'], level: log4js.levels.ALL },
    default: { appenders: ['console'], level: 'info' }, // 只输出到控制台
    logstash: { appenders: ['logstash'], level: 'info' },// 只输出到elk
    all: { appenders: ['console', 'logstash'], level: 'info' }// 同时输出到控制台以及elk
  }
});

const logstash_appender = GLOBAL_CONFIG.isDev ? 'default' : 'default';
const all_appender = GLOBAL_CONFIG.isDev ? 'default' : 'default';

module.exports = (category) => {
  if (!category) {
    // get filename
    const error = (new Error()).stack.toString().split('\n')[2] || '';
    category = (error.match(/[\\\/\(]([-\w\.]+.\w+):\d+:\d+\)$/) || [])[1] || 'unknow';
  }
  return log4js.getLogger(category);
};

// 只发送日志到elk
module.exports.logstash = log4js.getLogger(logstash_appender);
// 发送日志到elk，并且打印到控制台
module.exports.all = log4js.getLogger(all_appender);


