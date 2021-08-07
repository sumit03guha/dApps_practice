// This will show the page for each Campaign.

import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../../components/Layout';
import Campaign from '../../blockchain/campaign';
import RenderCards from './RenderCards';

const CampaignShow = ({ address }) => {
  const [summary, setSummary] = useState('');
  const campaign = Campaign(address);

  useEffect(() => {
    (async () => {
      const s = await campaign.methods.getSummary().call();
      setSummary(s);
    })();
  }, []);

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <RenderCards summary={{ summary }} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const address = context.query.address;
  return {
    props: { address },
  };
}

export default CampaignShow;
