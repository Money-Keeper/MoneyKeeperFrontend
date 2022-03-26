import type { FC } from 'react';

const PageLayout: FC = ({ children }) => {
  return (
    <div className="bg-blue-50 flex h-full max-h-full">
      <div className="flex flex-col w-full max-w-5xl px-10 mx-auto">
        {children}
      </div>
    </div>
  );
};

export { PageLayout };
