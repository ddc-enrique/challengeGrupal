import "../styles/BigFilter.css"
import React, { useState } from 'react'
import { PlusSquare } from "react-bootstrap-icons"

const BigFilter = (props) => {
    // const {firstFilter} = props
    const firstFilter = {} //por ahora un objeto vacio pero sera el filtro que llega desde Home
    const [bigFilter, setBigFilter] = useState(firstFilter)
    const [selectFilters, setSelectFilters] = useState(false)
    const cities = ["Mar del Plata", "Miramar"]

    const deletePropertieFromObject = (name) => {
        let objectAux = {};
        Object.keys(bigFilter).forEach((key) =>{
            if(key !== name) objectAux[key] = bigFilter[key] //limpio el objeto filtro sin esta propiedad
        })
        setBigFilter(objectAux)
    }

    const operationHandler = (e) => {
        switch (e.target.value) {
            case "allCases":
                let objectAux = {};
                Object.keys(bigFilter).forEach((key) =>{
                    if(!(key === "forSale" || key ==="shortRental")) objectAux[key] = bigFilter[key]
                })
                setBigFilter(objectAux)
                break;
            
            case "forSale":
                setBigFilter({ ...bigFilter, forSale: true, shortRental:false })                
                break;
             
            case "forRental":
                setBigFilter({ ...bigFilter, forSale: false, shortRental:false })                
                break;                
            
            case "shortRental":
                setBigFilter({ ...bigFilter, forSale: false, shortRental: true })                
                break;

            default:
                break;
        }
    }

    const selectHandler = (e, condition, firstValue, secondValue) => {
        if (e.target.value === "allCases") {
            deletePropertieFromObject(e.target.name)
        } else if( e.target.value === condition) {
            setBigFilter( { ...bigFilter, [e.target.name]: firstValue } )
        } else {
            setBigFilter( { ...bigFilter, [e.target.name]: secondValue } )
        }
    }

    const priceHandler = (e) => {
        if(e.target.value<0) e.target.value = 0 // SI ENTRA EL NUMERO CAPAZ ROMPE TODO
        if(e.target.value === "") {
            deletePropertieFromObject(e.target.name)
        } else {
            setBigFilter( { ...bigFilter, [e.target.name]: parseInt(e.target.value) } )
        }
    }    

    const checkBoxHandler = (e) => {
        if (!e.target.checked) {
            deletePropertieFromObject(e.target.name)
        } else {
            setBigFilter( { ...bigFilter, [e.target.name]: e.target.checked })
        }
    }

    const inputHandler = (e) => {
        console.log(e.target.checked)
    }

    const searchProperties = () => {
        console.log(bigFilter)// llamar al action con axios
        setSelectFilters(false)
    }

    const listFilterHandler = () => {
        console.log("ordenar")
    }

    return (
        <div className="bigFilter">
            <div>
                {!selectFilters &&
                <button onClick={() => setSelectFilters(true)}>
                    Más Filtros <PlusSquare />
                </button>}
                <div className="filtersSelected">
                    <p> Place Holder </p> <p> Place Holder </p> <p> Place Holder </p> 
                </div>
            </div>
            {selectFilters &&            
            <div className="filtersToSelect">
                <div> {/* 1 */}
                    <div>
                        <h5>Operación</h5>
                        <select name="operation" defaultValue="allCases" onChange={operationHandler}>
                            <option value="allCases">Todas las Operaciones</option>
                            <option value="forSale">Venta</option>
                            <option value="forRental">Alquiler</option>
                            <option value="shortRental">Alquiler Termporario</option>
                        </select>
                    </div>
                    <div> {/* AXIOS DE CITIES */}
                        <h5>Ciudad o región</h5>
                        <select name="propertyCity" defaultValue="allCases" onChange={inputHandler}>
                            <option value="allCases">Todas</option>
                            { cities.map(city => <option value={city} key={city}>{city}</option> )}
                        </select>
                    </div>
                </div>
                <div> { /* 2 */}
                    <h5>Tipo de propiedad</h5>
                    <select name="houseStyle" defaultValue="allCases" onChange={inputHandler}>
                        <option value="allCases">Todos</option>
                        <option>Casa</option>
                        <option>Departamento</option>
                    </select>
                </div>                
                <div> {/* 3 */}
                    <div>
                        <h5>Ambientes</h5>
                        <select name="numbersOfRooms" defaultValue="allCases" onChange={(e) => selectHandler(e, "6AndMore",{"$gte":6}, parseInt(e.target.value))}>
                            <option value="allCases">Todos</option>
                            {[1,2,3,4,5].map((x )=> <option value={x} key={x}>{x}</option>)}
                            <option value="6AndMore"> 6 o más</option>
                        </select>
                    </div>
                    <div>
                        <h5>Dormitorios</h5>
                        <select name="numbersOfBedrooms" defaultValue="allCases" onChange={(e) => selectHandler(e, "6AndMore",{"$gte":6}, parseInt(e.target.value))}>
                            <option value="allCases">Todos</option>
                            {[1,2,3,4,5].map((x )=> <option value={x} key={x+10}>{x}</option>)}
                            <option value="6AndMore"> 6 o más</option>
                        </select>
                    </div>
                    <div>
                        <h5>Baños</h5>
                        <select name="numberOfBathrooms" defaultValue="allCases" onChange={(e) => selectHandler(e, "6AndMore",{"$gte":6}, parseInt(e.target.value))}>
                            <option value="allCases">Todos</option>
                            {[1,2,3,4,5].map((x )=> <option value={x} key={x+20}>{x}</option>)}
                            <option value="6AndMore"> 6 o más</option>
                        </select>
                    </div>
                </div>
                <div> {/* 4 */}
                    <div>
                        <h5>Moneda</h5>
                        <select name="isUSD" defaultValue="allCases" onChange={(e) => selectHandler(e, "pesos", false, true)}>
                            <option value="allCases">Todas</option>
                            <option value="pesos">Pesos</option>
                            <option value="dolars">Dólares</option>
                        </select>
                    </div>
                    <div>
                        <h5>Precio desde</h5>
                        <input type="number" name="greater" min={0} onChange={priceHandler} />
                    </div>
                    <div>
                        <h5>Precio hasta</h5>
                        <input type="number" name="lower" min={0} onChange={priceHandler} />
                    </div>
                </div>
                <div> {/* 5 */}
                    <h5>M² Metro Cuadrados Cubiertos</h5>
                    <select name="roofedArea" defaultValue="allCases" onChange={(e) => selectHandler(e, e.target.value, e.target.value, null)}>
                        <option value="allCases">Todas</option>
                        <option value='{"$lte": 40}'>Hasta 40m²</option>
                        <option value='{"$gte":41,"$lte": 80}'>41m² a 80m²</option>
                        <option value='{"$gte":81,"$lte": 200}'>81m² a 200m²</option>
                        <option value='{"$gte":201,"$lte": 600}'>201m² a 600m²</option>
                        <option value='{"$gte":600}'>601m² o más</option>
                    </select>
                </div>
                <div> {/* 6 */}
                    <div>
                        <div>
                            <input type="checkbox" id="isBrandNew" name="isBrandNew" onChange={checkBoxHandler}/>
                            <label htmlFor="isBrandNew" >Solo a estrenar</label>
                        </div>
                        <div>
                            <input type="checkbox" id="haveGarden" name="haveGarden" onChange={checkBoxHandler}/>
                            <label htmlFor="haveGarden" >Con Jardín </label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input type="checkbox" id="haveGarage" name="haveGarage" onChange={checkBoxHandler}/>
                            <label htmlFor="haveGarage" >Con Cochera</label>
                        </div>
                        <div>
                            <input type="checkbox" id="havePool" name="havePool" onChange={checkBoxHandler}/>
                            <label htmlFor="havePool" >Con Pileta</label>
                        </div>
                    </div>
                </div>
                <div> {/* 7 */}
                    <button onClick={searchProperties}>Buscar</button>
                </div>
            </div>}
            <div className="sortList">
                <select onChange={listFilterHandler}>
                    <option>Mas relevante</option>
                    <option>Menor precio</option>
                    <option>Mayor precio</option>
                    <option>Menor superficie</option>
                    <option>Mayor superficie</option>
                </select>
            </div>
        </div>
    )
}

export default BigFilter
