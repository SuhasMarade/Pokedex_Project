import './Pokemon.css';
function Pokemon ({name, image}) {
    return (
        <div className='pokemon'>
            <h3 className='pokemon-name'>{name}</h3>
            <img className="pokemon-image" src={image} />
        </div>
    )

}

export default Pokemon;