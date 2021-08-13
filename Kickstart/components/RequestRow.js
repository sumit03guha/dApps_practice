import { useState } from 'react';
import { Table, Button, Message } from 'semantic-ui-react';
import web3 from '../blockchain/web3';
import Campaign from '../blockchain/campaign';
import { Router } from '../routes';

const RequestRow = ({ requests, address, contributorsCount }) => {
  const campaign = Campaign(address);
  const { Row, Cell } = Table;
  const [error, setError] = useState();

  const clickHandler = async (index, e) => {
    setError(null);

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      await campaign.methods.approveRequest(index).send({ from: accounts[0] });
      console.log(accounts);
      Router.push(`/campaigns/${address}/requests`);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const clickHandler2 = async (index) => {
    setError(null);

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      await campaign.methods.finalizeRequest(index).send({ from: accounts[0] });
      console.log(accounts);
      Router.push(`/campaigns/${address}/requests`);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return requests.map((request, index) => {
    return (
      <Row
        disabled={request.complete}
        positive={
          request.approvalCount > contributorsCount / 2 && !request.complete
        }
      >
        <Cell>{index}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount} / {contributorsCount}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button basic color='green' onClick={(e) => clickHandler(index, e)}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button basic color='teal' onClick={() => clickHandler2(index)}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  });
};

export default RequestRow;
