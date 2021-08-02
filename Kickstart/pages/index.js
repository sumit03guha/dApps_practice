import React, { Component, useEffect, useState } from 'react';
import instance from '../blockchain/factory';

const CampaignIndex = () => {
  const [campaigns, setCampaigns] = useState();

  useEffect(() => {
    (async () => {
      setCampaigns(await instance.methods.getDeployedAdresses().call());
      console.log(campaigns, 1);
    })();
    console.log(campaigns, 2);
  }, []);

  console.log(campaigns, 3);

  return (
    <>
      <h1>This is the campaign list page. {campaigns}</h1>
    </>
  );
};

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

export default CampaignIndex;
