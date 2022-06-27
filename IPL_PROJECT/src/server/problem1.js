function dump_json_file(output_json_file_path, data_to_dump_in_file){
    let fileSystem = require('fs')
    let string_format_of_dump_data = JSON.stringify(data_to_dump_in_file);
    fileSystem.writeFile(output_json_file_path, string_format_of_dump_data, (err) => {
        if (err) {
            console.log(err);
        }
    })
    console.log("JSON created !");
}
function calculate(matches_file_data) {
    let all_years_matches_counts = {};
    for (let match_detail of matches_file_data) {
        let year_of_match = parseInt(match_detail['season']);
        if (!all_years_matches_counts.hasOwnProperty(year_of_match)) {
            all_years_matches_counts[year_of_match] = 1;
        }
        else {
            all_years_matches_counts[year_of_match] += 1;
        }
    }
    return all_years_matches_counts;
}

function execute() {
    const csv_to_json_converter = require("convert-csv-to-json")
    
    const matches_file_math = "/home/hp/Desktop/MOUNTBLUE/JS_PROJECTS/IPL_PROJECT/src/data/matches.csv"
    const output_json_file_path = "/home/hp/Desktop/MOUNTBLUE/JS_PROJECTS/IPL_PROJECT/src/public/output/problem1.json"
    const matches_file_data = csv_to_json_converter.fieldDelimiter(",").getJsonFromCsv(matches_file_math)

    require('fs')

    all_years_matches_counts = calculate(matches_file_data);
    dump_json_file(output_json_file_path, all_years_matches_counts);

}

execute()