import axios from 'axios';
import { 
  api_key,
  scopes,
  appURL,
  authURL,
  reqURL,
  shared_secret
} from './constants';

export const shopifyAuthUrl = (shopName) => {
  return `https://${shopName}.myshopify.com/admin/oauth/authorize?client_id=${api_key}&scope=${scopes.join(',')}&redirect_uri=${appURL}&state=${shared_secret}`;
}


export const getDetailsFromUrl = () => {
  const queries = window.location.search.split(/\?|&/).splice(1).filter((each) => each.match(/code|shop/));
  return {
    code: queries[0].split('code=')[1],
    shop: queries[1].split('shop=')[1].split('.my')[0],
  } 
}

export const getApiRequest = (code, shop) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: authURL,
      params: {
        code,
        shop,
        client_secret: shared_secret,
        client_id: api_key,
      }
    })
    .then((data) => {
      localStorage.setItem(data.data.shop, data.data.accessToken);
      resolve(data.data);
    })
    .catch((error) => reject(error));
  });
}

export const performApiRequest = (store, accessToken, endpoint, method, formData) => {
  return new Promise((resolve, reject) => {
    const axiosParms = {};
    axiosParms['method'] = method;
    axiosParms['url'] = `https://${store}.myshopify.com${endpoint}`;
    if (method === 'GET') {
      axiosParms['params'] = formData;
    } else {
      axiosParms['data'] = formData;
    }
    axiosParms['headers'] = {
      'X-Shopify-Access-Token': accessToken
    };
    console.log(axiosParms);
    axios({
      method: 'GET',
      url: reqURL,
      params: {
        axiosData: axiosParms
      }
    })
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error);
    });
  });
}