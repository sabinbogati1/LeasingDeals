import React from "react";
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";

const  FilterSideBar = props => {
    const {value,engineType, transManual, transAutomatic, _onChangeSlider, _handleMonthlyRental, _handleEngineType, _handleTransManual, _handleTransAutomatic  } = props;

    return (
      <div
        className="col-sm-4 d-flex flex-column h-100"
        style={{
          backgroundColor: "#6A89CC",
          padding: "40px"
        }}
      >
        <h1> <u> Filter Deals</u></h1>
        <div style={{marginTop:"50px"}}>
        <h2 className="font-italic">Monthly Rental</h2>
        <div className="row px-md-5">
          <InputRange
            draggableTrack
            maxValue={900}
            minValue={100}
            onChange={value => _onChangeSlider(value) }
            onChangeComplete={value => _handleMonthlyRental(value)}
            value={value}
          />
        </div>
        </div>

        <div style={{marginTop:"10px"}}>
        <h2 className="font-italic">Engine Type</h2>
        <div className="row px-md-5">
          <h4>Diesel</h4>
          <input
            name="diesel"
            style={{ height: 40, marginLeft: 10 }}
            type="checkbox"
            checked={engineType}
            onChange={_handleEngineType}
          />
        </div>
        </div>

        <div style={{marginTop:"10px"}}>
        <h2>Transmission</h2>
        <div className="row px-md-5">
          <h4>Manual</h4>
          <input
            name="manual"
            style={{ height: 50 , marginLeft: 10 }}
            type="checkbox"
            checked={transManual}
            onChange={_handleTransManual}
          />
        </div>

        <div className="row px-md-5">
          <h4>Automatic</h4>
          <input
            name="automatic"
            style={{ height: 40, marginLeft: 10}}
            type="checkbox"
            checked={transAutomatic}
            onChange={_handleTransAutomatic}
          />
        </div>
        </div>
        </div>
    );
  }


export default FilterSideBar;
