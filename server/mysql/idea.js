const conn = require('./conn');
const Q = require('Q');

module.exports = (action) => {
  const deferred = Q.defer();
  switch (action.type) {
  case 'add':
    const params = action.params;
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
  default:
    break;
  }
  return deferred.promise;
};
