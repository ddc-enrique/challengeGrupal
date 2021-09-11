import "../styles/WishList.css"
import React, { useEffect, useState } from 'react'
import { BsX } from "react-icons/bs"
import { connect } from "react-redux"
import CardProperty from "./CardProperty"
import userActions from '../redux/action/userActions'

const WishList = (props) => {
    const [wishList, setWishList] = useState([])

    useEffect(() => {
        async function getWishList() {
            try {
                let res = await props.getWishList(props.token)
                if (!res.success) {
                    throw new Error()
                } else {
                    setWishList(res.response)
                }
                if (!res.response) throw res.response
            } catch (err) {
                console.log(err)
            }
        }
        getWishList()
    }, [])

    return (
        <div className="wishList">
            <div className="wishListTitle">
                <h3>Tus propiedades favoritas</h3>
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
    }
}

const mapDispatchToProps = {
    getWishList: userActions.getWishList,
}

export default connect(mapStateToProps,mapDispatchToProps)(WishList)