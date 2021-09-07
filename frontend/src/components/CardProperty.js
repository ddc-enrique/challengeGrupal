import "../styles/CardProperty.css"

const CardProperty = (props) => {
    const property = props.properties[0]
    console.log(property)
    const currency = property.isUSD ? "USD" : "$"
    const contract = property.forSale ? "Propiedad a la venta" : "Propiedad en alquiler"
    const type = property.isHouse ? "Casa" : "Departamento"
    const rooms = property.numberOfRooms === 1 ? "ambiente" : "ambientes"
    const bedrooms = property.numberOfBedrooms === 1 ? "habitación" : "habitaciones"
    const bathrooms = property.numberOfBathrooms === 1 ? "baño" : "baños"
    const garage = property.haveGarage > 0 ? " / cochera" : null

    return(
        <div className="cardProperty">
            <div className="pictureCardProperty"  style={{backgroundImage:`url(${property.photosURL[1]})`}}>
                <h3>{currency} {property.price}</h3>
                <h4>{contract}</h4>
            </div>
            <div className="cardPropertyInfo">
                <p>{type} {property.numberOfRooms} {rooms} {property.roofedArea} m cubiertos</p>
                <p style={{fontSize:"0.8rem"}}>{property.numberOfBedrooms} {bedrooms} / {property.numberOfBathrooms} {bathrooms}{garage} </p>
                <p style={{fontSize:"1.1rem"}}>{property.address}</p>
            </div>
        </div>
    )
}

export default CardProperty