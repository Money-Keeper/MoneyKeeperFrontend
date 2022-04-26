import type { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

namespace FormWrapper {
  export interface Props {
    title: string;
  }
}

const FormWrapper: FC<FormWrapper.Props> = ({ title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>

      {children}
    </Container>
  );
};

export { FormWrapper };

const Container = styled.div`
  min-width: 700px;
  padding: 30px 60px 10px;

  border-radius: 10px;
  background-color: #fff;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 20px;

  margin-bottom: 50px;
`;
