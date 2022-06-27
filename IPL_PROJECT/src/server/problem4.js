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
function calculate(matches_file_data, deliveries_file_data) {

    let all_matches_ids_of_year_2015 = {};
    for(match_detail of matches_file_data){    
        let year_of_the_match = parseInt(match_detail['season']);
        if(year_of_the_match==2015){
            let match_id_of_the_match = match_detail['id'];
            all_matches_ids_of_year_2015[match_id_of_the_match] = -1;
        }
    }
    console.log(all_matches_ids_of_year_2015);

    all_bowlers_of_2015_data = {}
    for(delivery_detail of deliveries_file_data){
        delivery_match_id = delivery_detail['match_id'];
        if(all_matches_ids_of_year_2015.hasOwnProperty(delivery_match_id)){
            let bowler_name = delivery_detail['bowler'];
            if(!all_bowlers_of_2015_data.hasOwnProperty(bowler_name)){
                all_bowlers_of_2015_data[bowler_name] = [0, 0, 0];
            }
            
            let total_runs_given_by_the_bowler = delivery_detail['total_runs'];
            all_bowlers_of_2015_data[bowler_name][0] += parseInt(total_runs_given_by_the_bowler);

            all_bowlers_of_2015_data[bowler_name][1] += 1;

            let current_economy_of_bowler = all_bowlers_of_2015_data[bowler_name][0]/all_bowlers_of_2015_data[bowler_name][1];
            current_economy_of_bowler *= 6;

            all_bowlers_of_2015_data[bowler_name][2] = current_economy_of_bowler;
        }
    }
    console.log(all_bowlers_of_2015_data);
}

function execute() {
    const csv_to_json_converter = require("convert-csv-to-json")
    
    const matches_file_math = "/home/hp/Desktop/MOUNTBLUE/JS_PROJECTS/IPL_PROJECT/src/data/matches.csv"
    const matches_file_data = csv_to_json_converter.fieldDelimiter(",").getJsonFromCsv(matches_file_math)

    const deliveries_file_math = "/home/hp/Desktop/MOUNTBLUE/JS_PROJECTS/IPL_PROJECT/src/data/deliveries.csv"
    const deliveries_file_data = csv_to_json_converter.fieldDelimiter(",").getJsonFromCsv(deliveries_file_math)
    
    const output_json_file_path = "/home/hp/Desktop/MOUNTBLUE/JS_PROJECTS/IPL_PROJECT/src/public/output/problem3.json"

    all_teams_of_2016_with_extra_runs_counts = calculate(matches_file_data, deliveries_file_data);
    // dump_json_file(output_json_file_path, all_teams_of_2016_with_extra_runs_counts);

}

execute()