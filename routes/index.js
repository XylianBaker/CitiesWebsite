const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// http://localhost:3000

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query) {
    deleteItem(filePath, req.query.delete);
  }
  res.render('index', { title: 'Cities', json:loadData(filePath)});
});

/* when the submit button is pressed, an item is added to a json file and displayed 🖥️ */
router.post('/', function (req, res) {
  storeData(req.body, filePath);
  res.render('index', {
    title: 'Cities',
    json: loadData(filePath)
  });
});

/* Read 📖 and write 🖊️ files 📁 */
const filePath = 'cities.json'
const fs = require('fs');

/* loads data of a given json file 🔃 */
const loadData = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch (err) {
    console.error(err)
    return false
  }
}

/* appends data in a json file 📩 */
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

/* deletes a selected item of a json file 🔥 */
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
