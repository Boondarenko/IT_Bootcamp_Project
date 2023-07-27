import PropTypes from "prop-types";

const CharacterModal = ({ character, onClose }) => {
   return (
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
         <div className="modal-dialog">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title">{character.name}</h5>
                  <button
                     type="button"
                     className="btn-close"
                     onClick={onClose}
                  />
               </div>
               <div className="modal-body">
                  <p>Gender: {character.gender}</p>
                  <p>Status: {character.status}</p>
                  <p>Race: {character.species}</p>
                  <p>Origin: {character.origin.name}</p>
                  <p>First Episode: {character.episode[0]}</p>
               </div>
            </div>
         </div>
      </div>
   );
};

CharacterModal.propTypes = {
   character: PropTypes.shape({
      name: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      species: PropTypes.string.isRequired,
      origin: PropTypes.shape({
         name: PropTypes.string.isRequired,
      }).isRequired,
      episode: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
   }).isRequired,
   onClose: PropTypes.func.isRequired,
};

export default CharacterModal;
