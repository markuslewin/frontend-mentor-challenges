import planets from "./data.json";

export type Planet = (typeof planets)[number];

export { planets };
