const express = require('express');
const path = require('path');

const app = express();

//app.use(express.static(__dirname + '/dist/<FOLDER_NAME>'));
app.use(express.static('${__dirname}/dist/animator'));

app.get('*', (req, res) => {
    res.sendFile(__dirname+`/dist/animator/index.html`); // load the single view file (angular will handle the page changes on the front-end)
});

/*app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname + '/dist/dictionary/index.html'));
});
*/

app.listen(process.env.PORT || 8000);