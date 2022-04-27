import type { FC } from 'react';
import styled from 'styled-components';

import { H4 } from '../../../ui/Heading/Heading';
import { Stack } from '../../../ui/Stack/Stack';

namespace FormWrapper {
  export interface Props {
    title: string;
  }
}

const FormWrapper: FC<FormWrapper.Props> = ({ title, children }) => {
  return (
    <Container direction="vertical" justify="center" size="large">
      <H4 align="center">{title}</H4>

      {children}
    </Container>
  );
};

export { FormWrapper };

const Container = styled(Stack)`
  min-width: 700px;
  padding: 30px 60px 10px;
  border-radius: 10px;
  background-color: #fff;
`;
