import { Meme } from "./types";

export function getMemeId(meme: Meme) {
  return meme.postLink;
}
