import "../styles/CardProperty.css"
import {Link} from "react-router-dom"

const CardProperty = (props) => {
    const property = props.properties[0]
    console.log(property)
    const currency = property.isUSD ? "USD" : "$"
    const contract = property.forSale ? "Propiedad a la venta" : "Propiedad en alquiler"
    const type = property.isHouse ? "Casa" : "Departamento"
    const bathrooms = property.numberOfBathrooms === 1 ? "baño" : "baños"
    const garage = property.haveGarage > 0 ? " / cochera" : null

    return(
        <Link property={property} className="cardProperty">
            <div className="pictureCardProperty"  style={{backgroundImage:`url(${property.photosURL[1]})`}}>
                <h3>{currency} {property.price}</h3>
                <h4>{contract}</h4>
            </div>
            <div className="cardPropertyInfo">
                <div className="infoHeader">
                    <h3>{currency} {property.price}</h3>
                    <h4>{contract}</h4>
                </div>
                <p className="propertyInfoOne">{type} {property.numberOfRooms} amb {property.roofedArea}m cubiertos</p>
                <p className="propertyInfoTwo"><img src="/assets/rrss_icons/cama.svg"/> {property.numberOfBedrooms} hab / <img src="/assets/rrss_icons/ducha.svg"/> {property.numberOfBathrooms} {bathrooms}
                {garage && <img src="/assets/rrss_icons/garage.svg"/> }
                {garage} </p>
                <p className="propertyInfoThree">{property.address}</p>
            </div>
        </Link>
    )
}

export default CardProperty