import "../styles/BigFilter.css"
import React, { useEffect, useState } from 'react'
import { Flag, PlusSquare } from "react-bootstrap-icons"

const BigFilter = (props) => {
    // const {firstFilter} = props; por ahora un objeto vacio pero sera el filtro que llega desde Home
    const firstFilter = { meTengoQueBorrar: true }
    // variable de estado que controla los valores de formulario, esto en realidad esta seteado pq el filtro llega vacio.
    // Pero lo voy a cambiar para que se inicialice en base a lo que me llegue desde el filtro
    const [formFilter, setFormFilter] = useState({
        operation: "allCases",  city:"allCases", isHouse: "allCases", 
        numberOfRooms:"allCases", numberOfBedrooms:"allCases", numberOfBathrooms:"allCases",
        isUSD:"allCases", greater:"", lower:"", roofedArea:"allCases",
        isBrandNew:false, haveGarden:false, haveGarage:false, havePool:false
    })
    //variable de estado que se envia al fetchear para filtrar
    const [bigFilter, setBigFilter] = useState(firstFilter)
    // variable de estado para que se muestre o no los formularios del filtro
    const [selectFilters, setSelectFilters] = useState(false)
    let countDeleteFirstFilter = 0
    
    // eliminar array al fetchear de la api cities
    const cities = [{cityName:"Mar del Plata", _id:"61339e91002bc214e66e9770"}, {cityName:"Miramar", _id:"6134d063b943d648e2be7014"}]

    useEffect(() => {
        if(countDeleteFirstFilter === 0) setBigFilter({})
    }, [countDeleteFirstFilter])

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
        setFormFilter({ ...formFilter, operation: e.target.value})
    }

    const selectHandler = (e, condition, firstValue, secondValue) => {
        if (e.target.value === "allCases") {
            deletePropertieFromObject(e.target.name)
        } else if( e.target.value === condition) {
            setBigFilter( { ...bigFilter, [e.target.name]: firstValue } )
        } else {
            setBigFilter( { ...bigFilter, [e.target.name]: secondValue } )
        }
        setFormFilter({ ...formFilter, [e.target.name]: e.target.value})
    }

    const priceHandler = (e) => {
        if(e.target.value<0) e.target.value = 0 // SI ENTRA EL e NUMERO CAPAZ ROMPE TODO
        if(e.target.value === "") {
            deletePropertieFromObject(e.target.name)
        } else {
            setBigFilter( { ...bigFilter, [e.target.name]: parseInt(e.target.value) } )
        }
        setFormFilter({ ...formFilter, [e.target.name]: e.target.value})
    }    

    const checkBoxHandler = (e) => {
        if (!e.target.checked) {
            deletePropertieFromObject(e.target.name)
        } else {
            setBigFilter( { ...bigFilter, [e.target.name]: e.target.checked })
        }
        setFormFilter({ ...formFilter, [e.target.name]: e.target.checked})
    }

    const inputHandler = (e) => {
        console.log(e.target.checked)
    }

    const searchProperties = () => {
        console.log("objeto que filtra")
        console.log(bigFilter)// llamar al action con axios
        console.log("objeto con las opciones actuales")
        console.log(formFilter)
        setSelectFilters(false)
    }

    const listFilterHandler = () => {
        console.log("ordenar")
    }

    return (
        <div className="bigFilter">
            <div>
                {!selectFilters &&
                <button onClick={() => (countDeleteFirstFilter+=1, setSelectFilters(true))}>
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
                        <select name="operation" value={formFilter.operation} onChange={operationHandler}>
                            <option value="allCases">Todas las Operaciones</option>
                            <option value="forSale">Venta</option>
                            <option value="forRental">Alquiler</option>
                            <option value="shortRental">Alquiler Termporario</option>
                        </select>
                    </div>
                    <div> {/* AXIOS DE CITIES */}
                        <h5>Ciudad o región</h5>
                        <select name="city" value={bigFilter.city} onChange={(e) => selectHandler(e, e.target.value, e.target.value, null)}>
                            <option value="allCases">Todas</option>
                            { cities.map(city => <option value={city._id} key={city._id}>{city.cityName}</option> )}
                        </select>
                    </div>
                </div>
                <div> { /* 2 */}
                    <h5>Tipo de propiedad</h5>
                    <select name="isHouse" value={formFilter.isHouse} onChange={(e) => selectHandler(e, "house", true, false)}>
                        <option value="allCases">Todos</option>
                        <option value="house">Casa</option>
                        <option value="apartment">Departamento</option>
                    </select>
                </div>                
                <div> {/* 3 */}
                    <div>
                        <h5>Ambientes</h5>
                        <select name="numberOfRooms" value={formFilter.numberOfRooms} onChange={(e) => selectHandler(e, "6AndMore",{"$gte":6}, parseInt(e.target.value))}>
                            <option value="allCases">Todos</option>
                            {[1,2,3,4,5].map((x )=> <option value={x} key={x}>{x}</option>)}
                            <option value="6AndMore"> 6 o más</option>
                        </select>
                    </div>
                    <div>
                        <h5>Dormitorios</h5>
                        <select name="numberOfBedrooms" value={formFilter.numberOfBedrooms} onChange={(e) => selectHandler(e, "6AndMore",{"$gte":6}, parseInt(e.target.value))}>
                            <option value="allCases">Todos</option>
                            {[1,2,3,4,5].map((x )=> <option value={x} key={x+10}>{x}</option>)}
                            <option value="6AndMore"> 6 o más</option>
                        </select>
                    </div>
                    <div>
                        <h5>Baños</h5>
                        <select name="numberOfBathrooms" value={formFilter.numberOfBathrooms} onChange={(e) => selectHandler(e, "6AndMore",{"$gte":6}, parseInt(e.target.value))}>
                            <option value="allCases">Todos</option>
                            {[1,2,3,4,5].map((x )=> <option value={x} key={x+20}>{x}</option>)}
                            <option value="6AndMore"> 6 o más</option>
                        </select>
                    </div>
                </div>
                <div> {/* 4 */}
                    <div>
                        <h5>Moneda</h5>
                        <select name="isUSD" value={formFilter.isUSD} onChange={(e) => selectHandler(e, "pesos", false, true)}>
                            <option value="allCases">Todas</option>
                            <option value="pesos">Pesos</option>
                            <option value="dolars">Dólares</option>
                        </select>
                    </div>
                    <div>
                        <h5>Precio desde</h5>
                        <input type="number" name="greater" min={0} value={formFilter.greater} onChange={priceHandler} />
                    </div>
                    <div>
                        <h5>Precio hasta</h5>
                        <input type="number" name="lower" min={0} value={formFilter.lower} onChange={priceHandler} />
                    </div>
                </div>
                <div> {/* 5 */}
                    <h5>M² Metro Cuadrados Cubiertos</h5>
                    <select name="roofedArea" value={formFilter.roofedArea} onChange={(e) => selectHandler(e, e.target.value, JSON.parse(e.target.value), null)}>
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
                            <input type="checkbox" id="isBrandNew" name="isBrandNew" checked={formFilter.isBrandNew} onChange={checkBoxHandler}/>
                            <label htmlFor="isBrandNew" >Solo a estrenar</label>
                        </div>
                        <div>
                            <input type="checkbox" id="haveGarden" name="haveGarden" checked={formFilter.haveGarden} onChange={checkBoxHandler}/>
                            <label htmlFor="haveGarden" >Con Jardín </label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input type="checkbox" id="haveGarage" name="haveGarage" checked={formFilter.haveGarage} onChange={checkBoxHandler}/>
                            <label htmlFor="haveGarage" >Con Cochera</label>
                        </div>
                        <div>
                            <input type="checkbox" id="havePool" name="havePool" checked={formFilter.havePool} onChange={checkBoxHandler}/>
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
