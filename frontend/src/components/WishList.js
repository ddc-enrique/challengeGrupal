import "../styles/WishList.css";
import React from 'react'
import { BsX } from "react-icons/bs";
import { connect } from "react-redux"
import CardProperty from "./CardProperty";

const WishList = (props) => {

    return (
        <div className="wishList">
            <div className="wishListTitle">
                <h3>Favoritos</h3>
                <div onClick={() => props.closeWishList()} className="closeButton"><BsX /></div>                
            </div>
            <div className="wishListBox">
                {props.properties.map((property, index) => (
                    // <div key={index}>{property.address}</div>
                    <div className="wishListItem"><CardProperty property={property} key={index}/></div>
                ))}
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        // properties: state.properties.properties
    }
}
export default connect(mapStateToProps)(WishList)

// <CardProperty />

