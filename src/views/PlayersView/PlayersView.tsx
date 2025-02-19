import { useRpgTp } from '@/hooks/useRpgTp'
import { PlayerCard } from '@/components/PlayerCard'
import { TpPlayer } from '@/types'
import { Divider, Title } from '@/components/UiComponents'

export function PlayersView() {
  const rpgTp = useRpgTp()

  return (
    <div>
      <Title content="Les légendes du TeamPlay" />
      <Divider />
      { rpgTp &&
        <div className="grid gap-8 mb-6 lg:mb-16 lg:grid-cols-2">
          {rpgTp.players.map((player: TpPlayer) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      }
    </div>
  )
}
