import { Space } from 'antd';
import type { SpaceProps } from 'antd/lib/space';
import type { FC } from 'react';
import styled from 'styled-components';

namespace Stack {
  export interface Props extends SpaceProps {
    justify?: string;
    inline?: boolean;
    fullHeight?: boolean;
  }
}

const Stack: FC<Stack.Props> = ({
  justify = '',
  inline = false,
  children,
  ...spaceProps
}) => {
  return (
    <StyledSpace inline={inline} justify={justify} {...spaceProps}>
      {children}
    </StyledSpace>
  );
};

export { Stack };

const StyledSpace = styled(Space)<{
  inline: boolean;
  justify: string;
}>`
  display: ${(props) => (props.inline ? 'inline-flex' : 'flex')};
  ${(props) => (props.justify ? `justify-content: ${props.justify}` : '')};
`;
