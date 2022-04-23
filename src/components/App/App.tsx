import type { FC } from 'react';
import { RecoilRoot } from 'recoil';

import RouterView from '../Router/RouterView';

const App: FC = () => {
  return (
    <RecoilRoot>
      <RouterView />
    </RecoilRoot>
  );
};

export default App;
