'use strict';

exports.helloworld = function(req, res) {

    res.json(
        {"hello": "world"}
    );

};

exports.getDates = function(req, res) {

    let country = req.query.country;
    let year = req.query.year;
    let month = req.query.month;

    const ApiModel = require('../models/apiModel');

    let apiModel = new ApiModel(country,year,month);
    let error = apiModel.checkParameters();

    if(error !== undefined){
        res.json(error);
        return;
    }


    apiModel.getHolidays(function (response) {

        let filteredResponse = [];

        for(let i = 0; i < response.length; i++){

            let holiday = response[i].date;
            holiday = holiday.substring(5,7);


            if(parseInt(holiday) === parseInt(month)){

                let data = {

                    name: response[i].localName,
                    date: response[i].date

                }

                filteredResponse.push(data);
            }

        }

        res.json(filteredResponse);
    });

};

