import { TpTeam } from '@/types'

export function TeamBadge({ team }: { team: TpTeam }) {
  const colorVariants = {
    pink: 'bg-pink-100 text-pink-700 ring-pink-700/10 hover:bg-pink-200 hover:text-pink-900',
    yellow: 'bg-yellow-100 text-yellow-700 ring-yellow-700/10 hover:bg-yellow-200 hover:text-yellow-900',
    blue: 'bg-blue-100 text-blue-700 ring-blue-700/10 hover:bg-blue-200 hover:text-blue-900',
    red: 'bg-red-100 text-red-700 ring-red-700/10 hover:bg-red-200 hover:text-red-900',
    emerald: 'bg-emerald-100 text-emerald-700 ring-emerald-700/10 hover:bg-emerald-200 hover:text-emerald-900',
    lime: 'bg-lime-100 text-lime-700 ring-lime-700/10 hover:bg-lime-200 hover:text-lime-900',
    fuchsia: 'bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-700/10 hover:bg-fuchsia-200 hover:text-fuchsia-900',
    rose: 'bg-rose-100 text-rose-700 ring-rose-700/10 hover:bg-rose-200 hover:text-rose-900',
  }

  return (
    <>
      { team &&
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs gap-2 font-medium ring-1 ring-inset ${colorVariants[team.color]}`}>
          <span>{team.emoji}</span>
          <span>{team.id}</span>
        </span>
      }
    </>
  )
}
