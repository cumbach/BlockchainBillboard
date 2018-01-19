// import { default as Web3 } from 'web3';
// import { default as contract } from 'truffle-contract';

var pixels = {};

// Calls on the contract to getCanvas and returns object of arrays
export const getCanvas = async (instance, account) => {
  var canvas = await instance.getCanvas(account, { from: account });

  var pixels = {
    ids: canvas[0],
    colors: canvas[1],
    urls: canvas[2],
    comments: canvas[3],
    prices: canvas[4]
  };

  return pixels;
};

// Calls getCanvas above
const fetchPixels = (instance,account) => {
  getCanvas(instance, account).then(response => {
    if (response) {
      pixels = response;
    }
  })
};

// Calls fetchPixels above
export const getPixels = async (instance, account) => {
  await fetchPixels(instance, account);
  return pixels;
};
