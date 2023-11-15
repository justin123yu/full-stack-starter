import {useParams} from "react-router-dom"
import { useEffect , useState } from "react";
import { useStaticContext } from './StaticContext';




function Detail(){
    var {id} = useParams();
    const [restaurant, setRestaurant] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [toggle, setToggle] = useState(false);

    const staticContext = useStaticContext();

    async function getData(id) {
        var records;
      
        await fetch('/api/restaurants/' + id)
          .then(res => res.json())
          .then(data => records = data)
          .catch(err => console.error(err));
        return records;
    }

    const handleClick = () => {
        setToggle(!toggle);
    }
    function Map({ display }) {
        if (display) {
            if(restaurant.Map === undefined){
                return (<div><h5>Map is unavailable</h5></div>);
            }
            return <div className="row">
                <iframe
                    src={restaurant.Map}
                    height="450"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        }
    }
  
    useEffect(() => {
      setLoading(true)
      getData(id)
        .then((data) => {
          setRestaurant(data);
          setLoading(false);
        })
    }, [])

    
  
    if (isLoading) return <p>Loading...</p>
    if (!restaurant) return <p>No record data</p>

    return (
        <div >
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-3">
                    <img className="card-img-top" src={restaurant.PhotoUrl} style={{height: 20 + "rem"}}></img>
                    </div>
                    <div className="col-md-9 px-3 ">
                        <div id="detailedCard" className="card-body text-left">
                            <h5 className="card-title">{restaurant.Name}</h5>
                            <p className="card-text">{restaurant.Location}</p>
                            <p className="card-text">{restaurant.Comment}</p>
                            <p className="card-text"><small className="text-body-secondary">Rating: {restaurant.Rating}</small></p>

                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="col-3"><button id="Map" className="btn btn-secondary pt-3" onClick={handleClick}>Map Button</button></div>
                <Map display={toggle}></Map>
            </div>

        </div>
    )
}
export default Detail;