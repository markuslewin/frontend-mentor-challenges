import IconCompany from "./IconCompany";
import IconTwitter from "./IconTwitter";
import IconWebsite from "./IconWebsite";
import IconLocation from "./IconLocation";
import IconSearch from "./IconSearch";
import { useState, useRef, useEffect } from "preact/hooks";
import { getUser, parse, type User } from "../data/user";

interface Props {
  user?: User | undefined;
  error?: string | undefined;
  payload?: string | undefined;
  focusUserHeading?: boolean;
}

const App = ({
  error: initialError,
  user: initialUser,
  payload,
  focusUserHeading,
}: Props) => {
  const [user, setUser] = useState(initialUser);
  const [error, setError] = useState(initialError);
  const [isClient, setIsClient] = useState(false);
  const userHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main>
      <div class="search">
        <h1 class="sr-only">Search a GitHub user</h1>
        <form
          class="search__control"
          method="post"
          novalidate={isClient}
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const result = parse(formData);
            if (typeof result.error === "string") {
              setError(result.error);
              return;
            }

            const response = await getUser(result.data.username);
            if (response.error) {
              setError(response.error.message);
              return;
            }

            setUser(response.data);
            setError(undefined);
            // Wait for Preact to render
            setTimeout(() => {
              userHeadingRef.current?.focus();
            });
          }}
          data-has-error={`${!!error}`}
        >
          <label class="search__icon" for="search-input">
            <span class="sr-only">GitHub username</span>
            <IconSearch />
          </label>
          <input
            class="[ search__input ] [ shape ]"
            id="search-input"
            type="text"
            name="username"
            placeholder="Search GitHub username…"
            required
            value={payload}
            autofocus={!!error}
            aria-describedby="search-error"
          />
          <p class="search__error" id="search-error" aria-live="polite">
            {error}
          </p>
          <button class="[ search__button ] [ shape ]" type="submit">
            Search
          </button>
        </form>
      </div>
      {user && (
        <div class="[ result ] [ shape ]">
          <h2 class="sr-only">Result</h2>
          <div class="result__profile">
            <h3
              class="result__name"
              tabindex={-1}
              ref={userHeadingRef}
              autofocus={focusUserHeading}
            >
              {user.name ? user.name : user.login}
            </h3>
            <p class="result__login">@{user.login}</p>
            <p class="result__joined">
              Joined{" "}
              {Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(user.created_at))}
            </p>
          </div>
          <img
            class="result__avatar"
            alt=""
            src={user.avatar_url}
            width="1"
            height="1"
          />
          <div class="result__more">
            <p
              class="transition-color transition-opacity"
              data-availability={user.bio ? "available" : "unavailable"}
            >
              {user.bio ? user.bio : "This profile has no bio"}
            </p>
            <h4 class="sr-only" id="statistics-heading">
              Statistics
            </h4>
            <ul
              class="[ result__stats ] [ shape ]"
              role="list"
              aria-labelledby="statistics-heading"
            >
              {[
                {
                  key: "Repos",
                  value: user.public_repos,
                },
                {
                  key: "Followers",
                  value: user.followers,
                },
                {
                  key: "Following",
                  value: user.following,
                },
              ].map((entry) => {
                return (
                  <li>
                    <span class="result__key">
                      {entry.key}
                      <span class="sr-only">: </span>
                    </span>
                    <span class="transition-color">{entry.value}</span>
                  </li>
                );
              })}
            </ul>
            <h4 class="sr-only" id="details-heading">
              Details
            </h4>
            <ul
              class="[ result__details ] [ transition-color ]"
              role="list"
              aria-labelledby="details-heading"
            >
              {[
                {
                  id: "location",
                  key: "Location",
                  icon: IconLocation,
                  value: user.location,
                },
                {
                  id: "blog",
                  key: "Blog",
                  icon: IconWebsite,
                  value: user.blog,
                  href: user.blog,
                },
                {
                  id: "twitter",
                  key: "Twitter",
                  icon: IconTwitter,
                  value: user.twitter_username,
                  href: user.twitter_username
                    ? `https://twitter.com/${user.twitter_username}`
                    : null,
                },
                {
                  id: "company",
                  key: "Company",
                  icon: IconCompany,
                  value: user.company,
                  href: user.company
                    ? `https://github.com/${
                        user.company.startsWith("@")
                          ? user.company.slice(1)
                          : user.company
                      }`
                    : null,
                },
              ].map((detail) => {
                return (
                  <li
                    class="result__detail"
                    data-id={detail.id}
                    data-availability={
                      detail.value ? "available" : "unavailable"
                    }
                  >
                    <detail.icon />
                    {detail.value ? (
                      detail.href ? (
                        <a href={detail.href}>
                          <span class="sr-only">{detail.key}:</span>{" "}
                          {detail.value}
                        </a>
                      ) : (
                        <>
                          <span class="sr-only">{detail.key}:</span>{" "}
                          {detail.value}
                        </>
                      )
                    ) : (
                      <>
                        <span class="sr-only">{detail.key}:</span> Not Available
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
};

export default App;
