export default function Index() {
  return (
    <>
      <header>
        <div className="center">
          <div className="container">
            <img
              className="[ logo ] [ size ]"
              alt="equalizer"
              width="147"
              height="33"
              src="assets/logo.svg"
            />
          </div>
        </div>
      </header>
      <main>
        <article className="[ intro ] [ center ]">
          <div className="container flow">
            <h1>We make your music sound extraordinary.</h1>
            <p>
              A system audio equalizer specifically designed for Android and
              iOS. Freely tune the way your music sounds with a professional
              grade parametric EQ & volume mixer. Control bass, mids, treble,
              gain control, reverb, and more!
            </p>
          </div>
        </article>
        <article className="[ showcase ] [ center ]">
          <div className="deck center">
            <img
              alt="the equalizer user interface"
              src="assets/illustration-app.png"
            />
            <article className="[ card ] [ flow shape ]">
              <h2>Premium EQ</h2>
              <p className="card__description">
                Get expert-level control with a robust equalizer, volume mixer,
                and spatial audio. Take your listening experience to a whole new
                level and access all our incredible features!
              </p>
              <p className="[ price card__price ] [ cluster ]">
                <strong className="price__value">$4</strong> / month
              </p>
              <h3 className="visually-hidden">Download links</h3>
              <ul className="[ card__downloads ] [ flow reset ]" role="list">
                {[
                  { icon: "apple", width: 18, label: "iOS Download" },
                  {
                    icon: "android",
                    width: 17,
                    label: "Android Download",
                    theme: "light",
                  },
                ].map((download, index) => (
                  <li key={index}>
                    <a
                      className="[ button ] [ cluster shape ]"
                      href="#"
                      data-button-theme={download.theme}
                    >
                      <img
                        alt=""
                        width={download.width}
                        height="20"
                        src={`assets/icon-${download.icon}.svg`}
                      />{" "}
                      {download.label}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </article>
      </main>
      <footer>
        <div className="center">
          <img
            className="[ logo ] [ size ]"
            alt="equalizer"
            width="147"
            height="33"
            src="assets/logo.svg"
          />
          <p>All rights reserved © Equalizer 2021</p>
          <p>
            Have any problems? Contact us via social media or email us at{" "}
            <a href="mailto:equalizer@example.com">equalizer@example.com</a>
          </p>
          <p>Social media links:</p>
          <ul>
            {[
              { name: "facebook" },
              { name: "instagram" },
              { name: "twitter", height: 17 },
            ].map((site, index) => (
              <li key={index}>
                <a href="#">
                  <img
                    alt={site.name}
                    width="20"
                    height={site.height ?? 20}
                    src={`assets/icon-${site.name}.svg`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
