var web3 = window.web3;
var pixels = {};

// Calls on the contract to getCanvas and returns object of arrays
export const getCanvas = async (instance, account) => {
  // var canvas = await instance.getCanvas(account, { from: account });

  // var pixels = {
  //   ids: canvas[0],
  //   colors: canvas[1],
  //   prices: canvas[2],
  //   rentable: canvas[3],
  //   squatable: canvas[4]
  // };

  pixels = {
    ids: [0,1,2],
    red: [255,255,255],
    green: [5,5,5],
    blue: [4,4,4],
    prices: [0.2,0.2,0.2],
    rentable: [true, true, true],
    squatable: [true, true, true]
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



// Calls on Contract to buyPixels
export const buyPixels = async (instance, account, pixels) => {
  const transactionId = await instance.buyPixels.sendTransaction(pixels[0], pixels[1], pixels[2], pixels[3], web3.toWei(pixels[4], 'ether'), {from: account, value: web3.toWei(pixels[5], 'ether'), gas: 6385876});
  return transactionId;
};

// Calls on Contract to rentPixels
export const rentPixels = async (instance, account, pixels) => {
  const transactionId = await instance.rentPixels.sendTransaction(pixels[0], pixels[1], pixels[2], pixels[3], web3.toWei(pixels[4], 'ether'), {from: account, value: web3.toWei(pixels[5], 'ether'), gas: 6385876});
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
