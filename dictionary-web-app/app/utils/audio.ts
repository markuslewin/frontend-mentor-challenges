import { useEffect, useState } from "react";

export function useAudio(src: string) {
  const [audio, setAudio] = useState({
    ready: false,
    play() {},
  });

  useEffect(() => {
    const $audio = new Audio();
    $audio.addEventListener("canplaythrough", () => {
      setAudio({
        ready: true,
        async play() {
          try {
            await $audio.play();
          } catch (e) {
            console.error(e);
          }
        },
      });
    });

    setAudio({
      ready: false,
      play() {},
    });
    $audio.src = src;
  }, [src]);

  return audio;
}
