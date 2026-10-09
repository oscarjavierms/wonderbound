import { Container } from '@/components/site/ui'

type LegalDocumentProps = {
  title: string
  intro: string
  sections: { title: string; body: string[] }[]
  draftNotice: string
  updated: string
}

export function LegalDocument({ title, intro, sections, draftNotice, updated }: LegalDocumentProps) {
  return (
    <article className="pb-24 pt-36 md:pt-44">
      <Container className="max-w-3xl">
        <h1 className="text-5xl leading-[1.05] md:text-6xl">{title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">{updated}</p>
        <p role="note" className="mt-8 rounded-sm bg-sand px-5 py-4 text-sm text-muted-foreground">
          {draftNotice}
        </p>
        <p className="mt-10 text-lg leading-relaxed text-muted-foreground">{intro}</p>
        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-3xl">{section.title}</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </article>
  )
}
