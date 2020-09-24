const nunjucks = require('nunjucks')
const fs = require("fs")

try {
    console.log("Reading template...")
    const input = fs.readFileSync("./examples/templates/basic/index.html").toString()

    console.log("Reading profile...")
    const profile = JSON.parse(fs.readFileSync("./examples/templates/basic/profiles/profile1.json").toString())

    console.log("Checking template...")
    const template = nunjucks.compile(input)

    console.log("Generating file...")
    const output = template.render(profile)

    console.log("File generated...")
    console.log(output)

    console.log("Saving file...")
    fs.writeFileSync("./examples/outputs/basic/index+profile1.html", output)
} catch (e) {
    console.log(e.toString())
}
