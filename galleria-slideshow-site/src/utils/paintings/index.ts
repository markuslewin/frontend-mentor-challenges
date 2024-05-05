import data from "./data.json";

const images = import.meta.glob("./**/*.jpg", {
  query: "?as=metadata",
  eager: true,
});

function getImage(path: string) {
  return images[path] as { src: string; width: number; height: number };
}

const paintings = data.map((painting) => {
  return {
    ...painting,
    artist: {
      ...painting.artist,
      image: getImage(painting.artist.image),
    },
    images: {
      thumbnail: getImage(painting.images.thumbnail),
      hero: {
        small: getImage(painting.images.hero.small),
        large: getImage(painting.images.hero.large),
      },
      gallery: getImage(painting.images.gallery),
    },
  };
});

export { paintings };
