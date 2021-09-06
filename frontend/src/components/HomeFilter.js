import React, { useState } from 'react'

const HomeFilter = () => {
    const [filter, setFilter] = useState({ forSale: false, shortRental: false, isHouse: false, houseStyle: "", numberOfBedrooms: 0, numberOfBathrooms: 0, isBrandNew: false, haveGarage: false, })

    const changeClassHandle = (e) => {
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
        if (e.target.name === "houseStyle" && e.target.value === "house" ) {
            var ishouseValue  = true
        } else {
            ishouseValue = false
        }
        if (e.target.name === "numberOfBedrooms") {
            var numberOfBedroomsValue = e.target.value
            var numberOfBathroomsValue = 0
        }
        if (e.target.name === "numberOfBathrooms") {
            var numberOfBathroomsValue = e.target.value
            var numberOfBedroomsValue = 0
        }
        setFilter({
            ...filter,
            [e.target.name]: e.target.value,
            isHouse: ishouseValue,
            numberOfBedrooms: parseInt(numberOfBedroomsValue),
            numberOfBathrooms: parseInt(numberOfBathroomsValue)
        })
    }

    const serchClickHandler = () => {
        console.log("buscar")
    }

    console.log(filter)

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
                        <option>Tipo de inmueble</option>
                        <option value="house">Casa</option>     
                        <option value="department">Departamento</option>     
                        <option>otra opcion</option>     
                        <option>otra opcion</option>     
                    </select>
                </div>
                <div>
                    <select name="numberOfBedrooms" onChange={inputHandler} >
                        <option>Dormitorios</option>
                        <option value="1">1 dormitorio</option>
                        <option value="2">2 dormitorios</option>
                        <option value="3">3 dormitorios</option>
                        <option value="4">4 dormitorios</option>
                        <option value="5">5 dormitorios</option>
                        <option value="6">6 o mas</option>
                        
                    </select>
                    <select name="numberOfBathrooms" onChange={inputHandler} >
                        <option>Baños</option>
                        <option value="1">1 baño</option>
                        <option value="2">2 baños</option>
                        <option value="3">3 baños</option>
                        <option value="4">4 baños</option>
                        <option value="5">5 baños</option>
                        <option value="6">6 o mas</option>
                    </select>
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
            </div>
                <div className="homeFilterButton">
                    <button onClick={serchClickHandler}>Buscar</button>
                </div>
        </div>
    )
}

export default HomeFilter
