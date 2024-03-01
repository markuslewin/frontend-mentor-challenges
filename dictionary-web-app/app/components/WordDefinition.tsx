import { Fragment, ReactNode, forwardRef } from "react";
import { useAudio } from "../utils/audio";
import { Icon } from "./ui/icon";
import { Link } from "@remix-run/react";

export function WordDefinition({
  definition,
  children,
}: {
  definition: {
    phonetic: {
      audio?: string;
      text?: string;
    };
    meanings?: {
      partOfSpeech?: string;
      definitions?: {
        definition?: string;
        example?: string;
      }[];
      synonyms?: string[];
      antonyms?: string[];
    }[];
    sourceUrls?: string[];
  };
  children: ReactNode;
}) {
  return (
    <article className="mt-6 tablet:mt-11">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          {children}
          <p className="mt-2 font-sans text-body-m text-A445ED tablet:text-heading-m">
            {definition.phonetic?.text}
          </p>
        </div>
        {definition.phonetic.audio ? (
          <PlayButton src={definition.phonetic.audio} />
        ) : null}
      </div>
      {definition.meanings?.map((meaning, i) => {
        return (
          <Fragment key={i}>
            <h3 className="mt-8 flex items-center gap-5 text-[1.125rem] font-bold italic leading-[1.375rem] after:flex-1 after:border-t-[1px] after:text-separator tablet:mt-10 tablet:text-[1.5rem] tablet:leading-[1.8125rem]">
              {meaning.partOfSpeech}
            </h3>
            {meaning.definitions && meaning.definitions.length ? (
              <>
                <h4 className="mt-8 text-[1rem] leading-[1.1875rem] text-757575 tablet:mt-10 tablet:text-heading-s">
                  Meaning
                </h4>
                {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                <ul
                  className="mt-4 tablet:mt-6 tablet:pl-[1.375rem]"
                  role="list"
                >
                  {meaning.definitions.map((definition, i) => {
                    return (
                      <li
                        className="mt-3 grid grid-cols-[max-content_1fr] gap-5 before:mt-[0.625rem] before:inline-block before:h-[0.3125rem] before:w-[0.3125rem] before:rounded-full before:border-t-[0.3125rem] before:text-[hsl(274_82%_50%)] first:mt-0"
                        key={i}
                      >
                        <div>
                          <p>{definition.definition}</p>
                          {definition.example ? (
                            <>
                              <hr className="sr-only" />
                              <p className="mt-3">
                                <span className="sr-only">Example: </span>
                                <q className="text-757575">
                                  {definition.example}
                                </q>
                              </p>
                            </>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : null}
            {meaning.synonyms && meaning.synonyms.length ? (
              <div className="mt-6 grid grid-cols-[max-content_1fr] items-baseline gap-6 text-[1rem] leading-[1.1875rem] tablet:mt-10 tablet:text-heading-s desktop:mt-16">
                <h4 className="text-757575">Synonyms</h4>
                {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                <ul className="flex flex-wrap gap-4" role="list">
                  {meaning.synonyms.map((synonym, i) => {
                    return (
                      <li key={i}>
                        <Link
                          className="font-bold text-A445ED underline-offset-[0.25rem] hocus:underline"
                          to={`/${encodeURIComponent(synonym)}`}
                        >
                          {synonym}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </Fragment>
        );
      })}
      {definition.sourceUrls && definition.sourceUrls.length ? (
        <footer className="mt-8 border-t-[1px] border-t-separator pt-6 text-body-s underline-offset-[0.125rem] tablet:mt-10 tablet:grid tablet:grid-cols-[max-content_1fr] tablet:gap-5 tablet:pt-5">
          <h3 className="text-757575 underline">Source</h3>
          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
          <ul role="list">
            {definition.sourceUrls.map((sourceUrl, i) => {
              return (
                <li className="mt-2 tablet:first:mt-0" key={i}>
                  <Link
                    className="flex items-center gap-2 underline hocus:no-underline"
                    to={sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="sr-only">Opens in new window: </span>
                    {sourceUrl}
                    <Icon
                      className="size-[0.875rem] text-757575"
                      name="icon-new-window"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </footer>
      ) : null}
    </article>
  );
}

function PlayButton({ src }: { src: string }) {
  const audio = useAudio(src);

  return (
    <button
      className="rounded-full bg-A445ED/25 text-A445ED opacity-50 transition-all data-[ready=true]:opacity-100 hocus:bg-A445ED hocus:text-FFFFFF"
      onClick={() => {
        audio.play();
      }}
      aria-disabled={!audio.ready}
      data-ready={audio.ready}
    >
      <Icon
        className="size-12 rounded-full border-[1px] border-transparent tablet:size-[4.6875rem]"
        name="icon-play"
      />
      <span className="sr-only">Play phonetic</span>
    </button>
  );
}

const Title = forwardRef<
  HTMLHeadingElement,
  React.ButtonHTMLAttributes<HTMLHeadingElement>
>((props, ref) => {
  return (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h2
      className="text-[2rem] font-bold leading-[2.4375rem] tablet:text-heading-l"
      ref={ref}
      {...props}
    />
  );
});
Title.displayName = "Title";

export { Title };
