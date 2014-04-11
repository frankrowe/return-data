var csv = require('csv')

function makeCSVfromJSON(data) {
  var rows = []
  var keys = Object.keys(data[0])
  rows.push(keys)
  data.forEach(function(obj){
    var row = []
    keys.forEach(function(key){
      row.push(obj[key])
    })
    rows.push(row)
  })
  return rows
}

function returnData(req, res, data) {
  if(req.query.csv) {
    var rows = makeCSVfromJSON(data)
    csv()
    .from.array(rows)
    .to.string(function(output){
      res.contentType('csv')
      res.send(output)
    })
  } else {
    res.json(data)
  }
}

module.exports = returnData