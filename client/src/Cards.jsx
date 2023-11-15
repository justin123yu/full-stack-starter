import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useStaticContext } from './StaticContext';

function Cards(){

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const staticContext = useStaticContext();
    async function getData() {
      var records;
    
      await fetch('/api/restaurants')
        .then(response => response.json())
        .then(data => records = data)
        .catch(err => console.error(err));
      return records;
      
      
    }
    
  
    useEffect(() => {
      setLoading(true)
      getData()
        .then((data) => {
          setData(data)
          setLoading(false)
          console.log(data);
        })
    }, [])
  
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
  
    return (
      <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {data.map((items) =>
            <div className="col" key={items.id}>
              <div className="card h-100">
                <img className="card-img-top" src={items.PhotoUrl} style={{height: 20 + "rem"}}></img>
                <div className="card-body">
                  <h5 className="card-title text-center">{items.Name}</h5>
                  <p className="card-text">{items.Comment}</p>
                  <div className="card-footer text-body-secondary">
                    <Link className='btn btn-primary' to={"/restaurants/" + items.id}> Detail</Link>
                  </div>
                </div>
              </div>
            </div>)
          }
        </div>
      </div>);
}

export default Cards;