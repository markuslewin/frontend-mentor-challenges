import { Facebook, Instagram, Twitter } from "../components/icon";

export default function Index() {
  return (
    <>
      <header>
        <img alt="huddle" src="/images/logo.svg" />
      </header>
      <main>
        <img alt="" src="/images/illustration-mockups.svg" />
        <h1>Build The Community Your Fans Will Love</h1>
        <p>
          Huddle re-imagines the way we build communities. You have a voice, but
          so does your audience. Create connections with your users as you
          engage in genuine discussion.
        </p>
        <p>
          <a className="button" href="#">
            Register
          </a>
        </p>
      </main>
      <footer>
        <h2 id="socials-heading" className="sr-only">
          Social media links
        </h2>
        <ul role="list" aria-describedby="socials-heading">
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
