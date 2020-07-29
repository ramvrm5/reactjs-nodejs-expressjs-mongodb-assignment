
import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import AddToRent from './popup/addToRentPopup.js';


const api_url = 'http://localhost:3000/car/';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      arrayOfList: []
    }
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    $.ajax({
      type: "GET",
      url: api_url + "carInventoryList",
      mimeType: 'text/plain; charset=x-user-defined',
      cache: false,
      async: true,
      success: function (data) {
        var tempData = JSON.parse(data);
        var listData = tempData.result;
        this.setState({
          arrayOfList: listData
        })
      }.bind(this),
      error: function (data) {
        console.log(data);
      }
    });
  }

  renderAddRentPopup = (object, index) => {
    console.log(object);
    ReactDOM.render(
      <AddToRent showModal={true} listcar={this.getList} id={object._id} cName={object.carName} cType={object.carType} pType={object.priceType} bPrice={object.basePrice} />, document.querySelector('#modal')
    )
  }

  //onChange for input START
  /*     handleChange(evt) {
          this.setState({
              [evt.target.id]: evt.target.value
          })
      } */
  //onChange for input END

  render() {
    return (
      <div>
        {/* <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <button>Add More Cars For Rent</button>
        </nav> */}
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Car Name</th>
              <th scope="col">Car Type</th>
              <th scope="col">Price Type</th>
              <th scope="col">Car Base Price</th>
              <th scope="col">Availability</th>
            </tr>
          </thead>
          <tbody>
            {this.state.arrayOfList.map(
              (object, index) =>
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{object.carName}</td>
                  <td>{object.carType}</td>
                  <td>{object.priceType}</td>
                  <td>{object.basePrice}</td>
                  <td>{object.rented > 0 ? "No" : "Yes"}</td>
                  <td><button disabled={object.rented === 1 ? true : false} className="btn btn-sm btn-secondary" onClick={() => this.renderAddRentPopup(object, index)}>Buy on rent</button></td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
export default App;