const nunjucks = require('nunjucks')
const fs = require("fs")
const path = require('path')

try {
    const projects_dir = './examples'
    let project_names = fs.readdirSync(projects_dir)

    project_names.forEach((project_name) => {
        console.log(`Reading project: ${project_name}`)

        let templates_dir = `${projects_dir}/${project_name}/templates`
        let profiles_dir = `${projects_dir}/${project_name}/profiles`
        let outputs_dir = `${projects_dir}/${project_name}/outputs`

        let profiles_path = profiles_dir + "/profiles.csv"

        let template_filenames = fs.readdirSync(templates_dir)
        template_filenames.forEach((template_filename) => {
            console.log(`\tReading template: ${template_filename}`)

            let template_extension = path.extname(template_filename)
            let template_name = path.basename(template_filename, template_extension)

            const input = fs.readFileSync(templates_dir + "/" + template_filename).toString()
            const renderer = nunjucks.compile(input)

            let profiles = csvJSON(profiles_path)
            profiles.forEach((profile) => {
                let profile_name = profile["profile"]
                console.log(`\t\tReading profile: ${profile_name}`)

                let output = renderer.render(profile)

                let output_path = outputs_dir + "/" + profile_name + "+" + template_name + template_extension
                fs.writeFileSync(output_path, output)
                console.log(`\t\t\tNew file saved in ${output_path}`)
            })
        })
    })
} catch (e) {
    console.log(e.toString())
}

function csvJSON(csv_path){
    let result = [];
    const newline = "\n"
    const separator = ';'

    const data = fs.readFileSync(csv_path).toString()
    const lines = data.split(newline);

    const headers = lines[0].split(separator);

    for(let i = 1; i < lines.length; i++){
        const current_values = lines[i].split(separator);

        let obj = {};
        for(let j = 0; j < headers.length; j++){
            obj[headers[j]] = current_values[j];
        }

        result.push(obj);
    }

    return result;
}
