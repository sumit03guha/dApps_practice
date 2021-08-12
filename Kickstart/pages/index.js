import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Factory from '../blockchain/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

const CampaignIndex = ({ campaigns }) => {
  console.log(campaigns);

  return (
    <Layout>
      <h3>Open Campaigns</h3>
      <Link route='/campaigns/new'>
        <a>
          <Button
            floated='right'
            content='Create Campaign'
            icon='add'
            primary
          />
        </a>
      </Link>
      <RenderCampaigns campaigns={campaigns} />
    </Layout>
  );
};

export async function getStaticProps() {
  const campaigns = await Factory.methods.getDeployedAdresses().call();

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
      //adding dynamic routing with the help of template string in the Link tag below. {/campaigns/:address}
      description: (
        <Link route={`/campaigns/${address}`}>
          <a>View Campaign</a>
        </Link>
      ),
      fluid: true,
    };
  });
  return <Card.Group items={items} />;
};

export default CampaignIndex;
