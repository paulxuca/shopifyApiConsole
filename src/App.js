import React, { Component } from 'react';
import { endpoints } from './constants/endpoints';
import { shopifyAuthUrl, getDetailsFromUrl, getApiRequest } from './constants/helpers';
import EndpointListItem from './components/EndpointListItem';
import Loading from 'react-loading';
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
      creatingStore: false,
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
    if (endPoint !== this.state.currentEndpoint) this.setState({ currentEndpoint: endPoint });
  }

  onChangeListItem = (newData) => {
    const { value } = newData.target;
    if (value === 'CREATENEW' && !this.state.creatingStore) {
      this.setState({ creatingStore: true });
    } else {
      this.setState({
        currentStore: value,
      });
    }
  }

  renderLoader() {
    return(
      <div className="fullScreenLoader">
        <Loading type="bubbles" width="100px" />
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoading ? this.renderLoader() : null}
        <div className="appSidebar">
          <div className="appSidebarContainer">
            <h6 className="apiHeader">Api Reference</h6>
            <p className="apiDescription">Explore Shopify's 35+ API endpoints through this interactive portal.</p>
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
            <ApiCaller />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
