import Dashboard from "./screen/dashboard/Dashboard"
import Profile from "./screen/profile/Profile"
import Project from "./screen/project/Project"
import ProjectDetail from "./screen/project-detail/ProjectDetail"
import CreateProject from "./screen/create-project/CreateProject"
import PositionRequire from "./screen/position-require/PositionRequire"
import SuggestCandidate from "./screen/suggest-candidate/SuggestCandidate"
import ConfirmSelectCandidate from "./screen/confirm-select-candidate/ConfirmSelectCandidate"

const route = [
  {
    path: "/",
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
    main: ({ history }) => <CreateProject history={history} />
  },
  {
    path: '/project/create-position',
    exact: true,
    main: ({ history }) => <PositionRequire history={history} />
  },
  {
    path: '/project/suggest-candidate',
    exact: true,
    main: () => <SuggestCandidate />
  },
  {
    path: '/project/suggest-candidate/emp/:id',
    exact: true,
    main: ({ match }) => <Profile match={match} />
  },
  {
    path: '/project/confirm-select-candidates',
    exact: true,
    main: () => <ConfirmSelectCandidate />
  },
  {
    path: '/project/detail/:id',
    exact: true,
    main: ({ match }) => <ProjectDetail match={match} />
  },
  {
    path: '/project/detail/emp/:id',
    exact: true,
    main: ({ match }) => <Profile match={match} />
  },
  {
    path: '/project/detail/:id/edit',
    exact: true,
    main: ({ match, history }) => <CreateProject match={match} history={history} />
  },
  {
    path: "/profile",
    exact: true,
    main: () => <Profile empID={JSON.parse(localStorage.getItem('EMP'))} />
  }
]


export default route