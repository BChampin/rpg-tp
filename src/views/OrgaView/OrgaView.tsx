import { useRpgTp } from '@/hooks/useRpgTp'
import { Divider, Title } from '@/components/UiComponents'
import { TpOrg } from '@/types'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
            <div className="text-md text-theme-3 mt-1">{orga.roles}</div>
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

      <Divider />

      <footer className="text-theme-2 p-2 flex flex-col sm:flex-row justify-center text-center items-center sm:items-baseline gap-4">
        <div>Made with ❤️ and ☕ by Sakastien</div>
        <div className="text-lg">·</div>
        <div>
          Project base and Sidebar by&nbsp;
          <a target="_blank" className="text-theme-2" href="https://github.com/xAt0mZ">
            xAt0mZ
          </a>
        </div>
        <div className="text-lg">·</div>
        <div>
          <a target="_blank" className="text-theme-2" href="https://github.com/BChampin/rpg-tp">
            <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
          </a>
        </div>
      </footer>

    </div>
  )
}
