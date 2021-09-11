import "../styles/PropertiesList.css"
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import BigFilter from "../components/BigFilter"
import { connect } from "react-redux"
import propertiesActions from "../redux/action/propertiesActions"
import userActions from "../redux/action/userActions"
import citiesActions from "../redux/action/citiesActions"
import CardProperty from "../components/CardProperty"
import Swal from "sweetalert2"

const PropertiesList = (props) => {
    const {filterObj, getCities, getPropertiesFiltered, cities, properties, token} = props
    const [sortedProperties, setSortedProperties] = useState(properties)
    const [renderSort, setRenderSort] = useState(false)
    const [subscription, setSubscription] = useState("")

    useEffect(() => {
        // if (properties.length === 0) {
        //     getPropertiesFiltered({})
        //     .then(res => {
        //         if(!res.success){
        //             throw new Error(res.error)
        //         }
        //         console.log(res.response)
        //     })
        //     .catch(err => console.log(err))
        //     console.log("Properties List se monto y se cargo prop")
        // }
        if (cities === 0) {
            getCities()
            .then(res => {
                if(!res.success){
                    throw new Error(res.error)
                }
            })
            .catch(err => {
            renderToast(err, "warning")
            })
        }
    }, [])

    useEffect(()=>{
        setSortedProperties(properties)
    },[properties])
    const listFilterHandler = (e) => {
        switch (e.target.value){
            case "minPrice":
                setSortedProperties(
                    sortedProperties.sort((a, b) => {
                        return a.price - b.price;
                    })
                )
                break;
            case "maxPrice":
                setSortedProperties(
                    sortedProperties.sort((a, b) => {
                        return b.price - a.price;
                    })
                )
                break;
            case "minArea":
                setSortedProperties(
                    sortedProperties.sort((a, b) => {
                        return a.roofedArea - b.roofedArea;
                    })
                )
                break;
            case "maxArea":
                setSortedProperties(
                    sortedProperties.sort((a, b) => {
                        return b.roofedArea - a.roofedArea;
                    })
                )
                break;
            default:
                setSortedProperties(properties)
                return   
        }
        console.log(e.target.value)
        console.log("ordenar")
        console.log(sortedProperties) //ESTE ARRAY SE TIENE QUE ENVIAR EN 
        setRenderSort(!renderSort)
    }

    const renderToast = (message, type) => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer)
            toast.addEventListener("mouseleave", Swal.resumeTimer)
          },
        })
        Toast.fire({
          icon: type,
          title: message,
        })
      }
    
    const subscribeEmail = () => {
        props.putSubscribeEmail(token)
        .then(res => {
            res.success ?
            setSubscription("Gracias por suscribirte! Te enviaremos un mail cuando tengamos nuevas casas disponibles") :
            setSubscription(res.error)
        })
        .catch(err => {
            renderToast(err, "warning")
        })
    }
  }, []);

  useEffect(() => {
    setSortedProperties(properties);
  }, [properties]);
  const listFilterHandler = (e) => {
    switch (e.target.value) {
      case "minPrice":
        setSortedProperties(
          sortedProperties.sort((a, b) => {
            return a.price - b.price;
          })
        );
        break;
      case "maxPrice":
        setSortedProperties(
          sortedProperties.sort((a, b) => {
            return b.price - a.price;
          })
        );
        break;
      case "minArea":
        setSortedProperties(
          sortedProperties.sort((a, b) => {
            return a.roofedArea - b.roofedArea;
          })
        );
        break;
      case "maxArea":
        setSortedProperties(
          sortedProperties.sort((a, b) => {
            return b.roofedArea - a.roofedArea;
          })
        );
        break;
      default:
        setSortedProperties(properties);
        return;
    }
    setRenderSort(!renderSort)
  };
  const subscribeEmail = () => {
    props.putSubscribeEmail(token).then((res) => {
      res.success
        ? setSubscription(
            "Gracias por suscribirte! Te enviaremos un mail cuando tengamos nuevas casas disponibles"
          )
        : setSubscription(res.error);
    });
  };

  const renderNoHouses = () => {
    return (
      <div className="propertiesListNoHousesDiv">
        {/* <div className="imageDiv" style={{backgroundImage: "url('./assets/noHouses.jpg')"}}>
                </div> */}
        <p>No hay resultados para tu busqueda</p>
        {!token ? (
          <p>test</p>
        ) : subscription === "" ? (
          <div>
            <p>
              Suscribete para recibir un aviso cuando haya resultados nuevos
            </p>
            <button onClick={subscribeEmail}>Suscribete</button>
          </div>
        ) : (
          <p>{subscription}</p>
        )}
      </div>
    );
  };

  console.log(filterObj);
  console.log("Array de propiedades", properties);
  return (
    <div className="containerPropertiesList">
      <Header />
      <BigFilter filterObj={filterObj} />
      <div className="sortList">
        <select onChange={listFilterHandler}>
          <option value="noSort">Mas relevante</option>
          <option value="minPrice">Menor precio</option>
          <option value="maxPrice">Mayor precio</option>
          <option value="minArea">Menor superficie</option>
          <option value="maxArea">Mayor superficie</option>
        </select>
      </div>
      {properties.length !== 0 ? (
        <div className="propertiesCardList">
          {sortedProperties.map((property) => (
            <CardProperty key={property._id} property={property} />
          ))}
        </div>
      ) : (
        renderNoHouses()
      )}
      <Footer />
    </div>
  );
};

const mapDispatchToProps = {
  getPropertiesFiltered: propertiesActions.getPropertiesFiltered,
  getCities: citiesActions.getCities,
  putSubscribeEmail: userActions.putSubscribeEmail,
};

const mapStateToProps = (state) => {
  return {
    filterObj: state.properties.filterObj,
    properties: state.properties.properties,
    cities: state.allCities.cities,
    token: state.user.token,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PropertiesList);
