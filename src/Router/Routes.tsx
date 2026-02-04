import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Overview from "../Pages/Overview";
import Events from "../Pages/Events";
import StudentDistribution from "../Pages/StudentDistribution";
import KnownPersonTracking from "../Pages/KnownPersonTracking";
import SpaceUtilization from "../Pages/SpaceUtilization";
import AccessControl from "../Pages/AccessControl";
import CleaningHygiene from "../Pages/CleaningHygiene";
import StaffProductivity from "../Pages/StaffProductivity";
import ROIImpact from "../Pages/ROIImpact";
import Cameras from "../Pages/Cameras";



const Routes=createBrowserRouter([
    {
        path:'/',
        element:<App />,
        children:[
            {
                path:'/',
                element:<Overview/>
            },
            {
                path:'/events',
                element:<Events/>
            },
            {
                path:'/student-distribution',
                element:<StudentDistribution/>
            },
            {
                path:'/known-person-tracking',
                element:<KnownPersonTracking/>,
              
            },
            {
                path:'/space-utilization',
                element:<SpaceUtilization/>
            },
            {
                path:'/access-control',
                element:<AccessControl/>
            },
            {
                path:'/cleaning-hygiene',
                element:<CleaningHygiene/>
            },
            {
                path:'/staff-productivity',
                element:<StaffProductivity/>
            },
            {
                path:'/roi-impact',
                element:<ROIImpact/>
            },
            {
                path:'/cameras',
                element:<Cameras/>
            }
        ]
    }
])
export default Routes;