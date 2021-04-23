import React, { useState } from 'react';
import clsx from 'clsx';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from 'components/Button';
import Select from 'components/Select';
import TextInput from 'components/TextInput';
// import FileSelect from 'components/FileSelect';
import { useCopyClipboard, useSettingsView } from 'hooks/index';

import styles from './index.scss';
import { MAIN_VIEW } from '../routes';
import { ellipsis } from 'containers/auth/helpers';

const ImportAccountView = () => {
  const alert = useAlert();
  // const controller = useController();
  const showView = useSettingsView();
  const [isCopied, copyText] = useCopyClipboard();
  const [importType, setImportType] = useState('priv');
  const [loading, setLoading] = useState(false);
  // const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [address] = useState<{ [assetId: string]: string }>();

  const { handleSubmit, register } = useForm({
    validationSchema: yup.object().shape({
      privKey: importType === 'priv' ? yup.string().required() : yup.string(),
      password: importType === 'priv' ? yup.string() : yup.string().required(),
      label: yup.string().required(),
    }),
  });

  // const handleImportPrivKey = (privKey: string, label: string) => {
  //   controller.wallet.account.importPrivKeyAccount(privKey, label);
  //   setAddress({
  //     main: '0x01',
  //   })
  //   setLoading(false);
  // };

  const onSubmit = () => {
    if (importType === 'priv') {
      setLoading(true);
      // handleImportPrivKey('imported-private-key', data.label);
    } else {
      alert.removeAll();
      alert.error('Error: A private key json file is not chosen');
    }
  };

  return (
    <form className={styles.import} onSubmit={handleSubmit(onSubmit)}>
      {address ? (
        <div className={styles.generated}>
          <span>Your new account has been created</span>
          <span>Click to copy your public address:</span>
          <span
            className={clsx(styles.address, {
              [styles.copied]: isCopied && address,
            })}
            onClick={() => {
              copyText(address.main);
            }}
          >
            {ellipsis(address.main)}
          </span>
          <div className={clsx(styles.actions, styles.centered)}>
            <Button
              type="button"
              theme="btn-gradient-primary"
              variant={styles.button}
              onClick={() => showView(MAIN_VIEW)}
            >
              Finish
            </Button>
          </div>
        </div>
      ) : (
        <>
          <section className={styles.warning}>

          </section>
          <section className={styles.content}>
            <div className={styles.select}>
              Select Type:
              <div className={styles.inner}>
                <Select
                  value={importType}
                  options={[{ priv: 'Private key' }, { json: 'JSON file' }]}
                  onChange={(ev) => setImportType(ev.target.value as string)}
                  fullWidth
                  disabled={loading}
                />
              </div>
            </div>
            {importType === 'priv' ? (
              <>
                <span>Paste your private key string here:</span>
                <TextInput
                  multiline
                  fullWidth
                  variant={styles.textarea}
                  inputRef={register}
                  name="privKey"
                  disabled={loading}
                />
              </>
            ) : (
              <>
                {/* <FileSelect
                  onChange={(val) => setJsonFile(val)}
                  disabled={loading}
                /> */}
                <span>Please enter your JSON file password:</span>
                <TextInput
                  fullWidth
                  inputRef={register}
                  name="password"
                  type="password"
                  visiblePassword
                  disabled={loading}
                />
              </>
            )}

            <span>Please name your new account:</span>
            
            <TextInput
              fullWidth
              inputRef={register}
              name="label"
              disabled={loading}
            />
          </section>
          <section className={styles.actions}>
            <Button
              type="button"
              theme="btn-outline-secondary"
              variant={clsx(styles.button, styles.cancel)}
              onClick={() => showView(MAIN_VIEW)}
            >
              Cancel
            </Button>
            <Button type="submit" variant={styles.button} loading={loading}>
              Import
            </Button>
          </section>
        </>
      )}
    </form>
  );
};

export default ImportAccountView;
