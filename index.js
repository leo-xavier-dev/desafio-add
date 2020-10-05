var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/app'));
app.set('views', __dirname + '/app/parks/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('*', function(req, res){
    res.render('register.view.html');
});

app.listen(app.get('port'), function() {
});
