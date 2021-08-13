import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Card } from 'semantic-ui-react';
import web3 from '../blockchain/web3';

const RenderCards = ({ summary }) => {
  const [balance, setBalance] = useState(0);
  const [minimumContribution, setMinimumContribution] = useState(0);
  const details = summary['summary'];
  const card = {
    minimumContribution: details[0],
    balance: details[1],
    requestsCount: details[2],
    contributorsCount: details[3],
    manager: details[4],
  };

  const items = [
    {
      header: card.manager,
      description:
        'The manager created this campaign and can create requests to withdraw money.',
      meta: 'Address of Manager',
      style: { overflowWrap: 'break-word' },
    },
    {
      header: web3.utils.fromWei(web3.utils.toBN(minimumContribution), 'ether'),
      description:
        'You must contribute atleast this much amount of ether to become a contributor.',
      meta: 'Minimum Contribution (in Ether)',
    },
    {
      header: card.requestsCount,
      description:
        'A request tries to withdraw money from the contract. Requests must be approved by the approvers.',
      meta: 'Number of Requests',
    },
    {
      header: card.contributorsCount,
      description: 'Number of people who have donated to this campaign',
      meta: 'Number of Contributors',
    },
    {
      header: web3.utils.fromWei(web3.utils.toBN(balance), 'ether'),
      description:
        'The balance is how much money this campaign has left to spend.',
      meta: 'Campaign Balance (in Ether)',
    },
  ];

  useEffect(() => {
    if (card.balance && card.minimumContribution) {
      setBalance(card.balance);
      setMinimumContribution(card.minimumContribution);
    }
  });
  return <Card.Group items={items} />;
};

export default RenderCards;
