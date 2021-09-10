import React, {useEffect, useState} from "react"
import {connect} from 'react-redux'
import propertiesActions from "../redux/action/propertiesActions"
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarouselImg from "../components/CarouselImg";
import "../styles/Property.css";
import {BiArea} from "react-icons/bi"
import {RiRuler2Line} from "react-icons/ri"
import {BiDoorOpen} from "react-icons/bi"
import {IoBedOutline} from "react-icons/io5"
import {BiBath} from "react-icons/bi"
import {VscPerson} from "react-icons/vsc"
import {GiCctvCamera} from "react-icons/gi"
import {BiCar} from "react-icons/bi"
import {GiParkBench} from "react-icons/gi"
import {FaSwimmingPool} from "react-icons/fa"

const Property = (props) => {
    const [connectionWithAPI, setConnectionWithAPI] = useState("connected")
    const [loading, setLoading] = useState(true)
    const [property, setProperty] = useState({})
    useEffect(() => {
        window.scroll(0,0)
        if (props.properties.length === 0) {
            props.getProperty(props.match.params.id)
            .then(res => {
                if (!res.success) {
                    setConnectionWithAPI(res.error)
                } else {
                    setProperty(res.response)
                }
                setLoading(false)
            })
        } else {
            const propertySelected = props.properties.filter(property => property._id === props.match.params.id)
            setProperty(propertySelected[0])
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderVideo = () => {
        return (
            property.videoURL !== "" &&
            <section className="videoSection">
                <article className="videoArticle">
                    <iframe src={property.videoURL}
                        title="YouTube video player" frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                </article>
            </section>
        )
    }

    const renderCarrousel = () => {
        return (
            <section className="carrouselSection">
                <article>
                    <CarouselImg property={property.photosURL}/>
                </article>
            </section>
        )
    }

    const renderProperty = () => {
        return (
            <>
                <h1 className="houseStyleH1">{property.houseStyle}</h1>
                {renderCarrousel()}
                <section className="dataSection">
                    <article className="priceAndAddressArticle">
                        <div className="addressDiv">
                            <h2>Dirección: {property.address}</h2>
                            <h3>Barrio: {property.district}</h3>
                            <h3>Ciudad: {property.city.cityName}</h3>
                        </div>
                        <p className="priceP">{`${property.isUSD ? "USD" : "ARS"} ${property.price}`}</p>
                    </article>
                    <article className="typeOfArticle">
                        <p>{`
                            ${property.isHouse ? "Casa" : "Departamento"} ${
                                property.isBrandNew ?
                                "a estrenar" :
                                (property.isHouse ?
                                "usada" :
                                "usado")
                            } ${
                                property.forSale ?
                                "en venta" :
                                `en alquiler por ${property.rentDuration} ${property.shortRental ? "semanas" : "meses"}`
                            }
                        `}</p>
                    </article>
                    <article className="areaAndRoomsArticle">
                        <div>
                            <p><BiArea/> Area edificada: {property.roofedArea}m<sup>2</sup></p>
                            <p><RiRuler2Line/> Area total: {property.totalArea}m<sup>2</sup></p>
                        </div>
                        <div>
                            <p><BiDoorOpen/> {property.numberOfRooms} {property.numberOfRooms > 1 ? "ambientes" : "ambiente"}</p>
                            <p><IoBedOutline/> {property.numberOfBedrooms} {property.numberOfBedrooms > 1 ? "cuartos" : "cuarto"}</p>
                            <p><BiBath/> {property.numberOfBathrooms} {property.numberOfBathrooms > 1 ? "baños" : "baño"}</p>
                        </div>
                    </article>
                    <article className="extrasArticle">
                        <p style={property.hasAttendant ? {color: "green", textDecoration: "none"} : {color: "red", textDecoration: "line-through"}}><VscPerson/> Encargado</p>
                        <p style={property.haveCameras ? {color: "green", textDecoration: "none"} : {color: "red", textDecoration: "line-through"}}><GiCctvCamera/> Camaras</p>
                        <p style={property.haveGarage ? {color: "green", textDecoration: "none"} : {color: "red", textDecoration: "line-through"}}><BiCar/> Cochera</p>
                        <p style={property.haveGarden ? {color: "green", textDecoration: "none"} : {color: "red", textDecoration: "line-through"}}><GiParkBench/> Parque</p>
                        <p style={property.havePool ? {color: "green", textDecoration: "none"} : {color: "red", textDecoration: "line-through"}}><FaSwimmingPool/> Pileta</p>
                    </article>
                </section>
                {renderVideo()}
            </>
        )
    }
    
    return (
        <>
            <Header/>
            <main className="propertyMain">
                {
                    loading ?
                    <section className="propertyLoading">
                        <p>Cargando...</p>
                    </section> :
                    connectionWithAPI === "connected" ?
                    renderProperty() :
                    <section className="propertyErrorConnection">
                        <p>{connectionWithAPI}</p>
                    </section>
                }
            </main>
            <Footer/>
        </>
    )
}

const mapStateToProps = (state) =>{
    return {
        properties: state.properties.properties
    }
}
const mapDispatchToProps = {
    getProperty: propertiesActions.getProperty
}

export default connect(mapStateToProps, mapDispatchToProps)(Property)