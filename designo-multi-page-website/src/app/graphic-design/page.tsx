import { OverlaidFooter } from "~/app/_components/footer";
import { AppDesignService, WebDesignService } from "~/app/_components/service";
import {
  Description,
  GetInTouch,
  Hero,
  HeroContainer,
  Project,
  Projects,
  ProjectsAndServicesContainer,
  Services,
  Title,
} from "~/app/_components/service-page";
import boxedWaterUrl from "~/app/graphic-design/_assets/image-boxed-water.jpg";
import changeUrl from "~/app/graphic-design/_assets/image-change.jpg";
import scienceUrl from "~/app/graphic-design/_assets/image-science.jpg";

const projects: Project[] = [
  {
    image: changeUrl,
    name: "Tim Brown",
    body: "A book cover designed for Tim Brown’s new release, ‘Change’",
  },
  {
    image: boxedWaterUrl,
    name: "Boxed water",
    body: "A simple packaging concept made for Boxed Water",
  },
  {
    image: scienceUrl,
    name: "Science!",
    body: "A poster made in collaboration with the Federal Art Project",
  },
];

export default function GraphicDesignPage() {
  return (
    <>
      <main>
        <HeroContainer>
          <Hero>
            <Title>Graphic design</Title>
            <Description>
              We deliver eye-catching branding materials that are tailored to
              meet your business objectives.
            </Description>
          </Hero>
        </HeroContainer>
        <ProjectsAndServicesContainer>
          <Projects>
            {projects.map((project) => {
              return <Project key={project.name} {...project} />;
            })}
          </Projects>
          <Services>
            <AppDesignService />
            <WebDesignService />
          </Services>
        </ProjectsAndServicesContainer>
        <GetInTouch />
      </main>
      <OverlaidFooter />
    </>
  );
}
