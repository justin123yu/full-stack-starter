import React, { useState } from "react";

export default function Create(){

  const [data, setData] = useState({
    Name: "",
    Location: "",
    Photo: "",
    Rating: "",
    Comment: "",
    Map: ""
  });
  
  const handler = (event) => {
    event.preventDefault();
    const newDate = {...data};
    newDate[event.target.id] = event.target.value;
    setData(newDate);

  };

    return (
    <main>
      <>
      <form className="row-col-3 text-left">
          <div className="mb-3">
            <label className="form-label">Restaurant Name</label>
            <input type="text" className="form-control" id="Name" name="Name" aria-describedby="Name"></input>
            <label className="form-label">Restaurant Location</label>
            <input type="text" className="form-control" id="Location" name="Location" aria-describedby="Name"></input>
            <label className="form-label">Restaurant Photo</label>
            <input type="file" accept="image/png, image/jpeg" className="form-control" id="Name" name="Photo" aria-describedby="Name"></input>
            <label className="form-label">Restaurant Rating</label>
            <input type="number" min="0" max="5" className="form-control" id="Rating" name="Name" aria-describedby="Name"></input>
            <label className="form-label">Restaurant Comment</label>
            <input type="text" className="form-control" id="Name" name="Comment" aria-describedby="Name"></input>
            <label className="form-label">Restaurant Map</label>
            <input type="text" className="form-control" id="Name" name="Map" aria-describedby="Name"></input>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </>
  </main>
    )
}