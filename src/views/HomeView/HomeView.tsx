import { useRpgTp } from '@/hooks/useRpgTp'
import { IconType, TpEdition, TmMap, TpTeam, TpTime, TpPlayer } from '@/types'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { TeamBadge } from '@/components/TeamBadge'
import { PlayerBadge } from '@/components/PlayerCard'
import { VideoCameraIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Divider, Title } from '@/components/UiComponents'

type TabRenderProps = {
  show: boolean
  label: string
  icon?: IconType
}

export function HomeView() {
  const rpgTp = useRpgTp()

  return (
    <div>
      <h1 className="text-theme-2 text-no-wrap text-7xl font-black text-center my-12">
        RPG TeamPlay
      </h1>
      <Title content="Le concept" />
      <Divider />
      <div className="text-2xl font-bold text-theme-4 mb-12">
        Des streamers viennent découvrir, en duo, une map Trackmania de type RPG créée pour l'occasion. Pas d'enjeu compétitif, juste du plaisir entre potes et du roulage !
      </div>
      <Title content="Les éditions" />
      <Divider />
      <div className="flex flex-col gap-10">
        {rpgTp && [...rpgTp.editions].reverse().map((edition: TpEdition) => (
          <EditionRow key={edition.id} edition={edition} />
        ))}
      </div>
    </div>
  )
}

function EditionRow({ edition }: { edition: TpEdition }) {
  const rpgTp = useRpgTp()
  const editionMaps = rpgTp.maps.filter((m: TmMap) => edition.mapsIds.includes(m.id)).sort((a: TmMap, b: TmMap) => edition.mapsIds.indexOf(a.id) - edition.mapsIds.indexOf(b.id))

  const toSeconds = (t: string) => t.split(":").reverse().reduce((s, v, i) => s + v * 60 ** i, 0)
  const editionTimes = rpgTp.times.filter((t: TpTime) => edition.mapsIds.includes(t.mapId) && t.editionId === edition.id).sort((a: TpTime, b: TpTime) => toSeconds(a.time) - toSeconds(b.time))

  const tabs = [
    { show: !!edition.mapsIds, label: 'Infos' },
    { show: editionTimes.length > 0, label: 'Participants' },
    { show: !!edition.announcementTrailer, label: 'Trailer', icon: VideoCameraIcon },
    { show: !!edition.announcementPicture, label: 'Annonce' },
    { show: edition.recapVideos && edition.recapVideos.length > 0, label: 'Récap', icon: VideoCameraIcon },
  ]

  return (
    // <div className="grid grid-cols-2 gap-4 items-center justify-items-center">
    <div className="relative flex flex-nowrap items-center justify-between md:justify-normal odd:flex-row-reverse gap-2 text-theme-2 bg-theme-6 rounded-2xl">

      <div className="hidden sm:flex w-1/3 h-full">
        <img src={`https://trackmania.exchange/mapimage/${editionMaps[0].exchangeId}`} alt="Card" className="w-full h-full rounded-2xl object-cover" />
      </div>

      {/* Infos */}
      {rpgTp && <div className="w-full sm:w-2/3 text-left rounded-2xl p-4">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-full bg-theme-4 text-theme-7 text-2xl p-3">
            #{edition.id}
          </div>
          <div className="w-1/3 sm:hidden h-full">
            <img src={`https://trackmania.exchange/mapimage/${editionMaps[0].exchangeId}`} alt="Card" className="w-full h-full rounded-2xl object-cover" />
          </div>
          <div className="text-xl font-bold flex items-center gap-2">
            <div className="flex sm:hidden h-10 w-10 items-center justify-center rounded-full bg-theme-4 text-theme-7 text-lg p-2">
              #{edition.id}
            </div>
            <div className="text-xl sm:text-3xl">
              {editionMaps.map((m: TmMap) => m.name).join(' / ')}
            </div>
          </div>
        </div>
        <Divider />

        <TabGroup defaultIndex={0}>
          <TabList>
            {tabs.map((tab: TabRenderProps, i: number) => (
              <TabRender key={i} show={tab.show} label={tab.label} icon={tab.icon} />
            ))}
          </TabList>
          <TabPanels className="mt-2">
            {edition.mapsIds &&
              <TabPanel>
                <div className="text-theme-2">
                  <span className="text-lg font-bold ">Date : </span>
                  <span>{[...edition.date.split('/')].reverse().join('/')}</span>
                </div>
                <div className="text-lg font-bold text-theme-2">
                  Carte{editionMaps.length > 1 ? 's' : ''} :
                </div>
                <ul>
                  {editionMaps.map((map: TmMap) => (
                    <MapInfo key={map.id} map={map} />
                  ))}
                </ul>
                <div className="text-lg font-bold text-theme-2">
                  Gagnants :
                  <TeamBadge team={rpgTp.teams.find((t: TpTeam) => t.id === edition.winnerTeamId)} />
                </div>
              </TabPanel>
            }
            {editionTimes.length > 0 &&
              <TabPanel>
                {editionMaps.map((map: TmMap, index: number) => (
                  <div key={map.id} className="mt-2">
                    {index > 0 && <Divider />}
                    <MapInfo map={map} />
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      {editionTimes.filter((t: TpTime) => t.mapId === map.id).map((time: TpTime) => (
                        <PlayerBadge key={`${time.mapId}_${time.playerId}`} player={rpgTp.players.find((p: TpPlayer) => p.id === time.playerId)} time={time} />
                      ))}
                    </div>
                  </div>
                ))}
              </TabPanel>
            }
            {edition.announcementTrailer &&
              <TabPanel>
                <video className="rounded-2xl aspect-video" autoPlay controls>
                  <source src={`/trailers/trailer_${edition.id}.mp4`} type="video/mp4" />
                </video>
              </TabPanel>
            }
            {edition.announcementPicture &&
              <TabPanel>
                <img src={`/announcements/announcement_${edition.id}.jpg`} alt={`${edition.id} picture`} className="rounded-2xl" />
              </TabPanel>
            }
            {edition.recapVideos.length > 0 &&
              <TabPanel>
                {edition.recapVideos.map((video: string, i: number) => (
                  <iframe key={i} width="100%" src={`https://www.youtube.com/embed/${video.split('=')[1]}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="rounded-2xl my-2 aspect-video"></iframe>
                ))}
              </TabPanel>
            }
          </TabPanels>
        </TabGroup>
      </div>}
    </div>
  )
}

function MapInfo ({ map }: { map: TmMap }) {
  return (
    <li key={map.id} className="flex gap-1">
      <a
        href={`https://trackmania.exchange/mapshow/${map.exchangeId}`}
        target="_blank"
        className={clsx(
          'text-theme-2 hover:text-theme-7',
          'dark:text-theme-4 dark:hover:text-theme-3'
        )}
      >
        {map.name}
      </a>
      <span>par {map.author}</span>
      <span>-</span>
      <span>{map.authorTime}</span>
      <span>-</span>
      <span>Difficulté : {map.difficulty}</span>
    </li>
  )
}

function TabRender ({ show, label, icon: Icon }: TabRenderProps) {
  if (!show) return
  return (
    <Tab className={clsx(
      'py-1 px-2 m-2 cursor-pointer rounded-2xl',
      'data-[selected]:font-semibold',
      'text-theme-1 bg-theme-2',
      'data-[selected]:text-theme-5 data-[selected]:bg-theme-2',
      'dark:text-theme-4 dark:bg-theme-7',
      'dark:data-[selected]:text-theme-7 dark:data-[selected]:bg-theme-4',
    )}>
      <div className="flex items-center">
        <span>{label}</span>
        {Icon && <Icon className="size-6 ml-1" />}
      </div>
    </Tab>
  )
}
