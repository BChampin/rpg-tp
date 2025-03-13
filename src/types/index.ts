import { TvIcon } from '@heroicons/react/24/outline';

export type IconType = typeof TvIcon;

export type TpOrg = {
  name: string
  roles: string,
  exchange?: string
}

export type TpTeam = {
  id: string
  name: string
  color: string
  emoji: string
}

export type TpPlayer = {
  id: string
  name: string
  quote: string
  teamId?: string
  twitch?: string
  twitter?: string
  discord?: string
  youtube?: string
  bluesky?: string
  instagram?: string
  tiktok?: string
}

export type TpTime = {
  playerId: string
  mapId: string
  time: string
  replay?: string
  teamId?: string
  editionId?: string
}

export type TmMap = {
  id: string
  name: string
  author: string
  exchangeId: string
  authorTime: string
  difficulty: string
}

export type TpEdition = {
  id: string
  date: string
  mapsIds: string[]
  winnerTeamId?: string[]
  announcementTweet?: string
  announcementTrailer?: string
  announcementPicture?: string
  recapVideos?: string[]
}

export type TpData = {
  org: TpOrg[]
  teams: TpTeam[]
  players: TpPlayer[]
  times: TpTime[]
  maps: TmMap[]
  editions: TpEdition[]
}
