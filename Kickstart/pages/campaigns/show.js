// This will show the page of the selected Campaign.

import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Grid, Button } from 'semantic-ui-react';
import { Link } from '../../routes';
import Layout from '../../components/Layout';
import Campaign from '../../blockchain/campaign';
import RenderCards from '../../components/RenderCards';
import ContributeForm from '../../components/ContributeForm';

const CampaignShow = ({ address }) => {
  const [summary, setSummary] = useState('');
  const campaign = Campaign(address);

  const camp = async () => {
    const s = await campaign.methods.getSummary().call();
    setSummary(s);
  };

  useEffect(() => {
    camp();
  }, []);

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <RenderCards summary={{ summary }} />
          </Grid.Column>

          <Grid.Column width={4}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Link route={`/campaigns/${address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
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
