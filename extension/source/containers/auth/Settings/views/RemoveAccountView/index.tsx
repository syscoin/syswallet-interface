import React, { FC } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ellipsis } from 'containers/auth/helpers';
import { useSettingsView } from 'hooks/index';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import IWalletState from 'state/wallet/types';
import { RootState } from 'state/store';

import styles from './index.scss';
import { MAIN_VIEW } from '../routes';

interface IRemoveAccountView {
  id: number;
}

const RemoveAccountView: FC<IRemoveAccountView> = ({ id }) => {
  // const controller = useController();
  const showView = useSettingsView();
  const alert = useAlert();
  const history = useHistory();

  const { accounts }: IWalletState = useSelector(
    (state: RootState) => state.wallet
  );
  const { handleSubmit, register } = useForm({
    validationSchema: yup.object().shape({
      password: yup.string().required(),
    }),
  });

  // const onSubmit = (data: any) => {
  const onSubmit = () => {
    let isChecked;

    if (id !== 0) {
      console.log("Removing tha account")
      //   isChecked = controller.wallet.account.unsubscribeAccount(
      //     id,
      //     data.password
      //   );
    } else {
      alert.error('Error: You cannot remove the main account.');
    }

    if (isChecked) {
      showView(MAIN_VIEW);
    } else {
      alert.removeAll();
      alert.error('Error: You cannot remove the main account.');
    }
  };

  return (
    <div className={styles.removeAccount}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {accounts[id] && (
          <div className={styles.subheading}>
            <div>{accounts[id].label}:</div>
            <span className={styles.address}>
              {ellipsis(accounts[id].address.main)}
            </span>
          </div>
        )}

        <span>Please enter your wallet password:</span>
        <TextInput
          type="password"
          name="password"
          visiblePassword
          fullWidth
          inputRef={register}
          variant={styles.input}
        />
        <div className={styles.actions}>
          <Button
            type="button"
            theme="btn-outline-secondary"
            variant={clsx(styles.button, styles.close)}
            onClick={() => history.goBack()}
          >
            Close
          </Button>
          <Button
            type="submit"
            variant={styles.button}
            disabled={Object.keys(accounts).length <= 1}
          >
            Done
          </Button>
        </div>
        <span>
          This account will be hidden from your wallet. You can show this
          account again by clicking "Create account" from Settings.
        </span>
      </form>
    </div>
  );
};

export default RemoveAccountView;
