import "../styles/PropertiesList.css"
import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import BigFilter from "../components/BigFilter"
import { connect } from "react-redux"
import propertiesActions from "../redux/action/propertiesActions"
import citiesActions from "../redux/action/citiesActions"

const PropertiesList = (props) => {
    const {filterObj, getCities, getPropertiesFiltered, cities, properties} = props
    // console.log(props)
    useEffect(() => {
        if (properties.length === 0) {
            // getPropertiesFiltered({})
            // .then(res => {
            //     if(!res.data.success){
            //         throw new Error('Something went wrong')
            //     }
            //     console.log(res.data.response)
            // })
            // .catch(err => console.log(err))
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
    console.log(filterObj)
    return (
        <div className="containerPropertiesList">
            <Header />
            <BigFilter filterObj={filterObj}/>
            {/* select para ordenar */}
            <Footer />
        </div>
    )
}

const mapDispatchToProps = {
    getPropertiesFiltered: propertiesActions.getPropertiesFiltered,
    getCities: citiesActions.getCities
}

const mapStateToProps = (state) => {
    return {
        filterObj: state.properties.filterObj,
        properties: state.properties.properties,
        cities: state.allCities.cities
    }
}
export default connect(mapStateToProps)(PropertiesList)
