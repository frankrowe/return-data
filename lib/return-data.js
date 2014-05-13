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

function returnData(res, data, iscsv, name) {
  if(iscsv) {
    name = name.replace(/,/g, '').replace(/\s/g, '') //remove spaces + commas
    var rows = makeCSVfromJSON(data)
    var result = []
    csv()
    .from.array(rows)
    .to.string(function(output){
      res.contentType('csv')
      res.set('Content-disposition', 'attachment;filename=' + name + '.csv')
      res.send(output)
    })
  } else {
    res.json(data)
  }
}

module.exports = returnData
