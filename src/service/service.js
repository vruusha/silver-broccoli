const $ = require('jquery');

function fetchTranslation() {
    let transactionRequest = new Promise((resolve, reject) => {
        return resolve($.getJSON(getTranslationUrl('transaction')));
    });

    let filterRequest = new Promise((resolve, reject) => {
        return resolve($.getJSON(getTranslationUrl('filter')));
    });


    return Promise.all([transactionRequest, filterRequest]);
}

function getTranslationUrl(requestType) {
    let translationMap = {
        filter : 'dist/translation.json',
        transaction: 'dist/data.json'
    };
    return translationMap[requestType];
}

 function getTranslations() {

    let translation =   fetchTranslation();

    return translation;
}

export default {getTranslations};