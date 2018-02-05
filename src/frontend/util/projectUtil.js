var web3 = window.web3;
var pixels = {};

// Calls on the contract to getCanvas and returns object of arrays
export const getCanvas = async (instance, account) => {
  var canvas = await instance.getCanvas(account, { from: account, gas: 6385876 });

  pixels = {
    ids: canvas[0].map(function(el){return parseInt(el, 10)}),
    colors: canvas[1].map(function(el){return parseInt(el, 10)}),
    prices: canvas[2].map(function(el){return parseInt(el, 10)}),
    buyable: canvas[3],
    rentable: canvas[4],
    squatable: canvas[5]
  };

  return pixels;
};
// Calls getCanvas above
const fetchPixels = async (instance,account) => {
  const response = await getCanvas(instance, account);
  if (response) {
    pixels = response;
  }
};
// Calls fetchPixels above
export const getPixels = async (instance, account) => {
  await fetchPixels(instance, account);
  return pixels;
};



// Calls on Contract to buyPixels
export const buyPixels = async (instance, account, pixels) => {
  const transactionId = await instance.buyPixels.sendTransaction(pixels[0], pixels[1], pixels[2], pixels[3], pixels[4], {from: account, value: web3.toWei(pixels[5], 'ether'), gas: 6385876});
  return transactionId;
};

// Calls on Contract to rentPixels
export const rentPixels = async (instance, account, pixels) => {
  const transactionId = await instance.rentPixels.sendTransaction(pixels[0], pixels[1], pixels[2], {from: account, value: web3.toWei(pixels[3], 'ether'), gas: 6385876});
  return transactionId;
};

// Calls on Contract to rentPixels
export const drawPixels = async (instance, account, pixels) => {
  const transactionId = await instance.drawPixels.sendTransaction(pixels[0], pixels[1], pixels[2], pixels[3], web3.toWei(pixels[4], 'ether'), {from: account, value: web3.toWei(pixels[5], 'ether'), gas: 6385876});
  return transactionId;
};

// Calls on Contract to rentPixels
export const managePixels = async (instance, account, pixels) => {
  const transactionId = await instance.managePixels.sendTransaction(pixels[0], pixels[1], pixels[2], pixels[3], web3.toWei(pixels[4], 'ether'), {from: account, value: web3.toWei(pixels[5], 'ether'), gas: 6385876});
  return transactionId;
};

// function buyPixels(uint[] _pixelIds, uint32[] _colors, uint128 _sellingPrice)
// function rentPixels(uint[] _pixelIds, uint32[] _colors)
// function drawPixels(uint[] _pixelIds, uint32[] _colors)
// function managePixels(uint[] _pixelIds, uint32[] _colors, uint128 _sellingPrice)
// function getCanvas() returns (_pixelIds, _colors, _prices, _rentable, _squatable)
