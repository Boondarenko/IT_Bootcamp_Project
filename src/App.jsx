import { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "./components/CharacterCard";
import CharacterModal from "./components/CharacterModal";
import ScrollToTopButton from "./components/ScrollToTopButton";
import InfiniteScrollLoader from "./components/InfiniteScrollLoader";
import { Spinner } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import "./styles/main.scss";

function App() {
   const [characters, setCharacters] = useState([]);
   const [page, setPage] = useState(1);
   const [selectedCharacter, setSelectedCharacter] = useState(null);
   const [loading, setLoading] = useState(true);
   const [isLoadingMore, setIsLoadingMore] = useState(false);

   const fetchCharacters = async (page) => {
      try {
         const response = await axios.get(
            `https://rickandmortyapi.com/api/character/?page=${page}`
         );
         const newCharacters = response.data.results.map((character) => ({
            ...character,
            key: uuidv4(),
         }));
         setCharacters((prevCharacters) => [
            ...prevCharacters,
            ...newCharacters,
         ]);
         setLoading(false);
      } catch (error) {
         console.error("Error fetching characters:", error);
         setLoading(false);
      }
   };

   const loadMoreCharacters = () => {
      setIsLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
   };

   useEffect(() => {
      fetchCharacters(page);
   }, [page]);

   const handleCharacterClick = (character) => {
      setSelectedCharacter(character);
   };

   const handleCloseModal = () => {
      setSelectedCharacter(null);
   };

   const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
         document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
         setPage((prevPage) => prevPage + 1);
      }
   };

   useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return (
      <div className="container">
         <h1 className="my-4">Rick and Morty Characters</h1>
         <div className="row">
            {characters.map((character) => (
               <div key={character.key} className="col-md-4 mb-4">
                  <CharacterCard
                     name={character.name}
                     image={character.image}
                     onClick={() => handleCharacterClick(character)}
                  />
               </div>
            ))}
         </div>
         {loading && (
            <div className="loader-container">
               <Spinner animation="border" variant="primary" />
            </div>
         )}
         {selectedCharacter && (
            <CharacterModal
               character={selectedCharacter}
               onClose={handleCloseModal}
            />
         )}
         <InfiniteScrollLoader
            isLoading={isLoadingMore}
            onLoadMore={loadMoreCharacters}
         />
         <ScrollToTopButton />
      </div>
   );
}

export default App;
