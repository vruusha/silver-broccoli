import {observable , action, runInAction, flow} from "mobx";
import service from "../service/service.js";

class Store {

    @observable transactionStore;
    @observable translations;
    @observable transactions = [];
    response=[];
    filters = [];
    @observable hasTranslations;
    selectedFilter = {
        "accountName": [],
         "transactionType": []
    };


    constructor() {
        this.fetchTranslations();
    }


    fetchTranslations = flow (function *() {

        try {
            const response  = yield service.getTranslations();

            this.hasTranslations = true;
            this.response = response[0].transactions;
            this.transactions = response[0].transactions;
            this.filters = response[1];

        } catch (error) {
            console.log('Error Loading the data');
        }


    })

    @action
    addFilter(filterName, filterType) {
        if (filterType === 'accountName') {
            this.selectedFilter["accountName"].push(filterName);

        } else {
            this.selectedFilter["transactionType"].push(filterName);

        }

        this.filterData();
        console.log(this.selectedFilter);
    }

    @action
    removeFilter (filterName, filterType) {
        if (filterType === 'accountName') {
            this.selectedFilter["accountName"]= this.selectedFilter["accountName"].filter(item => item !== filterName)

        } else {
            this.selectedFilter["transactionType"]= this.selectedFilter["transactionType"].filter(item => item !== filterName)

        }
        this.filterData();
    }

    @action
    filterData() {

        let filters = this.selectedFilter;

        let filtereList = this.multiFilter(this.response, filters);
        this.transactions = !!filtereList.length ? filtereList :  this.response;
        console.log(this.transactions);
    }

    multiFilter (arr ,filters) {
        const filterKeys = Object.keys(filters);

        return arr.filter(eachObj => {
            return filterKeys.every(eachKey => {
                if (!filters[eachKey].length) {
                    return true; // passing an empty filter means that filter is ignored.
                }
                return filters[eachKey].includes(eachObj[eachKey]);
            });
        });
    }
}

export {Store};
