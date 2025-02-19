import { useRpgTp } from '@/hooks/useRpgTp'
import { Divider, Title } from '@/components/UiComponents'
import { TpOrg } from '@/types'

export function OrgaView() {
  const rpgTp = useRpgTp()

  return (
    <div>
      <Title content="Ils ont rendu le RPG TP possible" />
      <Divider />

      <div className="text-center">
        Envoyez leur du love et awardez les maps
      </div>
      <div className="flex flex-wrap gap-4 justify-center my-10">
        <img src="wingoLove.gif" style={{ height: '100%', maxHeight: 100, width: 'auto', aspectRatio: 'initial' }} />
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {rpgTp && rpgTp.org.length > 0 && rpgTp.org.map((orga: TpOrg, i: number) => (
          <div key={i} className="bg-theme-6 shadow-lg rounded-2xl p-6 w-64 flex flex-col items-center">
            <div className="text-xl font-semibold text-theme-2">{orga.name}</div>
            <div className="text-md text-theme-3 mt-1">{orga.role}</div>
            {orga.exchange && (
              <a
                href={orga.exchange}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-theme-5 text-theme-2 text-sm rounded-lg hover:bg-theme-4 hover:text-theme-7 transition"
              >
                Voir les cartes
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
