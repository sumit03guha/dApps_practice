// This will show the page for each Campaign.

import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../blockchain/campaign';
import RenderCards from './RenderCards';
import ContributeForm from '../../components/ContributeForm';

const CampaignShow = ({ address }) => {
  const [summary, setSummary] = useState('');
  const campaign = Campaign(address);

  const camp = async () => {
    const s = await campaign.methods.getSummary().call();
    setSummary(s);
    console.log(1);
  };

  useEffect(() => {
    camp();
    console.log(2);
  }, []);

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Column width={12}>
          <RenderCards summary={{ summary }} />
        </Grid.Column>

        <Grid.Column width={4}>
          <ContributeForm address={address} />
        </Grid.Column>
      </Grid>
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
