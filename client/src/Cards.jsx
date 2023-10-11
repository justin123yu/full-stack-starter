import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useStaticContext } from './StaticContext';

function Cards(){

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const staticContext = useStaticContext();
    async function getData() {
      var records;
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${staticContext?.env?.VITE_AIRTABLE_API}`
        }
      };
    
      await fetch('https://api.airtable.com/v0/appWF1wQ4ozIpCeq3/Resturant?sort%5B0%5D%5Bfield%5D=Name&sort%5B0%5D%5Bdirection%5D=asc', options)
        .then(response => response.json())
        .then(data => records = data)
        .catch(err => console.error(err));
      return records;
      
      
    }
    
  
    useEffect(() => {
      setLoading(true)
      getData()
        .then((data) => {
          setData(data.records)
          setLoading(false)
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
                <img className="card-img-top" src={items.fields.Photo[0].url} style={{height: 20 + "rem"}}></img>
                <div className="card-body">
                  <h5 className="card-title text-center">{items.fields.Name}</h5>
                  <p className="card-text">{items.fields.Comments}</p>
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