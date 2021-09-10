import "../styles/WishList.css";
import React, { useEffect, useState } from 'react'
import { BsX } from "react-icons/bs";
import { connect } from "react-redux"
import CardProperty from "./CardProperty";
import userActions from '../redux/action/userActions'

const WishList = (props) => {

    const [wishList, setWishList] = useState([])

    useEffect(() => {
        async function getWishList() {
            try {
                let res = await props.getWishList(props.token)
                if (!res.data.success) {
                    throw res.data.response
                } else {
                    setWishList(res.data.response)
                }
                if (!res.data.response) throw res.data.response
            } catch (err) {
                console.log(err)
            } 
        }
        getWishList()
    
    }, [])

    return (
        <div className="wishList">
            <div className="wishListTitle">
                <h3>Favoritos</h3>
                <div onClick={() => props.closeWishList()} className="closeButton"><BsX /></div>                
            </div>
            <div className="wishListBox">
            {wishList.map((wish, index) => (
                <div className="wishListItem"><CardProperty property={wish} key={index}/></div>
            ))}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
        likedProperties: state.user.likedProperties,
    }
}

const mapDispatchToProps = {
    getWishList: userActions.getWishList,
}

export default connect(mapStateToProps,mapDispatchToProps)(WishList)


