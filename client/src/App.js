
import React from 'react'
import $ from 'jquery'

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
        /*         listData.forEach(function (object) {
                  array.push({ id: object.id, avtar: object.avatar, name: object.first_name + " " + object.last_name, email: object.email })
                }); */
        this.setState({
          arrayOfList: listData
        })
      }.bind(this),
      error: function (data) {
        console.log(data);
      }.bind(this)
    });
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">S.no</th>
              <th scope="col">Car Name</th>
              <th scope="col">Car Type</th>
              <th scope="col">Price Type</th>
              <th scope="col">Car Base Price</th>
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
                </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
export default App;