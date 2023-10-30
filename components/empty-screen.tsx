import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

export const exampleMessages = [
  {
    heading: 'Chat: Hoe wordt veiligheid van fietsers gewaarborgd?',
    message:
      'Hoe wordt de veiligheid van fietsers in Nederland verbeterd op basis van de beschikbare data?'
  },
  {
    heading: 'Chat: Voordelen samenwerking RDT?',
    message:
      'Wat zijn de voordelen voor een wegbeheerder om samen te werken in RDT?'
  },
  {
    heading: 'Chat: Hoe kunnen verkeersstromen in beeld gebracht worden?',
    message:
      'Hoe kunnen verkeersstromen in beeld gebracht worden door het bundelen van data uit verschillende bronnen?'
  },
  {
    heading: 'Inst: Wat is het verschil tussen Kennisbank en Databank?',
    message: 'Wat is het verschil tussen Kennisbank en Databank?'
  },
  {
    heading: 'Inst: Tot welke data heb je toegang?',
    message: 'Tot welke data heb je toegang?'
  },
  {
    heading: 'Inst: Wat voor type vragen kan ik stellen aan de kennisbank?',
    message: 'Wat voor type vragen kan ik stellen aan de kennisbank?'
  },
  {
    heading: 'DB: Hoelang is de Eembrug gemiddeld geopend?',
    message: 'Hoelang is de Eembrug gemiddeld geopend?'
  },
  {
    heading: 'DB: Hoeveel incidenten zijn er in 2022 geweest?',
    message: 'Hoeveel incidenten zijn er in 2022 geweest?'
  },
  {
    heading: 'DB: Wat is de langste file ooit geweest?',
    message: 'Wat is de langste file ooit geweest?'
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="space-y-2 rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Welkom bij MatchPoint: Jouw wegwijzer naar een efficiënter en slimmer
          wegbeheer.
        </h1>
        <p className="leading-normal text-muted-foreground">
          <span style={{ color: 'red', fontWeight: 700 }}>Instructies</span> In
          de chatbalk onderaan het scherm kun je een gesprek beginnen. Hier kun
          je vragen stellen of informatie opvragen over specifieke onderwerpen.
          Als je niet zeker weet waar je moet beginnen, probeer dan eens een van
          onze voorbeeldvragen.
        </p>
        <p className="leading-normal text-muted-foreground">
          <span style={{ color: 'red', fontWeight: 700 }}>Kennisbank</span> In
          onze kennisbank kun je vragen stellen over ongestructureerde data.
          Deze databank bevat diverse PDF-bestanden afkomstig van verschillende
          provincies en gemeenten.
        </p>
        <p className="leading-normal text-muted-foreground">
          <span style={{ color: 'red', fontWeight: 700 }}>Databank</span> Hier
          kun je vragen stellen over gestructureerde data. Enkele voorbeelden
          zijn: (Later toevoegen)
        </p>
        {/* <div className="mt-4 flex flex-col items-start space-y-2">
          {displayMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div> */}
        <div className="mt-4 flex flex-col items-start space-y-2">
          <p className="leading-normal text-muted-foreground">
            Wil je een overzicht van je eerdere gesprekken en vragen? Klik dan
            linksboven in het menu. Hier kun je al je eerdere interacties met
            MatchPoint bekijken en eventueel terugkeren naar eerdere gesprekken
            voor referentie.
          </p>
        </div>
        {/* <p className="mb-2 leading-normal text-muted-foreground">
          This is an open source AI chatbot app forked from the{' '}
          <ExternalLink href="https://github.com/supabase-community/vercel-ai-chatbot/">Next.js/Supabase template</ExternalLink>,
          that supports GPT3, 4, and Anthropic calling.
        </p>
        <div className="flex flex-col items-start mt-4 space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div> */}
      </div>
    </div>
  )
}
