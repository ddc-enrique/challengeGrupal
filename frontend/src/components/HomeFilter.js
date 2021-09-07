import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import propertiesActions from '../redux/action/propertiesActions'

const HomeFilter = (props) => {

    const [searchProperties, setSearchProperties] = useState(false)
    const [filter, setFilter] = useState({ forSale: true,/*  numberOfBedrooms: 1, numberOfBathrooms: 1, */ /* isHouse: true, */ /* shortRental: false,  houseStyle: "house",  isBrandNew: false, haveGarage: false, */ })

    //revisar si filter se inicializa como un objeto vacio o no. Creo que eberia inicializar con las propiedades inicializadas ya que al hacer click en buscar redirige al componente propertiesList y muestra la lista filtrada como minimo por forSale: true y isHouse: true/ houseStyle: "house" y en ese componenete se amplia los campos para filtrar

    //revisar houseStyle valores

    const history = useHistory()
    
    console.log(filter)
    
    useEffect(() => {
        if (searchProperties) {
            async function getPropertiesFiltered() {
                try {
                    console.log(filter)
                    let res = await props.getPropertiesFiltered(filter)
                    if (!res.data.success) {
                        throw res.data.response
                    } else {
                        history.push("/lista-de-propiedades") //conectar a la escucha de reduz-properties
                    }
                    if (!res.data.response) throw res.data.response
                } catch (err) {
                    console.log(err)
                }
            }
            getPropertiesFiltered()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchProperties])

    const changeClassHandle = (e) => {
        e.preventDefault()
        let elementClicked = e.target.dataset.type
        let childrenUl = e.target.parentNode.children 
        for (var i = 0; i < childrenUl.length; i++) {
            if (childrenUl[i].dataset !== elementClicked) {
                childrenUl[i].className=" "
            } 
        }
        e.target.className="active"
        if (e.target.dataset.type === "forSale") {
            var forSaleValue = true
            var shortRentValue = false
        } else if (e.target.dataset.type === "shortRent") {
            forSaleValue = false
            shortRentValue = true
        } else {
            forSaleValue = false
            shortRentValue = false
        }
        setFilter({
            ...filter,
            forSale: forSaleValue,
            shortRental: shortRentValue,
        })
    }

    const checkHandler = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.checked
        })
    }

    const inputHandler = (e) => {
        e.preventDefault()
        if (e.target.value === "house" ) {
            var ishouseValue  = true
        } else {
            ishouseValue = false
        }
        setFilter({
            ...filter,
            isHouse: ishouseValue,
        })
    }  // VER LA FORMA DE UNIR LOS DOS
    const inputHandlerBedBath = (e) =>{
        if(e.target.value === "all"){
            return false
        }
        setFilter({
            ...filter,
            [e.target.name]: parseInt(e.target.value) === 6 ? {$gte: 6} : parseInt(e.target.value)
        })
    }
    const searchClickHandler = () => {
        setSearchProperties(true)
    }

    return (
        <div className="homeFilter">
            <div className="firstRow">
                <ul>
                    <li className="active" onClick={changeClassHandle} data-type="forSale">Venta</li>
                    <li onClick={changeClassHandle} data-type="forRent" >Alquiler</li>
                    <li onClick={changeClassHandle} data-type="shortRent" >Alquiler temporario</li>
                </ul>    
            </div>
            <div className="secondRow" >
                <div>
                    <select name="houseStyle" onChange={inputHandler}>
                        <option value="house">Casa</option>     
                        <option value="department">Departamento</option>     
                        <option>otra opcion</option>     
                        <option>otra opcion</option>     
                    </select>
                </div>
                <div>
                    <div>
                        <select name="numberOfBedrooms" onChange={inputHandlerBedBath} >
                            <option value="all">Dormitorios</option>
                            <option value="1">1 dormitorio</option>
                            <option value="2">2 dormitorios</option>
                            <option value="3">3 dormitorios</option>
                            <option value="4">4 dormitorios</option>
                            <option value="5">5 dormitorios</option>
                            <option value="6">6 o mas</option>
                        </select>
                    </div>
                    <div>
                        <select name="numberOfBathrooms" onChange={inputHandlerBedBath} >
                            <option value="all">Baños</option>
                            <option value="1">1 baño</option>
                            <option value="2">2 baños</option>
                            <option value="3">3 baños</option>
                            <option value="4">4 baños</option>
                            <option value="5">5 baños</option>
                            <option value="6">6 o mas</option>
                        </select>
                    </div>
                </div>
                <div className="boxes">
                    <div>
                        <input type="checkbox" id="aEstrenar" name="isBrandNew" onChange={checkHandler}/>
                        <label htmlFor="aEstrenar">A estrenar</label>
                    </div>
                    <div>
                        <input type="checkbox" id="conCochera"name="haveGarage" onChange={checkHandler}/>
                        <label htmlFor="conCochera">Con cochera</label>
                    </div>
                </div>
                <div className="homeFilterButtonBigResponsive">
                    <button onClick={searchClickHandler}>Buscar</button>
                </div>
            </div>
            <div className="homeFilterButton">
                <button onClick={searchClickHandler}>Buscar</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        propertiesFiltered: state.properties.properties
    }
}

const mapDispatchToProps = {
    getPropertiesFiltered: propertiesActions.getPropertiesFiltered

}
export default connect(mapStateToProps, mapDispatchToProps)(HomeFilter)
