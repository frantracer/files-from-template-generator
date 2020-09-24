const nunjucks = require('nunjucks')

console.log("hola mundo")

var template = nunjucks.compile('Hello {{ username }}');
var output = template.render({ username: 'James' });

console.log(output)