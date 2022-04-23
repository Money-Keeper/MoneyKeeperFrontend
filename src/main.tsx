import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
import 'antd/dist/antd.css';
import './index.css';

const bootstrap = () => {
  // @ts-ignore v18 @types not coming yet
  const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(<App />);
};

bootstrap();
