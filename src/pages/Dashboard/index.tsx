import React, { Suspense, lazy } from 'react'
import Admin from 'pages/Admin';

const LazayUser = lazy(() => import('components/Users'));
console.log(LazayUser)
const Dashboard: React.FC = () => {
  return(
    <Admin>
      <div id="Dashboard">
        <div className="title is-4" >Dashboard</div>
        <Suspense fallback="Loading...">
          <LazayUser />
        </Suspense>
      </div>
    </Admin>
  )
}

export default Dashboard