import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div style={{backgroundColor: "#fff", borderBottom: 10, border: "2px solid grey", height: 60, padding: 10}}>
                <h1> Leasing Deals  </h1>
            </div>
         );
    }
}
 
export default Header;