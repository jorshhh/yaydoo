'use strict';

module.exports = function(app) {
    let controller = require('../controllers/apiController');


    // todoList Routes
    app.route('/')
        .get(controller.helloworld)

    // todoList Routes
    app.route('/holidays')
        .get(controller.getDates)

};
