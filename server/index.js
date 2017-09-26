const express = require('express');
const bodyParser = require('body-parser');
const mc = require( `${__dirname}/controllers/messages_controller` );

const app = express();
const session = require('express-session');
const createInitialSession = require(`${__dirname}/middlewares/session`);
const filter = require(`${__dirname}/middlewares/filter`);

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../public/build` ) );
app.use(session({
  secret: '$0m3tH1nG',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 10000}
}));

app.use((req,res,next) => createInitialSession(req,res,next));
app.use((req,res,next) => {
  const {method} = req;
  if(method === "POST" || method === "PUT"){
    filter(req,res,next);
  } else {
    next();
  }
})

const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.get(`${messagesBaseUrl}/history`, mc.history);
app.put( `${messagesBaseUrl}`, mc.update );
app.delete( `${messagesBaseUrl}`, mc.delete );

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
