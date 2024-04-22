import { NavLink } from "react-router-dom";

export function DestinationMoonRoute() {
  return (
    <div className="mt-8 tablet:mt-[3.75rem] desktop:mt-16 desktop:grid desktop:grid-cols-2">
      <picture>
        <source
          type="image/webp"
          srcSet="/assets/destination/image-moon.webp"
        />
        <img
          className="desktop:ml-16 w-[10.625rem] tablet:w-[18.75rem] desktop:w-[27.8125rem]"
          alt=""
          src="/assets/destination/image-moon.png"
        />
      </picture>
      <div>
        <h2>Moon</h2>
        {/* todo: Name nav */}
        <nav>
          <ul className="flex flex-wrap gap-4">
            <li>
              <NavLink to="/destination">Moon</NavLink>
            </li>
            <li>
              <NavLink to="/destination/mars">Mars</NavLink>
            </li>
            <li>
              <NavLink to="/destination/europa">Europa</NavLink>
            </li>
            <li>
              <NavLink to="/destination/titan">Titan</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">

//   <link rel="icon" type="image/png" sizes="32x32" href="./assets/favicon-32x32.png">

//   <title>Frontend Mentor | Space tourism website</title>
// </head>
// <body>

//   00 Home
//   01 Destination
//   02 Crew
//   03 Technology

//   01 Pick your destination

//   Moon
//   Mars
//   Europa
//   Titan

//   Moon

//   See our planet as you’ve never seen it before. A perfect relaxing trip away to help
//   regain perspective and come back refreshed. While you’re there, take in some history
//   by visiting the Luna 2 and Apollo 11 landing sites.

//   Avg. distance
//   384,400 km

//   Est. travel time
//   3 days
// </body>
// </html>
