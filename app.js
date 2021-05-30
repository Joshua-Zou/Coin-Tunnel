const express = require('express');
const app = express();

var secrets;
if (process.env.secrets){
  secrets = JSON.parse(process.env.secrets)
}else{
  secrets = require("./secret.json")
}

let port = process.env.PORT || 3000;
let secret = secrets.reqsession;
app.set('port', port);

const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.static('static'));
let sessionParser = session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    expires: 604800000,
})
app.use(sessionParser);
require('./router')(app);

app.listen(port, () => console.info(`Listening on port ${port}`));