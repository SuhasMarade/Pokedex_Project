import './Pokemon.css';
import { Link } from 'react-router-dom';
function Pokemon ({name, image, id}) {
    return (
        <div className='pokemon'>
            <Link to={`pokemon/${id}`}>
              <h3 className='pokemon-name'>{name}</h3>
              <img className="pokemon-image" src={image} />
            </Link>
        </div>
    )

}

export default Pokemon;