import PropTypes from "prop-types";
import { Modal, Button, Row, Col } from "react-bootstrap";

const CharacterModal = ({ character, onClose }) => {
   return (
      <Modal show={character !== null} onHide={onClose} centered>
         <Modal.Header closeButton>
            <Modal.Title>{character?.name}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {character ? (
               <Row>
                  <Col xs={12} md={6} className="character-image">
                     <img src={character.image} alt={character.name} />
                  </Col>
                  <Col xs={12} md={6} className="character-info">
                     <p>Gender: {character.gender}</p>
                     <p>Status: {character.status}</p>
                     <p>Race: {character.species}</p>
                     <p>Origin: {character.origin.name}</p>
                     <p>First Episode: {character.episode[0]}</p>
                  </Col>
               </Row>
            ) : (
               <p>No character selected.</p>
            )}
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
               Close
            </Button>
         </Modal.Footer>
      </Modal>
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
      image: PropTypes.string.isRequired,
   }),
   onClose: PropTypes.func.isRequired,
};

export default CharacterModal;
