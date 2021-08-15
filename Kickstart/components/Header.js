import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';
import ButtonMeta from '../components/Button';

const Header = () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Link route='/'>
        <a className='item'>Crowd Coin</a>
      </Link>

      <Menu.Item position='right'>
        <ButtonMeta />
      </Menu.Item>
    </Menu>
  );
};

export default Header;
