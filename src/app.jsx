import React, { Component} from "react";
import {inject} from "mobx-react";
import {hot} from "react-hot-loader";
import "./app.css";
import {Header} from './react/header.jsx';
import {Transaction} from './react/transactionList.jsx';
import {Filters} from './react/filters.jsx';


@inject('store')
class App extends Component{
  render(){
      const {store} =  this.props;
    return(
      <div className="container-fluid">
          <Header/>
          <div className="row">
              <div className="col">
                  <Filters store={store}></Filters>
              </div>
              <div className="col-9">
                  <Transaction store={store}/>
              </div>
          </div>
      </div>
    );
  }
}

export default hot(module)(App);