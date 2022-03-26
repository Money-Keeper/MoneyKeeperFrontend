import React, { useState } from 'react';

import { PageLayout } from '../PageLayout/PageLayout';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <PageLayout>
      <header className="mb-10 text-center">
        <h1 className="text-lg">Hello Vite + React!</h1>
      </header>

      <main className="grow flex flex-col">
        <p className="flex-1 text-center">
          <button
            className="h-26 w-52 px-4 py-3 my-4 text-white bg-blue-500 border border-white border-solid rounded-full"
            onClick={() => setCount(count + 1)}
          >
            count is: {count}
          </button>
        </p>

        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
      </main>
    </PageLayout>
  );
};
export default App;
