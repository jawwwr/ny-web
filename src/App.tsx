import React from 'react';
import { Suspense } from 'react';
import { NetworkErrorBoundary } from 'rest-hooks';
import routes from './routes'

const App: React.FC = () => {
  return (
    <div className="App">
      <Suspense fallback={<>loading...</>}>
        <NetworkErrorBoundary>
          {routes}
        </NetworkErrorBoundary>
    </Suspense>
    </div>
  );
}

export default App;
