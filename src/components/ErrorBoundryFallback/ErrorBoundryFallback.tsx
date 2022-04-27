import type { FC } from 'react';
import type { FallbackProps } from 'react-error-boundary';

import { H2, H3 } from '../../ui/Heading/Heading';
import { Stack } from '../../ui/Stack/Stack';

namespace ErrorBoundryFallback {
  export interface Props extends FallbackProps {
    title?: string;
  }
}

const ErrorBoundryFallback: FC<ErrorBoundryFallback.Props> = ({
  title,
  error,
  resetErrorBoundary,
}) => {
  return (
    <Stack direction="vertical" size="large" align="center" justify="center">
      <H2>{title || 'Sorry, error appeared :('}</H2>

      <H3>{error.message}</H3>
    </Stack>
  );
};

export { ErrorBoundryFallback };
