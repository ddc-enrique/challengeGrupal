import React from 'react'

const HomeFilter = () => {

    const changeClassHandle = (e) => {
        let elementClicked = e.target.dataset.type
        let childrenUl = e.target.parentNode.children 
        for (var i = 0; i < childrenUl.length; i++) {
            if (childrenUl[i].dataset !== elementClicked) {
                childrenUl[i].className=" "
            } 
        }
        e.target.className="active"
    }

    return (
        <div className="homeFilter">
            <div className="firstRow">
                <ul>
                    <li className="active" onClick={changeClassHandle} data-type="1" >Venta</li>
                    <li onClick={changeClassHandle} data-type="2">Alquiler</li>
                    <li onClick={changeClassHandle} data-type="3">Alquiler temporario</li>
                </ul>    
            </div>
            <div className="secondRow" >
                <div>
                    <select name="" id="">
                        <option>Casa/Depto</option>     
                    </select>
                </div>
                <div className="">
                    <select name="" id="">
                        <option>Dormitorio</option>
                    </select>
                    <select name="" id="">
                        <option>Baño</option>
                    </select>
                </div>
                <div className="boxes">
                    <div>
                        <input type="checkbox" id="aEstrenar"/>
                        <label >A estrenar</label>
                    </div>
                    <div>
                        <input type="checkbox" id="conCochera"/>
                        <label >Con cochera</label>
                    </div>
                </div>
            </div>
                <div className="homeFilterButton">
                    <button>Buscar</button>
                </div>
        </div>
    )
}

export default HomeFilter
