import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import { Layout } from 'antd';
import type { FC } from 'react';
import styled from 'styled-components';

import { H1 } from '../../ui/Heading/Heading';
import { PageLayout } from '../PageLayout/PageLayout';

import routes from './routes';

const { Header } = Layout;

const location = new ReactLocation();

const RouterView: FC = () => {
  return (
    <Router location={location} routes={routes}>
      <StyledLayout>
        <StyledHeader>
          <H1 align="center">Hello I'm on all pages!</H1>
        </StyledHeader>

        <PageLayout>
          <Outlet />
        </PageLayout>
      </StyledLayout>
    </Router>
  );
};

export default RouterView;

const StyledLayout = styled(Layout)`
  background-color: #f3f5ff;
`;

const StyledHeader = styled(Header)`
  background-color: #f3f5ff;
`;
