import "../styles/CardCity.css" //css contiene main y cardCity
import React from "react"
import CardCity from "./CardCity"
import { connect } from "react-redux"
import { useEffect } from "react"
import citiesActions from "../redux/action/citiesActions"

const Main = (props) => {
  useEffect(() => {
    const getCities = async () => {
      try {
        let res = await props.allCities()
        if (!res.success) {
          throw new Error()
        }
        if (!res.response.length) throw res.response
      } catch (err) {
        console.log(err)
      }
    }
    getCities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const city = props.cities.map((city) => (
    <CardCity {...props} key={city._id} city={city} />
  ))

  return (
    <main>
      <div className="mainTitle">
        <h1>Buscá en alguna de estas localidades</h1>
      </div>
      <div className="mainCityCarBox">
        {city}
      </div>
    </main>
  )
}

const mapDispatchToProps = {
  allCities: citiesActions.getCities,
}

const mapStateToProps = (state) => {
  return {
    cities: state.allCities.cities,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)