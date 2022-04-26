import type { FC } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import styled from 'styled-components';

namespace ErrorBoundryFallback {
  export interface Props extends FallbackProps {}
}

const ErrorBoundryFallback: FC<ErrorBoundryFallback.Props> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Container>
      <Title>{error.message}</Title>
    </Container>
  );
};

export { ErrorBoundryFallback };

const Container = styled.div`
  padding-top: 20px;
`;

const Title = styled.h2`
  text-align: center;
`;
