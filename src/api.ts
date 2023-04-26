import { Meme } from "./types";

interface GetMemesResponse {
  count: number;
  memes: Meme[];
}

export async function getMemes(count: number = 10) {
  const response = await fetch(`https://meme-api.com/gimme/${count}`);
  const json = (await response.json()) as GetMemesResponse;
  return json;
}
