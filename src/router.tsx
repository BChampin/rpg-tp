import { createHashRouter } from 'react-router-dom';

import { App } from './App';
// import { ErrorPage } from './Error';
import { PlayersView } from '@/views/PlayersView/PlayersView';
import { OrgaView } from '@/views/OrgaView/OrgaView';
import { HomeView } from '@/views/HomeView/HomeView';

export enum Paths {
  HOME = '/',
  PLAYERS = '/joueurs',
  ORGA = '/orga',
}

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      { path: Paths.HOME, element: <HomeView /> },
      { path: Paths.PLAYERS, element: <PlayersView /> },
      { path: Paths.ORGA, element: <OrgaView /> },
    ],
  },
])
