import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../../../components/Layout';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../blockchain/campaign';
import { Table } from 'semantic-ui-react';
import RequestRow from '../../../components/RequestRow';

const RequestsIndex = ({ address }) => {
  const { Header, Row, HeaderCell, Body } = Table;
  const campaign = Campaign(address);
  const [requestCount, setRequestCount] = useState();
  const [contributorsCount, setContributorsCount] = useState();
  const [requests, setRequests] = useState([]);

  const getter = async () => {
    const count = await campaign.methods.getRequestsCount().call();
    const count2 = await campaign.methods.contributorsCount().call();
    setRequestCount(count);
    setContributorsCount(count2);
  };

  let r;

  const req = async () => {
    r = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((_element, index) => {
          return campaign.methods.requests(index).call();
        })
    );
    setRequests(r);
  };

  useEffect(() => {
    getter();
    if (requestCount) {
      req();
    }
  }, [requestCount]);

  return (
    <Layout>
      <h3>Requests List</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated='right' style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          <RequestRow
            requests={requests}
            address={address}
            contributorsCount={contributorsCount}
          ></RequestRow>
        </Body>
      </Table>
      <div>Found {requestCount} requests.</div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const address = context.query.address;
  return {
    props: { address },
  };
}

export default RequestsIndex;
