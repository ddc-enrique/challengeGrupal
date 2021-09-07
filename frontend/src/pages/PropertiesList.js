import "../styles/PropertiesList.css"
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import BigFilter from "../components/BigFilter"
import { connect } from "react-redux"

const PropertiesList = (props) => {
    const {filterObj} = props
    // console.log(props)
    console.log(props.filterObj)
    return (
        <div className="containerPropertiesList">
            <Header />
            <BigFilter filterObj={filterObj}/>
            {/* select para ordenar */}
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filterObj: state.properties.filterObj,
    }
}
export default connect(mapStateToProps)(PropertiesList)
