import "../styles/PropertiesList.css"
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import BigFilter from "../components/BigFilter"

const PropertiesList = () => {
    
    
    return (
        <div className="containerPropertiesList">
            <Header />
            <BigFilter />
            {/* select para ordenar */}
            <Footer />
        </div>
    )
}

export default PropertiesList
