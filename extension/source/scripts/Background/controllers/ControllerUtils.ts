import store from 'state/store';
import { updateFiatPrice } from 'state/price';
import {
  ASSET_PRICE_API,
  DEFAULT_CURRENCY,
  PRICE_SYS_ID,
} from 'constants/index';

export interface IControllerUtils {
  appRoute: (newRoute?: string) => string;
  updateFiat: (currency?: string, assetId?: string) => Promise<void>;
}

const ControllerUtils = (): IControllerUtils => {
  let route = '/app.html';

  const appRoute = (newRoute?: string) => {
    if (newRoute) {
      route = newRoute;
    }
    return route;
  };

  const updateFiat = async (
    currency = DEFAULT_CURRENCY.id,
    assetId = PRICE_SYS_ID
  ) => {
    try {
      const data = await (
        await fetch(
          `${ASSET_PRICE_API}?currency=${currency}`
        )
      ).json();
      if (data) {
        store.dispatch(
          updateFiatPrice({ assetId, price: data['rates'][currency] })
        );
      }
    } catch (error) {
      console.log('<!> Fetching asset price error: ', error);
    }
  };

  return {
    appRoute,
    updateFiat,
  };
};

export default ControllerUtils;
