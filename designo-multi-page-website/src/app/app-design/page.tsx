import { type Metadata } from "next";
import { OverlaidFooter } from "~/app/_components/footer";
import {
  GraphicDesignService,
  WebDesignService,
} from "~/app/_components/service";
import {
  Description,
  GetInTouch,
  Hero,
  HeroContainer,
  Leaf,
  Project,
  Projects,
  ProjectsAndServicesContainer,
  Services,
  Title,
} from "~/app/_components/service-page";
import airfilterUrl from "~/app/app-design/_assets/image-airfilter.jpg";
import eyecamUrl from "~/app/app-design/_assets/image-eyecam.jpg";
import faceitUrl from "~/app/app-design/_assets/image-faceit.jpg";
import loopstudiosUrl from "~/app/app-design/_assets/image-loopstudios.jpg";
import todoUrl from "~/app/app-design/_assets/image-todo.jpg";

const projects: Project[] = [
  {
    image: airfilterUrl,
    name: "Airfilter",
    body: "Solving the problem of poor indoor air quality by filtering the air",
  },
  {
    image: eyecamUrl,
    name: "Eyecam",
    body: "Product that lets you edit your favorite photos and videos at any time",
  },
  {
    image: faceitUrl,
    name: "Faceit",
    body: "Get to meet your favorite internet superstar with the faceit app",
  },
  {
    image: todoUrl,
    name: "Todo",
    body: "A todo app that features cloud sync with light and dark mode",
  },
  {
    image: loopstudiosUrl,
    name: "Loopstudios",
    body: "A VR experience app made for Loopstudios",
  },
];

export const metadata: Metadata = {
  title: "App Design",
};

export default function AppDesignPage() {
  return (
    <>
      <main>
        <HeroContainer>
          <Hero desktopPattern="app">
            <Title>App Design</Title>
            <Description>
              Our mobile designs bring intuitive digital solutions to your
              customers right at their fingertips.
            </Description>
          </Hero>
        </HeroContainer>
        <Leaf />
        <ProjectsAndServicesContainer>
          <Projects>
            {projects.map((project) => {
              return <Project key={project.name} {...project} />;
            })}
          </Projects>
          <Services>
            <WebDesignService />
            <GraphicDesignService />
          </Services>
        </ProjectsAndServicesContainer>
        <GetInTouch />
      </main>
      <OverlaidFooter />
    </>
  );
}
