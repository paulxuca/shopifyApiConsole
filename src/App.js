import React, { Component } from 'react';
import { endpoints } from './constants/endpoints';
import { shopifyAuthUrl, getDetailsFromUrl, getApiRequest } from './constants/helpers';
import EndpointListItem from './components/EndpointListItem';
import MethodsList from './components/MethodsList';
import Loader from './components/Loader';
import './App.css';

import ApiCaller from './ApiCaller';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEndpoint: '',
      enteredStoreName: '',
      isLoading: false,
      currentStore: false,
      currentStoreToken: false,
      creatingStore: false,
      endpointData: false,
      fieldsData: false,
      storeList: [],
    }
  }

  componentWillMount() {
    if (window.location.search) {
      this.setState({ isLoading: true });
      const { code, shop } = getDetailsFromUrl();
      getApiRequest(code, shop).then((data) => {
        this.pushShopsFromLocalStorage();
      })
      .catch((error) => {
        console.log(error);
      });
    }
    this.pushShopsFromLocalStorage();
  }

  pushShopsFromLocalStorage() {
    const stores = [];
    for (var key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        stores.push({
          shop: key,
          accessToken: localStorage[key]
        });
      }
    }
    this.setState({
      storeList: stores,
      isLoading: false
    });
  }

  onCreateNewStore() {
    if (!this.state.storeList.find(each => each.shop.toLowerCase() === this.state.enteredStoreName.toLowerCase())) {
      window.open(shopifyAuthUrl(this.state.enteredStoreName), '_self')
    }
  }

  onListItemClick = (endPoint) => {
    if (endPoint !== this.state.currentEndpoint){
      this.setState({
        currentEndpoint: endPoint,
        endpointData: endpoints.find((each) => each.name === endPoint)
      });
    }
  }

  onChangeListItem = (newData) => {
    const { value } = newData.target;
    if (value === 'CREATENEW' && !this.state.creatingStore) {
      this.setState({ creatingStore: true });
    } else {
      this.setState({
        currentStore: value,
        currentStoreToken: localStorage.getItem(value),
      });
    }
  }

  onClickEndpoint = (newCurrentEndpoint) => {
    this.setState({
      fieldsData: newCurrentEndpoint,
    });
  }

  renderLoader() {
    return(
      <Loader />
    );
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoading ? this.renderLoader() : null}
        <div className="appSidebar">
          <div className="appSidebarContainer">
            <h6 className="apiHeader">Api Reference</h6>
            <p className="apiDescription">Explore Shopify's {endpoints.length} (currently implemented) API endpoints through this interactive portal.</p>
            <ul className="apiEndpointsList">
              {endpoints.map((each, index) =>
                <EndpointListItem
                  key={index}
                  data={each}
                  onClickEndpoint={this.onListItemClick}
                  selected={this.state.currentEndpoint === each.name}
                />)}
            </ul>
            <select className="storeSelect" value={this.state.currentStore || 'initial'} onChange={this.onChangeListItem}>
              <option value="initial" disabled>Select a store...</option>
              <option value='CREATENEW'>Add new Store</option>
              {this.state.storeList ? this.state.storeList.map((each) => <option value={each.shop} key={each.accessToken}>{each.shop}</option>) : null}
            </select>
            {this.state.creatingStore ?
              <div className="inputStoreCreation">
                <input
                  type="text"
                  placeholder="Store name"
                  value={this.state.enteredStoreName}
                  onChange={(e) => this.setState({ enteredStoreName: e.target.value })}
                  style={{ padding: 10, flex: 3 }} />
                <button onClick={() => this.onCreateNewStore()} className="buttonblue" style={{ flex: 1 }}>Add Store</button>
              </div> :
              null
            }
          </div>
        </div>

        <div className="appContent">
          <div className="appContentContainer">
            <h2 className="apiDocsHeader">{this.state.currentEndpoint}</h2>
            <div dangerouslySetInnerHTML={{__html: this.state.endpointData.description}} />
            <MethodsList
              data={this.state.endpointData.actions}
              dataType={this.state.currentEndpoint}
              onClickEndpoint={this.onClickEndpoint}
            />
          </div>
        </div>
          <ApiCaller
            fields={this.state.fieldsData}
            storeName={this.state.currentStore}
            storeToken={this.state.currentStoreToken}
          />
      </div>
    );
  }
}

export default App;
