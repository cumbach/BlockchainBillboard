var web3 = window.web3;
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



// Calls on Contract to buyPixels
export const buyPixels = async (instance, account, pixels) => {
  const transactionId = await instance.buyPixels.sendTransaction(pixels[0], pixels[1], pixels[2], pixels[3], web3.toWei(pixels[4], 'ether'), {from: account, value: web3.toWei(pixels[5], 'ether'), gas: 6385876});
  return transactionId;
};
