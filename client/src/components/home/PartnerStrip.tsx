import Container from "@/components/Container"

const partners = [
  "Telangana Govt",
  "Andhra Govt",
  "Corteva",
  "APGENCO",
  "IPAGE UMS",
  "Dev AI Labs",
]

export default function PartnerStrip() {
  return (
    <section className="w-full overflow-hidden border-y border-border/60 bg-muted/10 py-6 sm:py-8">
      <Container>
        <div className="grid min-w-0 gap-4 sm:gap-6 lg:grid-cols-[260px_1fr] lg:items-center lg:gap-8">
          <span className="text-xs font-bold uppercase leading-relaxed tracking-wide text-muted-foreground">
            Collaborating with leading state departments and industry pioneers:
          </span>
          <div className="flex min-w-0 flex-wrap items-center justify-start gap-x-6 gap-y-3 font-heading text-sm font-semibold text-foreground/90 sm:gap-x-10 sm:text-base lg:justify-between">
            {partners.map((partner) => (
              <span key={partner} className="break-words">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
