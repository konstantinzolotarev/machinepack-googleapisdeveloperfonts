'use strict';

var google = require('googleapis');

module.exports = {


  friendlyName: 'List',


  description: 'List Web Fonts',


  cacheable: true,


  sync: false,


  idempotent: false,


  inputs: {
    key: {
      example: 'YOUR_API_KEY',
      description: 'Your API key',
      required: true
    },

    sort: {
      example: 'alpha',
      description: 'Enables sorting of the list',
      whereToGet: {
        url: 'https://developers.google.com/fonts/docs/developer_api'
      }
    },

    fields: {
      example: 'items,kind',
      description: 'Selector specifying which fields to include in a partial response.'
    }
  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    },

    accessNotConfigured: {
      variableName: 'err',
      description: 'Access Not Configured'
    }

  },


  fn: function(inputs, exits) {
    var params = {
      key: inputs.key
    };
    if (inputs.sort) {
      params.sort = inputs.sort;
    }
    if (inputs.fields) {
      params.fields = inputs.fields;
    }
    var webFonts = google.webfonts('v1');
    webFonts.webfonts.list(params, function(err, result) {
      if (err) {
        console.log(err, err.code);
        if (!err.code) {
          return exits.error(err);
        }
        switch(err.code) {
          case 403:
            return exits.accessNotConfigured(err);
            break;
          default:
            return exits.error(err);
            break;
        }
      }
      return exits.success(result);
    });
  }

};
