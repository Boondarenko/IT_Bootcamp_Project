import PropTypes from "prop-types";

const CharacterCard = ({ name, image, onClick }) => {
   return (
      <div className="card" style={{ width: "18rem" }} onClick={onClick}>
         <img src={image} className="card-img-top" alt={name} />
         <div className="card-body">
            <p className="card-text">{name}</p>
         </div>
      </div>
   );
};

CharacterCard.propTypes = {
   name: PropTypes.string.isRequired,
   image: PropTypes.string.isRequired,
   onClick: PropTypes.func.isRequired,
};

export default CharacterCard;
