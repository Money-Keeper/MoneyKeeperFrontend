import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import type { FC } from 'react';
import styled from 'styled-components';

import { PageLayout } from '../PageLayout/PageLayout';

import routes from './routes';

const location = new ReactLocation();

const RouterView: FC = () => {
  return (
    <Router location={location} routes={routes}>
      <PageLayout>
        <Header>
          <Text>Hello I'm on all pages!</Text>
        </Header>

        <Outlet />
      </PageLayout>
    </Router>
  );
};

export default RouterView;

const Header = styled.div`
  margin-bottom: 10px;
  text-align: center;
`;

const Text = styled.div`
  font-size: 24px;
`;
