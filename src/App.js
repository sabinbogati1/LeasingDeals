import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Spinner from "./components/Spinner";
import Pagination from "./components/Pagination";
import DetailCard from "./components/DetailCard";
import NoDataFound from "./components/NotDataFound";
import FilterSideBar from "./components/FilterSideBar";

class App extends Component {
  state = {
    loading: true,
    currentPage: null,
    totalPages: null,
    allCarsDetail: [],
    globalCarsDetail:[],
    currentCarsDetail: [],
    engineType: true,
    transManual: true,
    transAutomatic: true,
    value: {
      min: 100,
      max: 900,
    },
  };

 async componentDidMount() {
   const allCarsDetail = await this.getAllCarDetails();
   this.setState({
    allCarsDetail,
    globalCarsDetail:allCarsDetail,
    loading: false
   })
  }

  getAllCarDetails = async()=>{
    try{
      const allCarsDetail = await axios.post("https://leasing.deals/get-all-deals ", {
        type: "personal",
        modelID: "x2 xdrive18 suv",
        page: "1"
      })
      return allCarsDetail.data.deals
    }catch(e){
      console.log("e -> ",e);
    }

  }

  onPageChanged = data => {
    const { allCarsDetail } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentCarsDetail = allCarsDetail.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentCarsDetail, totalPages });
  };

  _handleEngineType = async () => {
    const {engineType, value, transManual, transAutomatic  } = this.state;
    let filterCarsDetail = await this.filter(transManual,transAutomatic,!engineType, value  );
    const currentCarsDetail = filterCarsDetail.slice(0, 20);
    this.setState({
      engineType: !engineType,
      allCarsDetail: filterCarsDetail,
      currentCarsDetail
    });
  }

  _handleTransManual = async ()=>{
    const {transManual, transAutomatic, engineType, value} = this.state;
   let filterCarDetails = await this.filter(!transManual,transAutomatic,engineType, value  );
   const currentCarsDetail = filterCarDetails.slice(0, 20);
   this.setState({
     transManual: !transManual,
     allCarsDetail: filterCarDetails,
     currentCarsDetail
   })
  }

  _handleTransAutomatic = async() =>{
    const {transManual, transAutomatic, engineType, value} = this.state;
   let filterCarDetails = await this.filter(transManual,!transAutomatic,engineType, value  );
    const currentCarsDetail = filterCarDetails.slice(0, 20);
    this.setState({
      transAutomatic: !transAutomatic,
      allCarsDetail: filterCarDetails,
      currentCarsDetail
    })
  }

  filter= async (manualStatus, autoStatus, engine_type, range_val) =>{
    const {globalCarsDetail} = this.state;
    let allCarsDetail = globalCarsDetail;
    const engineType = engine_type ? "Diesel" : null;
    const {min, max} = range_val;
    let filterCarsDetail;

    if(manualStatus && autoStatus){
      filterCarsDetail = allCarsDetail.filter(carDetails => {
        return ((carDetails.transmission === "Manual" ||  carDetails.transmission === "Automatic") &&
         carDetails.engine_type === engineType &&  
         carDetails.monthly_rental >= min && carDetails.monthly_rental <= max
         ) ;
      })

    } else if(!manualStatus && autoStatus){
      filterCarsDetail = allCarsDetail.filter(carDetails => {
        return ((carDetails.transmission !== "Manual" ||  carDetails.transmission === "Automatic") &&
        carDetails.engine_type === engineType &&  
        carDetails.monthly_rental >= min && carDetails.monthly_rental <= max) ;
      })
    } else if(manualStatus && !autoStatus){
      filterCarsDetail = allCarsDetail.filter(carDetails => {
        return ((carDetails.transmission === "Manual" ||  carDetails.transmission !== "Automatic")&&
        carDetails.engine_type === engineType &&  
        carDetails.monthly_rental >= min && carDetails.monthly_rental <= max) ;
      })
    } else {
      filterCarsDetail = allCarsDetail.filter(carDetails => {
        return ((carDetails.transmission !== "Manual" &&  carDetails.transmission !== "Automatic")&&
        carDetails.engine_type === engineType &&  
        carDetails.monthly_rental >= min && carDetails.monthly_rental <= max) ;
      })
    }
  return filterCarsDetail;
  }

  _handleMonthlyRental = async(val) =>{
    const {transManual, transAutomatic, engineType} = this.state;
    let filterCarDetails = await this.filter(transManual,transAutomatic,engineType, val  );
    const currentCarsDetail = filterCarDetails.slice(0, 20);
    this.setState({
      allCarsDetail: filterCarDetails,
      currentCarsDetail
    })
  }

  _onChangeSlider = (value) => {
    this.setState({ value: value })
  }

  render() {
    const {
      allCarsDetail,
      currentCarsDetail,
      currentPage,
      totalPages,
      loading,
    } = this.state;
    const totalCarsDetails = allCarsDetail?  allCarsDetail.length : 0;

    if(loading){
      return <Spinner/>
    }

    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : ""
    ]
      .join(" ")
      .trim();

    return (
      <div>
        <Header />

        <div className="row">
          <FilterSideBar
           {...this.state} 
           _onChangeSlider={this._onChangeSlider}
           _handleMonthlyRental= {this._handleMonthlyRental}
           _handleEngineType= {this._handleEngineType}
           _handleTransManual= {this._handleTransManual}
           _handleTransAutomatic={this._handleTransAutomatic}
            />

          <div className="col-sm-8 d-flex align-items-stretch" style={{ backgroundColor: "#EEEEEE", flex:1, height:"100%" }}>
            <div className="container mb-5">
              <div className="row d-flex flex-row py-5">
                { totalCarsDetails !== 0 && <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <h2 className={headerClass}>
                      <strong className="text-secondary">
                        {totalCarsDetails}
                      </strong>{" "}
                      Car Details
                    </h2>

                    {currentPage && (
                      <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                        Page{" "}
                        <span className="font-weight-bold">{currentPage}</span>{" "}
                        / <span className="font-weight-bold">{totalPages}</span>
                      </span>
                    )}
                  </div>

                  <div className="d-flex flex-row py-4 align-items-center">
                    <Pagination
                      totalRecords={totalCarsDetails}
                      pageLimit={20}
                      pageNeighbours={1}
                      onPageChanged={this.onPageChanged}
                    />
                  </div>
                </div> }

                { totalCarsDetails === 0 && <NoDataFound/>}

                { totalCarsDetails !== 0 &&  currentCarsDetail.map(carDetail => (
                  <DetailCard key={carDetail._id} carDetail={carDetail} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
