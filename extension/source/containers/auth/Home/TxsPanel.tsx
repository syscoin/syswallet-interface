import * as React from 'react';
import { FC, Fragment, useCallback, useState } from 'react';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import UpArrowIcon from '@material-ui/icons/ArrowUpward';
import GoTopIcon from '@material-ui/icons/VerticalAlignTop';
import IconButton from '@material-ui/core/IconButton';
import Spinner from '@material-ui/core/CircularProgress';
import Button from 'components/Button';

import { useController } from 'hooks/index';
import { formatDistanceDate } from '../helpers';
import SyscoinIcon from 'assets/images/logosys.svg';
import { SYS_EXPLORER_SEARCH } from 'constants/index';
import { Transaction, Assets } from '../../../scripts/types';

import styles from './Home.scss';

interface ITxsPanel {
  address: string;
  transactions: Transaction[];
  assets: Assets[];
}

const TxsPanel: FC<ITxsPanel> = ({ transactions, assets }) => {
  // const getFiatAmount = useFiat();
  const controller = useController();
  const [isShowed, setShowed] = useState<boolean>(false);
  const [isActivity, setActivity] = useState<boolean>(true);
  const [scrollArea, setScrollArea] = useState<HTMLElement>();
  // const [assetsTypes, setAssets] = useState<Array<String>>([]);

  const isShowedGroupBar = useCallback(
    (tx: Transaction, idx: number) => {
      return (
        idx === 0 ||
        new Date(tx.blockTime * 1e3).toDateString() !==
        new Date(transactions[idx - 1].blockTime * 1e3).toDateString()
      );
    },
    [transactions]
  );

  const TokenTypeGroupBar = useCallback(
    (asset: Assets, idx: number) => {
      console.log(assets)
      console.log(idx)
      return (
        idx === 0 || controller.wallet.account.isNFT(asset.assetGuid) !==
        controller.wallet.account.isNFT(assets[idx - 1].assetGuid)
      );
    },
    [assets]
  );

  const handleFetchMoreTxs = () => {
    if (transactions.length) {
      controller.wallet.account.updateTxs();
    }
  };

  const handleScroll = useCallback((ev) => {
    ev.persist();
    if (ev.target.scrollTop) setShowed(true);
    setScrollArea(ev.target);
    const scrollOffset = ev.target.scrollHeight - ev.target.scrollTop;
    if (scrollOffset === ev.target.clientHeight) {
      handleFetchMoreTxs();
    }
  }, []);

  const handleOpenExplorer = (txid: string) => {
    window.open(SYS_EXPLORER_SEARCH + '/tx/' + txid);
  };

  const handleOpenAssetExplorer = (txid: number) => {
    window.open(SYS_EXPLORER_SEARCH + '/asset/' + txid);
  };

  const handleGoTop = () => {
    scrollArea!.scrollTo({ top: 0, behavior: 'smooth' });
    setShowed(false);
  };

  return (
    <section
      className={clsx(styles.activity, { [styles.expanded]: isShowed })}
      onScroll={handleScroll}
    >

      {!!(!isShowed) ?
        <div className={styles.wrapper}>
          <div className={styles.center}>
            <Button
              type="button"
              theme={isActivity ? "btn-rectangle-primary" : "btn-rectangle-selected"}
              variant={styles.button}
              onClick={() => { setActivity(false) }}
            >
              Assets
          </Button>

            <Button
              type="button"
              theme={isActivity ? "btn-rectangle-selected" : "btn-rectangle-primary"}
              variant={styles.button}
              onClick={() => { setActivity(true) }}
            >
              Activity
          </Button>
          </div>
        </div>
        :
        <div className={styles.heading}>
          {isActivity ? "Activity" : "Assets"}
          <IconButton className={styles.goTop} onClick={handleGoTop}>
            <GoTopIcon />
          </IconButton>
        </div>
      }

      {isActivity ?
        transactions.length ? (
          <>
            <ul>
              {transactions.map((tx: Transaction, idx: number) => {
                // const isRecived = tx.receiver === address;
                const isConfirmed = tx.confirmations > 0;

                return (
                  <Fragment key={uuid()}>
                    {isShowedGroupBar(tx, idx) && (
                      <li className={styles.groupbar}>
                        {formatDistanceDate(new Date(tx.blockTime * 1000).toDateString())}
                      </li>
                    )}
                    <li onClick={() => handleOpenExplorer(tx.txid)}>
                      <div>
                        {isConfirmed ? null : <Spinner size={25} className={styles.spinner} />}
                      </div>
                      <div>
                        <span>
                          <span>
                            {new Date(tx.blockTime * 1000).toLocaleTimeString(navigator.language, {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          <small>{tx.txid}</small>
                          <small>{isConfirmed ? "Confirmed" : "Unconfirmed"}</small>
                        </span>
                        <div className={styles.linkIcon}>
                          <UpArrowIcon />
                        </div>
                      </div>
                    </li>
                  </Fragment>
                );
              })}
            </ul>
          </>
        ) : (
          <>
            <span className={styles.noTxComment}>
              You have no transaction history, send or receive SYS to register
              your first transaction.
          </span>
            <img
              src={SyscoinIcon}
              className={styles.syscoin}
              alt="syscoin"
              height="167"
              width="auto"
            />
          </>
        )
        :
        assets.length ?
          <>
            <ul>
              {assets.map((asset: Assets, idx: number) => {
                // const isRecived = tx.receiver === address;
                console.log("idx increment " + idx)
                if(asset.assetGuid !== undefined){
                return (
                  <Fragment key={uuid()}>
                    {TokenTypeGroupBar(asset, idx) && (
                      <li className={styles.groupbar}>
                        {controller.wallet.account.isNFT(asset.assetGuid) ? "NFT" : "SPT"}
                      </li>
                    )}
                    <li onClick={() => handleOpenAssetExplorer(asset.assetGuid)}>
                      <div>
                        <span>
                          <span>{controller.wallet.account.isNFT(asset.assetGuid) ? asset.balance : (asset.balance / 10 ** asset.decimals).toFixed(8)}  {asset.symbol} </span>
                        </span>
                        <div className={styles.linkIcon}>
                          <UpArrowIcon />
                        </div>
                      </div>
                    </li>
                  </Fragment>
                );
              }
              return
              })}
            </ul>
          </>
          :
          <>
            <span className={styles.noTxComment}>
              You have no Assets, receive SPTs to register.
          </span>
            <img
              src={SyscoinIcon}
              className={styles.syscoin}
              alt="syscoin"
              height="167"
              width="auto"
            />
          </>

      }
    </section>
  );
};

export default TxsPanel;
