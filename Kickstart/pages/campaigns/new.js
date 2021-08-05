// Page for creating the new Campaign by entering the minimumContribution.

import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import 'semantic-ui-css/semantic.min.css';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../blockchain/factory';
import { Router } from '../../routes';

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    // const accounts = await web3.eth.getAccounts();
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      console.log(accounts);

      await factory.methods
        .createKickstarter(minimumContribution)
        .send({ from: accounts[0] });
      Router.pushRoute('/');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  //   const clickHandler = () => {
  //     window.ethereum.request({ method: 'eth_requestAccounts' });
  //   };

  return (
    <Layout>
      <h3>Create a Campaign</h3>
      <Form error={!!error} onSubmit={submitHandler}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label='wei'
            labelPosition='right'
            placeholder='Enter the minimum contribution amount'
            value={minimumContribution}
            onChange={(e) => setMinimumContribution(e.target.value)}
          />
        </Form.Field>

        <Message error header='Oops!' content={error} />

        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
