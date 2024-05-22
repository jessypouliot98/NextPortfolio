import { Section } from "@/components/common/Section/Section";
import { CardPortfolioProject } from "@/components/domain/portfolio/CardPortfolioProject/CardPortfolioProject";

export function SectionPortfolio() {
  return (
    <Section id="portfolio">
      <Section.Title>
        Hello World
      </Section.Title>
      <Section.Content asChild className="grid grid-cols-3 gap-4">
        <ul>
          <li>
            <CardPortfolioProject project={{ name: "Foo", skills: [{ name: "Bar" }] }}/>
          </li>
          <li>
            <CardPortfolioProject project={{ name: "Bar", skills: [{ name: "Baz" }] }}/>
          </li>
          <li>
            <CardPortfolioProject project={{ name: "Bar", skills: [{ name: "Baz" }] }}/>
          </li>
          <li>
            <CardPortfolioProject project={{ name: "Bar", skills: [{ name: "Baz" }] }}/>
          </li>
          <li>
            <CardPortfolioProject project={{ name: "Bar", skills: [{ name: "Baz" }] }}/>
          </li>
          <li>
            <CardPortfolioProject project={{ name: "Bar", skills: [{ name: "Baz" }] }}/>
          </li>
        </ul>
      </Section.Content>
    </Section>
  )
}