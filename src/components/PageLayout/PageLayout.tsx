import { Layout } from 'antd';
import type { FC } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';

import { ErrorBoundryFallback } from '../ErrorBoundryFallback/ErrorBoundryFallback';

const { Content } = Layout;

const PageLayout: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

const DefaultPageErrorBoundary = withErrorBoundary(PageLayout, {
  FallbackComponent: (props) => (
    <BoundaryContainer>
      <ErrorBoundryFallback {...props} />
    </BoundaryContainer>
  ),
});

export { DefaultPageErrorBoundary as PageLayout };

const Container = styled(Content)`
  max-width: 1250px;
  margin: 0 auto;
`;

const BoundaryContainer = styled(Container)`
  display: grid;
  place-items: center;
`;
