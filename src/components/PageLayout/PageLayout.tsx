import type { FC } from 'react';
import styled from 'styled-components';

const PageLayout: FC = ({ children }) => {
  return (
    <Container>
      <div className="flex flex-col w-full max-w-5xl px-10 mx-auto">
        {children}
      </div>
    </Container>
  );
};

export { PageLayout };

const Container = styled.div`
  max-width: 1250px;
  margin: 0 auto;
`;
