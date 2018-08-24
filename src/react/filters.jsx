import {observer} from "mobx-react";
import React from "react";

function FilterView (props) {

    return (<div className="col-12">
        <div className="card">
            <div className="card-body">
                <div>{props.filter.filterName}</div>


                {Object.keys(props.filter.filters).map(key => {
                    return (<RenderFilterList store = {props.store} filterType={props.filter.filterType} filterKey={key} filterValue={props.filter.filters[key]}/>);
                })}
            </div>
        </div>
    </div>);
};

function RenderFilterList(props) {

    return <div className="form-check">
        <input className="form-check-input" type="checkbox" name={props.filterKey} id={props.filterKey}
               value={props.filterValue} onClick={(e)=>onfilterSelection(e,props.store, props.filterType)}/>
        <label className="form-check-label" htmlFor="exampleRadios1">
            {props.filterValue}
        </label>
    </div>
}

function onfilterSelection(e, store, filterType) {
    console.log(store);
    console.log(e.target.name);
    console.log(e.target.checked);
    console.log(filterType);


    if (!!e.target.checked) {
        store.addFilter(e.target.value, filterType);
    } else  {
        store.removeFilter(e.target.value, filterType);
    }

}

@observer
export class Filters extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {filters : {filterTypes}} = this.props.store;
        return <div>

            <div className="row">
                <div className="col-12">
                    Filters
                </div>
                {filterTypes.map(filter => {
                    return <FilterView store={this.props.store} filter={filter}/>
                })}
            </div>

        </div>;
    }

}