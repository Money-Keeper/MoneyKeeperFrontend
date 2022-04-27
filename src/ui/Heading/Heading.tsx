import { Typography } from 'antd';
import type { TitleProps } from 'antd/lib/typography/Title';
import type { FC } from 'react';
import styled from 'styled-components';

const { Title } = Typography;

namespace Heading {
  export interface Props extends TitleProps {
    align?: string;
  }

  export type ShortedProps = Omit<Props, 'level'>;

  export type Level = 1 | 2 | 3 | 4 | 5;
}

const Heading: FC<Heading.Props> = ({
  align = 'left',
  children,
  ...titleProps
}) => {
  return (
    <StyledTitle align={align} {...titleProps}>
      {children}
    </StyledTitle>
  );
};

const H1 = createHeading(1);

const H2 = createHeading(2);

const H3 = createHeading(3);

const H4 = createHeading(4);

const H5 = createHeading(5);

export { Heading, H5, H4, H3, H2, H1 };

const StyledTitle = styled(Title)<{ align: string }>`
  text-align: ${(props) => props.align};
`;

function createHeading(level: Heading.Level) {
  return (props: Heading.ShortedProps) => <Heading level={level} {...props} />;
}
