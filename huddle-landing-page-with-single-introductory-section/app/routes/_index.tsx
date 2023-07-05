import { Facebook, Instagram, Twitter } from "../components/icon";
import { Huddle } from "../components/logo";

export default function Index() {
  return (
    <>
      <header>
        <Huddle /> <span className="sr-only">Huddle</span>
      </header>
      <main className="mt-14 tablet:mt-20">
        <img
          className="mx-auto h-auto"
          alt=""
          src="/images/illustration-mockups.svg"
          width={709}
          height={506}
        />
        <div className="mt-16 desktop:mt-8">
          <h1>Build The Community Your Fans Will Love</h1>
          <p className="mt-4 tablet:mt-6">
            Huddle re-imagines the way we build communities. You have a voice,
            but so does your audience. Create connections with your users as you
            engage in genuine discussion.
          </p>
          <p className="mt-6">
            <a className="button" href="#">
              Register
            </a>
          </p>
        </div>
      </main>
      <footer className="mt-16 tablet:mt-7">
        <h2 id="socials-heading" className="sr-only">
          Social media links
        </h2>
        <ul
          className="flex flex-wrap justify-center gap-3 tablet:gap-4 desktop:justify-end"
          role="list"
          aria-describedby="socials-heading"
        >
          {[
            { name: "facebook", icon: <Facebook /> },
            { name: "twitter", icon: <Twitter /> },
            { name: "instagram", icon: <Instagram /> },
          ].map((site, i) => {
            return (
              <li key={i}>
                <a className="icon" href="#" data-site={site.name}>
                  {site.icon} <span className="sr-only">{site.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </footer>
    </>
  );
}
