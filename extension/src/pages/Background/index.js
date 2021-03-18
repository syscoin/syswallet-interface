import store, { handleLoadState } from '../../store/store';
import { wrapStore } from 'webext-redux';

wrapStore(store);

chrome.runtime.onMessage.addListener((message) => {
  console.log('message received', message)
});

if (module.hot) module.hot.accept();
