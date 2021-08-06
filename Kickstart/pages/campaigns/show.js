// This will show the page for each Campaign.

import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../../components/Layout';
import Campaign from '../../blockchain/campaign';

const CampaignShow = ({ address }) => {
  const campaign = Campaign(address);
  campaign.methods
    .getSummary()
    .call()
    .then(function (s) {
      const summary = s;
      console.log(summary);
    });

  return (
    <Layout>
      <h3>Campaign Show</h3>
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
