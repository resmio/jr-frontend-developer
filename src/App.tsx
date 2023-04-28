import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import { Meme } from "./types";
import { getMemes } from "./api";
import { getMemeId } from "./utils";
import MemeList from "./MemeList";

export default function App({ isLikedPage }: { isLikedPage: boolean }) {
  const [memes, setMemes] = useState<Meme[]>([]);
  // #3 if there are memes saved in local storage, set them as the state's initial value
  const [likedMemes, setLikedMemes] = useState<Meme[]>(JSON.parse(localStorage.memes || null) || []);
  const [isLoading, setLoading] = useState(false);

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
      // #2 (was already functional) - new liked memes get added to the beginning of the array, thus being correctly displayed in the order new > old
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

  // #3 on change of liked memes, update local storage
  useEffect(() => {
    localStorage.setItem('memes', JSON.stringify(likedMemes))
  }, [likedMemes])

  return (
    <>
      <nav className="Nav">
        <ul className="NavList">
          <li className="NavListItem">
            <button className="NavButton">
              <Link to="/new" >New Memes</Link>
            </button>
          </li>
          <li className="NavListItem">
            <button className="NavButton">
            {/* #1 show number of liked memes  */}
              <Link to="/liked" >Liked Memes ({likedMemes?.length})</Link>
            </button>
          </li>
        </ul>
      </nav>
      <main className="Main">
        <MemeList
          memes={ isLikedPage ? likedMemes : memes}
          hasLikedMeme={hasLikedMeme}
          onToggleLike={toggleLike}
        />
      </main>
      <footer className="Footer">
        {!isLikedPage && (
          <button disabled={isLoading} onClick={() => loadMoreMemes()}>
            Load more
          </button>
        )}
      </footer>
    </>
  );
}
