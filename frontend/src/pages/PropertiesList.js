import "../styles/PropertiesList.css"
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import BigFilter from "../components/BigFilter"
import { connect } from "react-redux"
import propertiesActions from "../redux/action/propertiesActions"
import userActions from "../redux/action/userActions"
import citiesActions from "../redux/action/citiesActions"
import CardProperty from "../components/CardProperty"

const PropertiesList = (props) => {
    const [subscription, setSubscription] = useState("")
    const {filterObj, getCities, getPropertiesFiltered, cities, properties, token} = props
    // console.log(props)
    useEffect(() => {
        if (properties.length === 0) {
            getPropertiesFiltered({})
            .then(res => {
                if(!res.data.success){
                    throw new Error('Something went wrong')
                }
                console.log(res.data.response)
            })
            .catch(err => console.log(err))
            console.log("Properties List se monto y se cargo prop")
        }
        if (cities === 0) {
            getCities().then(res => {
                if(!res.data.success){
                    throw new Error('Something went wrong')
                }
                console.log(res.data.response)
                })
                .catch(err => console.log(err))
        }
    }, [])

    const subscribeEmail = () => {
        props.putSubscribeEmail(token)
        .then(res => {
            res.success ?
            setSubscription("Gracias por suscribirte! Te enviaremos un mail cuando tengamos nuevas casas disponibles") :
            setSubscription(res.error)
        })
    }

    const renderNoHouses = () => {
        return (
            <div className="propertiesListNoHousesDiv">
                {/* <div className="imageDiv" style={{backgroundImage: "url('./assets/noHouses.jpg')"}}>
                </div> */}
                <p>No hay resultados para tu busqueda</p>
                {!token ?
                <p>test</p> :
                subscription === "" ?
                <div>
                    <p>Suscribete para recibir un aviso cuando haya resultados nuevos</p>
                    <button onClick={subscribeEmail}>Suscribete</button>
                </div> :
                <p>{subscription}</p>
                }
            </div>
        )
    }

    console.log(filterObj)
    console.log("Array de propiedades", properties)
    return (
        <div className="containerPropertiesList">
            <Header />
            <BigFilter filterObj={filterObj}/>
            {/* select para ordenar */}
            {properties.length !== 0 ?
                <div className="propertiesCardList">
                    {properties.map(property =><CardProperty key={property._id} property={property}/>)}
                </div> :
                renderNoHouses()
            }
            <Footer />
        </div>
    )
}

const mapDispatchToProps = {
    getPropertiesFiltered: propertiesActions.getPropertiesFiltered,
    getCities: citiesActions.getCities,
    putSubscribeEmail: userActions.putSubscribeEmail
}

const mapStateToProps = (state) => {
    return {
        filterObj: state.properties.filterObj,
        properties: state.properties.properties,
        cities: state.allCities.cities,
        token: state.user.token
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PropertiesList)
