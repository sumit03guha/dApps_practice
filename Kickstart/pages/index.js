import React, { Component, useEffect, useState } from 'react';
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import instance from '../blockchain/factory';
import Layout from '../components/Layout';

const CampaignIndex = ({ campaigns }) => {
  // const [campaigns, setCampaigns] = useState();

  // useEffect(() => {
  //   (async () => {
  //     setCampaigns(await instance.methods.getDeployedAdresses().call());
  //     console.log(campaigns, 1);
  //   })();
  //   console.log(campaigns, 2);
  // }, []);

  console.log(campaigns);

  return (
    <Layout>
      <h3>Open Campaigns</h3>
      <Button floated='right' content='Create Campaign' icon='add' primary />
      <RenderCampaigns campaigns={campaigns} />
    </Layout>
  );
};

export async function getStaticProps() {
  const campaigns = await instance.methods.getDeployedAdresses().call();

  return {
    props: {
      campaigns,
    },
  };
}

// CampaignIndex.getInitialProps = async () => {
//   const campaigns = await instance.methods.getDeployedAdresses().call();

//   return { campaigns };
// };

// export default CampaignIndex;

// class CampaignIndex extends Component {
//   async componentDidMount() {
//     const campaigns = await instance.methods.getDeployedAdresses().call();
//     console.log(campaigns);
//   }

//   render() {
//     return <div>Campaigns</div>
//   }
// }

const RenderCampaigns = ({ campaigns }) => {
  const items = campaigns.map((address) => {
    return {
      header: address,
      description: <a>View Campaign</a>,
      fluid: true,
    };
  });
  return <Card.Group items={items} />;
};

export default CampaignIndex;
