import { Meme } from "./types";

interface MemeListProps {
  memes: Meme[];
  hasLikedMeme(meme: Meme): boolean;
  onToggleLike(meme: Meme): void;
}

export default function MemeList({
  memes,
  hasLikedMeme,
  onToggleLike
}: MemeListProps) {
  return (
    <ul className="MemeList">
      {memes.map((meme, index) => (
        <li key={index} className="MemeListItem">
          <h2>{meme.title}</h2>
          <img className="Meme" src={meme.url} alt={meme.title} />
          <button onClick={() => onToggleLike(meme)}>
            {hasLikedMeme(meme) ? "Unlike" : "Like"}
          </button>
        </li>
      ))}
    </ul>
  );
}
