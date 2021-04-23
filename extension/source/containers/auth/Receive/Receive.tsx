import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useController } from 'hooks/index';
import clsx from 'clsx';
import QRCode from 'qrcode.react';
import IconButton from '@material-ui/core/IconButton';
import CopyIcon from '@material-ui/icons/FileCopy';
import Header from 'containers/common/Header';
import { useCopyClipboard } from 'hooks/index';
import { RootState } from 'state/store';
import IWalletState from 'state/wallet/types';
import Spinner from '@material-ui/core/CircularProgress';


import styles from './Receive.scss';

const WalletReceive = () => {
  const [isCopied, copyText] = useCopyClipboard();
  const controller = useController();
  const [loaded, setLoaded] = useState(false);
  const { accounts, activeAccountId }: IWalletState = useSelector(
    (state: RootState) => state.wallet
  );
  useEffect(() => {
    if (controller.wallet.getNewAddress())
      setLoaded(true)
  }, [])
  return (
    <div className={styles.wrapper}>
      <Header backLink="/home" />
      <section className={styles.subheading}>Receive SYS</section>
      <section className={styles.content}>
        {loaded ? (
          <div>
            <div className={styles.address}>

              <QRCode
                value={accounts[activeAccountId]!.address['main']}
                bgColor="#fff"
                fgColor="#000"
                className={styles.qrcode}
                size={180}
              />
              {accounts[activeAccountId]!.address['main']}
            </div>
            <IconButton
              className={clsx(styles.iconBtn, { [styles.active]: isCopied })}
              onClick={() =>
                copyText(accounts[activeAccountId]!.address['main'])
              }
            >
              <CopyIcon className={styles.icon} />
            </IconButton>
            <span className={clsx({ [styles.active]: isCopied })}>
              {isCopied ? 'Copied Address' : 'Copy'}
            </span>
          </div>
        ) : <Spinner classes={{ root: styles.spinner }} />}

      </section>
    </div>
  );
};

export default WalletReceive;
