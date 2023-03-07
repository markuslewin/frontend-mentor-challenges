export default function Index() {
  return (
    <>
      <header>
        <div className="center container">
          <img
            className="[ logo ] [ size ]"
            alt="equalizer"
            width="147"
            height="33"
            src="assets/logo.svg"
          />
        </div>
      </header>
      <main>
        <article className="center">
          <h1>We make your music sound extraordinary.</h1>
          <p>
            A system audio equalizer specifically designed for Android and iOS.
            Freely tune the way your music sounds with a professional grade
            parametric EQ & volume mixer. Control bass, mids, treble, gain
            control, reverb, and more!
          </p>
        </article>
        <article className="[ showcase ] [ center ]">
          <img
            alt="the equalizer user interface"
            src="assets/illustration-app.png"
          />
          <article>
            <h2>Premium EQ</h2>
            <p>
              Get expert-level control with a robust equalizer, volume mixer,
              and spatial audio. Take your listening experience to a whole new
              level and access all our incredible features!
            </p>
            <p>
              <strong>$4</strong> / month
            </p>
            <h3>Download links</h3>
            <ul>
              {[
                { icon: "apple", width: 18, label: "iOS Download" },
                { icon: "android", width: 17, label: "Android Download" },
              ].map((download, index) => (
                <li key={index}>
                  <a href="#">
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
