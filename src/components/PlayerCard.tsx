import { TpPlayer, TpTeam, TpTime } from '@/types'
import {
  faBluesky,
  faTiktok,
  faTwitch,
  faTwitter,
  faDiscord,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRpgTp } from '@/hooks/useRpgTp'
import { TeamBadge } from '@/components/TeamBadge'
import { VideoCameraIcon } from '@heroicons/react/24/outline';

export function PlayerCard({ player }: { player: TpPlayer }) {
  const rpgTp = useRpgTp()
  const socials = [
    { key: 'twitch', icon: faTwitch },
    { key: 'twitter', icon: faTwitter },
    { key: 'discord', icon: faDiscord },
    { key: 'youtube', icon: faYoutube },
    { key: 'bluesky', icon: faBluesky },
    { key: 'instagram', icon: faInstagram },
    { key: 'tiktok', icon: faTiktok }
  ].filter((s) => { return !!player[s.key] })

  return (
    <div className="items-center rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700 bg-theme-6">
      <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={`/players/player_${player.id}.png`} alt={`${player.name} picture`} style={{ height: '100%', maxHeight: 200, width: 'auto', aspectRatio: 'initial' }} />
      <div className="p-5">
        <div className="row row-nowrap w-full justify-between">
          <h3 className="text-xl font-bold tracking-tight text-theme-2 dark:text-white">
            <a href={player.twitch} target='_blank'>
              {player.name}
            </a>
          </h3>
          <TeamBadge team={rpgTp.teams.find((t: TpTeam) => t.id === player.teamId)} />
        </div>
        <p className="mt-3 mb-4 font-light text-theme-3 dark:text-gray-400">{player.quote}</p>
        <ul className="flex space-x-4 sm:mt-0">
          {socials.map((social) => (
            <li key={social.key}>
              <a href={player[social.key]} className="text-theme-3 hover:text-theme-2 dark:hover:text-white">
                <FontAwesomeIcon icon={social.icon} className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function PlayerBadge({ player, time }: { player: TpPlayer, time: TpTime }) {
  const rpgTp = useRpgTp()
  const Wrapper = time.replay ? 'a' : 'div';
  const wrapperProps = time.replay
    ? { href: time.replay, target: "_blank", rel: "noopener noreferrer" }
    : {}

  return (
    <Wrapper className="flex items-center bg-theme-5 text-theme-2 p-1 rounded-full shadow gap-2 m-1 dark:bg-theme-7" {...wrapperProps}>
      <img src={`/players/player_${player.id}.png`} alt={`${player.name} picture`} className="w-8 h-8 rounded-full object-cover" />
      <div className="hidden sm:flex">
        <TeamBadge team={rpgTp.teams.find((t: TpTeam) => t.id === (time.teamId ?? player.teamId))} />
      </div>
      <span className="font-medium">{player.name}</span>
      <span className="text-sm text-theme-3">{time.time}</span>
      {time.replay &&
        <span className="text-sm text-theme-3 flex items-center">
          <span className="hidden sm:flex">Replay</span>
          <VideoCameraIcon className="size-6 ml-1" />
        </span>
      }
    </Wrapper>
  );
}
