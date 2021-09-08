import "../styles/CardProperty.css"
import CarouselImg from "./CarouselImg"


const CardProperty = (props) => {
    const property = props.properties[0]
    console.log(property)
    const currency = property.isUSD ? "USD" : "$"
    const contract = property.forSale ? "Propiedad a la venta" : "Propiedad en alquiler"
    const type = property.isHouse ? "Casa" : "Departamento"
    const bathrooms = property.numberOfBathrooms === 1 ? "baño" : "baños"
    const garage = property.haveGarage > 0 ? " / cochera" : null

    return(
        <div className="cardProperty">    
            <div className="cardPropertySlider">
               <CarouselImg property={property.photosURL} /> 
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
        </div>
    )
}

export default CardProperty


// <Swiper
//                     id="swiper"
//                     grabCursor={true}
//                     spaceBetween={1} 
//                     slidesPerView={1}
//                     loop={true}
//                     autoplay={{"dealy": 3500, "disableOnInteraction": false, pauseOnMouseEnter: true}}
//                 >
//                     {property.photosURL.map((img, index) => (
//                         <SwiperSlide key={index}>
//                             <di>
//                                 <div className="pictureCardProperty" style={{backgroundImage:`url(${img})`}}></div>
//                             </di>
//                         </SwiperSlide>
//                     ))}
//                 </Swiper>