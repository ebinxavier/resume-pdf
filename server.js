const express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    convertHTMLToPDF = require('pdf-puppeteer'),
    fs = require('fs'),
    Handlebars = require('handlebars');

// Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
//     debugger
//     console.log('arg1', arg1)
//     console.log('arg2', arg2)
//     return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
// });


const app = express();
const router = express.Router();
app.use(express.static('client'))

router.route('/pdf').get(async function(req, res) {
    const source = fs.readFileSync('./templates/simple.hbs', "utf8");
    const data = JSON.parse(fs.readFileSync('./data.json', "utf8"))


    const template = Handlebars.compile(source);
    const result = template(data);
    convertHTMLToPDF(
        result,
        pdf => {
            res.setHeader('Content-Type', 'application/pdf');
            res.send(pdf);
        },
        { // PDF options
            preferCSSPageSize: true,
            printBackground: true,
            margin: { top: "1cm", bottom: "1cm", left: "1cm", right: "1cm" }
        },
        null,
        true
    ).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});

router.route('/pdf').post(async function(req, res) {
    // Expected 'templateName' and 'data' in req.body
    console.log('req.body', req.body);
    if(!(req.body.template && req.body.data)){
        res.send({status:"error"});
        return;
    }
    const source = fs.readFileSync('./templates/'+req.body.template+'.hbs', "utf8");
    const data = req.body.data;


    const template = Handlebars.compile(source);
    const result = template(data);
    convertHTMLToPDF(
        result,
        pdf => {
            res.setHeader('Content-Type', 'application/pdf');
            res.send(pdf);
        },
        { // PDF options
            preferCSSPageSize: true,
            printBackground: true,
            margin: { top: "1cm", bottom: "1cm", left: "1cm", right: "1cm" }
        },
        null,
        true
    ).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});

// Test route
router.route('/html').get(async function(req, res) {
    const source = fs.readFileSync('./templates/simple.hbs', "utf8");
    const data = JSON.parse(fs.readFileSync('./data.json', "utf8"))


    const template = Handlebars.compile(source);
    const result = template(data);
    res.send(result);
});

app.use(
    bodyParser.json({
        limit: '50mb'
    })
);

app.use('/api', router);

// Start the server.
var port = 3000 || process.env.PORT;
http.createServer(app).listen(port);
console.log('Server listening on port ' + port);
console.log("PDF: http://localhost:"+port+"/api/pdf\nHTML: http://localhost:"+port+"/api/html")