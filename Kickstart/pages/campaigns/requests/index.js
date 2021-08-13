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
  const [requests, setRequests] = useState([]);

  const getRequests = async () => {
    console.log(4);
    const count = await campaign.methods.getRequestsCount().call();
    setRequestCount(count);
    console.log(44);
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
    console.log(typeof r);
  };

  useEffect(() => {
    console.log(1, typeof requests);
    getRequests();
    if (requestCount) {
      req();
    }
    console.log(2, typeof requests);
  }, [requestCount]);

  return (
    <Layout>
      <h3>Requests List.</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
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
          <Row>
            <RequestRow requests={requests}></RequestRow>
          </Row>
        </Body>
      </Table>
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
