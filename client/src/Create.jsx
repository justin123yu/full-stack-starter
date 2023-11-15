import React, { useState } from "react";

export default function Create(){
  const [formData, setFormData] = useState({ Name: "",
    Location: "",
    Photo: "",
    Rating: "",
    Comment: "",
    Map: ""});

    return (
    <main>
      <>
      <form className="row-col-3 text-left">
          <div className="mb-3">
            <label className="form-label">Restaurant Name</label>
            <input type="text" className="form-control" id="Name" name="Name" aria-describedby="Name"></input>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </>
  </main>
    )
}