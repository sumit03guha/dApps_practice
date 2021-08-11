import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../../../components/Layout';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';

const RequestsIndex = ({ address }) => {
  return (
    <Layout>
      <h3>Requests List.</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
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
