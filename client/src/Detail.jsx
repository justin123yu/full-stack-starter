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
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${staticContext?.env?.VITE_AIRTABLE_API}`
          }
        };
      
        await fetch("https://api.airtable.com/v0/appWF1wQ4ozIpCeq3/Resturant/"+id, options)
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
            if(restaurant.fields.Map === undefined){
                return (<div><h5>Map is unavailable</h5></div>);
            }
            return <div className="row">
                <iframe
                    src={restaurant.fields.Map}
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
          setLoading(false)
        })
    }, [])

    
  
    if (isLoading) return <p>Loading...</p>
    if (!restaurant) return <p>No record data</p>

    return (
        <div >
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-3">
                    <img className="card-img-top" src={restaurant.fields.Photo[0].url} style={{height: 20 + "rem"}}></img>
                    </div>
                    <div className="col-md-9 px-3 ">
                        <div id="detailedCard" className="card-body text-left">
                            <h5 className="card-title">{restaurant.fields.Name}</h5>
                            <p className="card-text">{restaurant.fields.Location}</p>
                            <p className="card-text">{restaurant.fields.Comments}</p>
                            <p className="card-text"><small className="text-body-secondary">Rating: {restaurant.fields.Rating}</small></p>

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