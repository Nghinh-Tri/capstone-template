import CreatePosition from "./screens/create-position/CreatePosition";
import CreateProject from "./screens/create-project/CreateProject";
import Dashboard from "./screens/dashboard/Dashboard";
import Profile from "./screens/profile/Profile";
import ProjectDetail from "./screens/project-detail/ProjectDetail";
import Project from "./screens/project/Project";
import SuggestCandidate from "./screens/suggest-candidate/SuggestCandidate";

const route = [
    {
        path: '/',
        exact: true,
        main: () => <Dashboard />
    },
    {
        path: '/project',
        exact: true,
        main: () => <Project />
    },
    
    {
        path: '/project/create-project',
        exact: true,
        main: () => <CreateProject />
    },
    {
        path: '/project/create-position',
        exact: true,
        main: () => <CreatePosition />
    },
    {
        path: '/project/suggest-candidate',
        exact: true,
        main: () => <SuggestCandidate />
    },
    {
        path: '/project/:id',
        exact: true,
        main: () => <ProjectDetail />
    },
    // {
    //     path: '/project/:id/edit',
    //     exact: true,
    //     main: () => <CreateProject />
    // },

    {
        path: 'project/:id/confirm-list',
        exact: true,
        main: () => <SuggestCandidate />
    },
    {
        path: '/profile',
        exact: true,
        main: () => <Profile />
    },
    {
        path: '/profile/edit',
        exact: true,
        main: () => <Project />
    },
    {
        path: '/notification',
        exact: true,
        main: () => <Project />
    },
]

export default route;