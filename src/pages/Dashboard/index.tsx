import React, { Suspense, lazy } from 'react'
import Admin from 'pages/Admin';

const LazayBalances = lazy(() => import('components/Balances'));
const Dashboard: React.FC = () => {
  return(
    <Admin>
      <div id="Dashboard">
        <div className="title is-4" >Balances</div>
        <Suspense fallback="Loading...">
          <LazayBalances />
        </Suspense>
      </div>
    </Admin>
  )
}

export default Dashboard