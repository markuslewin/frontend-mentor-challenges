import { type Metadata } from "next";
import { OverlaidFooter } from "~/app/_components/footer";
import {
  AppDesignService,
  GraphicDesignService,
} from "~/app/_components/service";
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
import blogrUrl from "~/app/web-design/_assets/image-blogr.jpg";
import builderUrl from "~/app/web-design/_assets/image-builder.jpg";
import campUrl from "~/app/web-design/_assets/image-camp.jpg";
import expressUrl from "~/app/web-design/_assets/image-express.jpg";
import photonUrl from "~/app/web-design/_assets/image-photon.jpg";
import transferUrl from "~/app/web-design/_assets/image-transfer.jpg";

const projects: Project[] = [
  {
    image: expressUrl,
    name: "Express",
    body: "A multi-carrier shipping website for ecommerce businesses",
  },
  {
    image: transferUrl,
    name: "Transfer",
    body: "Site for low-cost money transfers and sending money within seconds",
  },
  {
    image: photonUrl,
    name: "Photon",
    body: "A state-of-the-art music player with high-resolution audio and DSP effects",
  },
  {
    image: builderUrl,
    name: "Builder",
    body: "Connects users with local contractors based on their location",
  },
  {
    image: blogrUrl,
    name: "Blogr",
    body: "Blogr is a platform for creating an online blog or publication",
  },
  {
    image: campUrl,
    name: "Camp",
    body: "Get expert training in coding, data, design, and digital marketing",
  },
];

export const metadata: Metadata = {
  title: "Web Design",
};

export default function WebDesignPage() {
  return (
    <>
      <main>
        <HeroContainer>
          <Hero>
            <Title>Web Design</Title>
            <Description>
              We build websites that serve as powerful marketing tools and bring
              memorable brand experiences.
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
            <GraphicDesignService />
          </Services>
        </ProjectsAndServicesContainer>
        <GetInTouch />
      </main>
      <OverlaidFooter />
    </>
  );
}
