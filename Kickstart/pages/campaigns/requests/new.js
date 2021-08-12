// This will create new request for the selected Campaign.

import { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Campaign from '../../../blockchain/campaign';
import { Link, Router } from '../../../routes';
import web3 from '../../../blockchain/web3';

const NewRequest = ({ address }) => {
  console.log(address);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(address);
    setError(null);
    setLoading(true);
    const campaign = Campaign(address);

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });
      Router.push(`/campaigns/${address}/requests`);
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Link route={`/campaigns/${address}/requests`}>
        <a>
          <Button primary>Back</Button>
        </a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmitHandler} error={!!error}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          />
        </Form.Field>

        <Button primary loading={loading}>
          Create!
        </Button>
        <Message error header='Oops!' content={error} />
      </Form>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const address = context.query.address;
  return {
    props: { address },
  };
}

export default NewRequest;
