import { useEffect, useState } from "react";

import "./styles.css";
import { Meme } from "./types";
import { getMemes } from "./api";
import { getMemeId } from "./utils";
import MemeList from "./MemeList";

export default function App() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [likedMemes, setLikedMemes] = useState<Meme[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"new" | "liked">("new");

  const hasLikedMeme = (meme: Meme) => {
    return !!likedMemes.find((m) => getMemeId(m) === getMemeId(meme));
  };

  const toggleLike = (meme: Meme) => {
    if (hasLikedMeme(meme)) {
      const filteredMemes = likedMemes.filter(
        (m) => getMemeId(m) !== getMemeId(meme)
      );
      setLikedMemes(filteredMemes);
    } else {
      setLikedMemes([meme, ...likedMemes]);
    }
  };

  const loadMoreMemes = async () => {
    try {
      setLoading(true);
      const { memes: newMemes } = await getMemes();
      setMemes([...memes, ...newMemes]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreMemes();
  }, []);

  return (
    <>
      <nav className="Nav">
        <ul className="NavList">
          <li className="NavListItem">
            <button onClick={() => setFilter("new")}>New Memes</button>
          </li>
          <li className="NavListItem">
            <button onClick={() => setFilter("liked")}>Liked Memes</button>
          </li>
        </ul>
      </nav>
      <main className="Main">
        {filter === "new" && (
          <MemeList
            memes={memes}
            hasLikedMeme={hasLikedMeme}
            onToggleLike={toggleLike}
          />
        )}
        {filter === "liked" && (
          <MemeList
            memes={likedMemes}
            hasLikedMeme={() => true}
            onToggleLike={toggleLike}
          />
        )}
      </main>
      <footer className="Footer">
        {filter === "new" && (
          <button disabled={isLoading} onClick={() => loadMoreMemes()}>
            Load more
          </button>
        )}
      </footer>
    </>
  );
}
