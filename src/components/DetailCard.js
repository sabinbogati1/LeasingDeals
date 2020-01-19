import React from "react";

const DetailCard = props => {
  const {
    image_url = null,
    contract_type = null,
    monthly_rental = null,
    initial_rental,
    engine_type,
    engine_size,
    transmission
  } = props.carDetail || {};
  return (
    <div className="card mt-4" style={{width: "1000px", padding: 10}}>
      <div className="row">
        <div className="col-sm-4">
          <img src={image_url} className="card-img-top" alt="..." />
        </div>
        <div className="col-sm-8">
          <div className="row">
            <div className="col-sm-6">
              <h3 >Contract</h3>
            </div>
            <div className="col-sm-6">
              <h4 className="font-italic">{contract_type} </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <h3>Transmission</h3>
            </div>
            <div className="col-sm-6">
              <h4 className="font-italic">{transmission} </h4>
            </div>
          </div>
         
           <h3>Rental</h3>
            <div className="row px-md-5">
              <div className="col-sm-6">
                <h4 className="font-italic">Type: {initial_rental} </h4>
              </div>
              <div className="col-sm-6">
                <h4 className="font-italic"> Monthly:  {monthly_rental} </h4>
              </div>
            </div>

            <h3>Engine</h3>
            <div className="row px-md-5">
              <div className="col-sm-6">
                <h4 className="font-italic">Type: {engine_type} </h4>
              </div>
              <div className="col-sm-6">
                <h4 className="font-italic"> Size:  {engine_size} </h4>
              </div>
            </div>
         
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
