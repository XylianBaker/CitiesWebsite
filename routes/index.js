var express = require('express');
var router = express.Router();

// http://localhost:3000

const bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cities', json:loadData(filePath)});
  if (req.query) {
    deleteItem(filePath, req.query.delete);
  }
});

router.post('/', function (req, res) {
  storeData(req.body, filePath);
  res.render('index', {
    title: 'Cities',
    json: loadData(filePath)
  });
});

// Read 📖 and write 🖊️ files 📁
const filePath = 'cities.json'
const fs = require('fs');

const loadData = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch (err) {
    console.error(err)
    return false
  }
}

const storeData = (data, filePath) => {
  try {
    var obj = JSON.parse(loadData(filePath));
    obj.cities.push(data);
    var json = JSON.stringify(obj);
    fs.writeFileSync(filePath, json);
  } catch (err) {
    console.error(err)
  }
}

const deleteItem = (filePath, index) => {
  try {
    var obj = JSON.parse(loadData(filePath));
    obj.cities.splice(index, index);
    var json = JSON.stringify(obj);
    fs.writeFileSync(filePath, json);
  } catch (err) {
    console.error(err)
    return false
  }
}

module.exports = router;
