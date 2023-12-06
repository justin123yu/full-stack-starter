import React, { useEffect, useState } from "react";
import PhotoInput from "../src/Components/PhotoInput"
import {useNavigate, useParams} from "react-router-dom";
export default function RestaurantForm(){

  const [data, setData] = useState({
    Name: "",
    Location: "",
    Photo: "",
    PhotoUrl: "",
    Rating: 0,
    Comment: "",
    Map: ""
  });
  const {id} = useParams();

  useEffect(()=> {
    if(id){
      fetch("/api/restaurants/" + id)
      .then(response => response.json())
      .then(data => setData(data)) }
  }, [id]);
  
  const handler = (event) => {
    const newDate = {...data};
    newDate[event.target.name] = event.target.value;
    setData(newDate);

  };

  async function onSubmit(event){
    event.preventDefault();
    try{
      let path = "/api/restaurants";
      let method = "POST";
      if(id){
        path = "/api/restaurants/" + id;
        method = "PATCH";
      }
      const response = await fetch(path, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      console.log(json);
      useNavigate("/restaurants");  
    } catch (error){
      console.log(error);
    }
  }

    return (
    <main>
      <>
      <form className="container" onSubmit={onSubmit}>
            <label className="form-label">Restaurant Name</label>
            <input type="text" onChange={handler} className="form-control"  value={data.Name} id="Name" name="Name" aria-describedby="Name"></input>
            <label className="form-label">Restaurant Location</label>
            <input type="text" onChange={handler} className="form-control" value={data.Location} id="Location" name="Location" aria-describedby="Name"></input>
            <label className="form-label">Restaurant Rating</label>
            <input type="number" onChange={handler} min="0" max="5" value={data.Rating} className="form-control" id="Rating" name="Rating" aria-describedby="Name"></input>
            <label className="form-label">Restaurant Comment</label>
            <input type="text" onChange={handler} className="form-control" value={data.Comment} id="Comment" name="Comment" aria-describedby="Name"></input>
            <div className="mb-3">
            <PhotoInput className="card"id="Photo" name="Photo" onChange={handler} value={data.Photo} valueUrl={data.PhotoUrl}> Attachments
            <div className="card-body">Drag your photo here</div>
            </PhotoInput>
            </div>
            <label className="form-label">Restaurant Map</label>
            <input type="text" onChange={handler} className="form-control" value={data.Map} id="Map" name="Map" aria-describedby="Name"></input>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </>
  </main>
    )
}