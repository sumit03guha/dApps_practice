import { Form, Input, Button, Message } from 'semantic-ui-react';
import { useState } from 'react';
import Campaign from '../blockchain/campaign';
import web3 from '../blockchain/web3';
import { Router } from '../routes';

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState('');
  const campaign = Campaign(address);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      console.log(accounts);
      await campaign.methods
        .contribute()
        .send({ from: accounts[0], value: web3.utils.toWei(value, 'ether') });

      Router.replace(`/campaigns/${address}`);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
    setLoading(false);
    setValue('');
  };

  return (
    <Form onSubmit={onSubmit} error={!!error}>
      <Form.Field>
        <label>Amount to Contribute </label>
        <Input
          label='ether'
          labelPosition='right'
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Form.Field>
      <Button primary loading={loading}>
        Contribute!
      </Button>
      <Message error header='Oops!' content={error} />
    </Form>
  );
};

export default ContributeForm;
