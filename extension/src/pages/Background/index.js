console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.browserAction.onClicked.addListener((tab) => {
  console.log(tab)
})