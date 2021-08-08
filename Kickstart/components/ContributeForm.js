import { Form, Input, Button } from 'semantic-ui-react';
import { useState } from 'react';
import Campaign from '../blockchain/campaign';
import web3 from '../blockchain/web3';

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const campaign = Campaign(address);

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      console.log(accounts);
      await campaign.methods
        .contribute()
        .send({ from: accounts[0], value: web3.utils.toWei(value, 'ether') });
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label>Amount to Contribute </label>
        <Input
          label='ether'
          labelPosition='right'
          onChange={(event) => setValue(event.target.value)}
        />
      </Form.Field>
      <Button primary>Contribute!</Button>
    </Form>
  );
};

export default ContributeForm;
