const conn = require('./conn');
const Q = require('Q');
const dateFormat = require('dateformat');

module.exports = (action) => {
  const deferred = Q.defer();
  const params = action.params;
  switch (action.type) {
  case 'add':
    let fields = [];
    let values = [];
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        let val = params[key];
        fields.push('`' + key + '`');
        val = "'" + val.replace(/'/g, "\\'") + "'";
        values.push(val);
      }
    }
    fields = fields.join(', ');
    values = values.join(', ');
    conn.query(
      'insert into `ideas` (' + fields + ') values(' + values + ')',
      (err, rows, fields) => {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(rows);
        }
      }
    );
    break;
  case 'get':
    let sql;
    if (params.type === 'latest') {
      sql = 'select * from `ideas` where `isDeleted` = \'false\' limit 0, 10 ';
    } else {
      sql = 'select * from `ideas` where `isDeleted` = \'false\' and `type` = \'' + params.type + '\' ';
    }
    conn.query(sql, (err, rows, fields) => {
      const recs = rows.map((rec) => {
        rec.createTime = dateFormat(rec.createTime, 'yyyy-mm-dd HH:MM:ss');
        return rec;
      });
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(recs);
      }
    });
    break;
  default:
    break;
  }
  return deferred.promise;
};
