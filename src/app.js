const nunjucks = require('nunjucks')
const fs = require("fs")
const path = require('path')

try {
    let templates_dir = "./examples/basic/templates"
    let profiles_dir = "./examples/basic/profiles"
    let outputs_dir = "./examples/basic/outputs"

    let template_filenames = fs.readdirSync(templates_dir)
    template_filenames.forEach((template_filename) => {
        console.log(`Reading template: ${template_filename}`)

        let template_extension = path.extname(template_filename)
        let template_name = path.basename(template_filename, template_extension)

        const input = fs.readFileSync(templates_dir + "/" + template_filename).toString()
        const renderer = nunjucks.compile(input)

        let profile_filenames = fs.readdirSync(profiles_dir)
        profile_filenames.forEach((profile_filename) => {
            console.log(`\tReading profile: ${profile_filename}`)
            let profile = JSON.parse(fs.readFileSync(profiles_dir + "/" + profile_filename).toString())
            let profile_name = path.basename(profile_filename, ".json")

            let output = renderer.render(profile)

            let output_path = outputs_dir + "/" + template_name + "+" + profile_name + template_extension
            fs.writeFileSync(output_path, output)
            console.log(`\t\tNew file saved in ${output_path}`)
        })
    })
} catch (e) {
    console.log(e.toString())
}
