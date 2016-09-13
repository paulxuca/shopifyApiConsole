var restify = require('restify');
var axios = require('axios');

var server = restify.createServer({
  name: 'shopifyAuthServer',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS({
}));

server.get('/auth', function (req, res, next) {
  var body = req.params;
  axios
  .post('https://' + body.shop + '.myshopify.com/admin/oauth/access_token',{
    code: body.code,
    client_secret: body.client_secret,
    client_id: body.client_id
  })
  .then(function(data) {
    res.send({
      shop: body.shop,
      accessToken: data.data.access_token
    });
  })
  .catch(function(error) {
    res.send(error);
  });  
  return next();
});

server.listen(3001, function () {
  console.log('%s listening at %s', server.name, server.url);
});