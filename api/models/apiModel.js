'use strict';



// Initializing a class definition
class apiModel {

    constructor(country, year, month) {
        this.country = country;
        this.year = year;
        this.month = month;
        this.holidays = [];
    }

    checkParameters(){

        let country = this.country;
        let year = this.year;
        let month = this.month;

        if(country === undefined ||
            year === undefined ||
            month === undefined){

            return {
                error:"No enviaste todos los parametros"
            };
        }

        country = country.toLowerCase();

        if(country !== "mx" && country !== "us"){

            return {
                error:"El pais que enviaste no es valido"
            };

        }

        if(year !== "2019" && !year !== "2020" && year !== "2021") {
            return {
                error:"El año que enviaste no es valido"
            };
        }

        if(month < 1 || month > 12 || !isNumber(month)) {
            return {
                error:"El mes que enviaste no es valido"
            };
        }



    }

    getHolidays(response){

        const https = require('https');

        https.get('https://date.nager.at/Api/v2/PublicHolidays/'+this.year+'/'+this.country, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {


                response(JSON.parse(data));

            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });



    }


}

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }


module.exports = apiModel;
