import { Container, Eyebrow } from '@/components/site/ui'
import { cn } from '@/lib/utils'

export function PageHeader({
  eyebrow,
  title,
  text,
  className,
}: {
  eyebrow: string
  title: string
  text?: string
  className?: string
}) {
  return (
    <section className={cn('pb-14 pt-36 md:pb-20 md:pt-44', className)}>
      <Container className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-5xl leading-[1.02] md:text-7xl">{title}</h1>
        </div>
        {text && (
          <p className="text-lg leading-relaxed text-muted-foreground lg:col-span-4">{text}</p>
        )}
      </Container>
    </section>
  )
}
