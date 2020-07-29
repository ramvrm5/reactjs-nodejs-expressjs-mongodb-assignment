import React from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


import 'bootstrap/dist/css/bootstrap.min.css';
const api_url = 'http://localhost:3000/car/';
class AddToRent extends React.Component {
    constructor(props, container) {
        super(props);
        this.state = {
            showModal: true,
            carName: this.props.cName,
            carType: this.props.cType,
            priceType: this.props.pType,
            basePrice: this.props.bPrice,
            id: this.props.id,
            daysRented: 0,
            totalPrice: 0,
            saveRentedDetails: false,
            toPrint:false
        }
        this.container = container;
    }

    printDocument() {  
        const input = document.getElementById('pdfdiv');  
        html2canvas(input)  
          .then((canvas) => {  
            var imgWidth = 200;  
            var pageHeight = 290;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            const pdf = new jsPDF('p', 'mm', 'a4')  
            var position = 0;  
            var heightLeft = imgHeight;  
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
            pdf.save("download.pdf");  
          });  
          this.setState({ showModal: false });
          ReactDOM.unmountComponentAtNode(document.getElementById('modal'));
      }

    onClose() {
        this.setState({ showModal: false });
        ReactDOM.unmountComponentAtNode(document.getElementById('modal'));
    }

    onSaveRentDetails() {
        var datastring = {
            "id": this.state.id,
            "carName": this.state.carName,
            "carType":this.state.carType,
            "priceType":this.state.priceType,
            "basePrice": this.state.basePrice,
            "rented": 1,
            "availableAfter":this.state.daysRented
        };
        console.log(datastring)
        $.ajax({
            type: "POST",
            url: api_url+'updateCarDetails',
            mimeType: 'text/plain; charset=x-user-defined',
            data: datastring,
            cache: false,
            async: true,
            success: function (data) {
                data = JSON.parse(data);
                this.setState({
                    toPrint:true
                })
            }.bind(this),
            error: function (data) {
                data = JSON.parse(data);
            }.bind(this)
        });
    }

    onhandleChange(e) {
        if (this.state.carType == "SUV") {
            var totalPrice = e.target.value * this.state.basePrice;
        } else if (this.state.carType == "Sedan") {
            if (e.target.value > 3) {
                var overGivenDaysRent = e.target.value - 3;
                var totalPrice = (overGivenDaysRent * this.state.basePrice) + this.state.basePrice;
            } else if (e.target.value <= 3) {
                var totalPrice = this.state.basePrice;
            }
        } else if (this.state.carType == "Hatchback") {
            if (e.target.value > 5) {
                var overGivenDaysRent = e.target.value - 5;
                var totalPrice = (overGivenDaysRent * this.state.basePrice) + this.state.basePrice;
            } else if (e.target.value <= 3) {
                var totalPrice = this.state.basePrice;
            }
        }
        this.setState({
            [e.target.id]: e.target.value,
            totalPrice: totalPrice,
            saveRentedDetails: e.target.value > 0 ? true : false
        })
    }

    render() {
        return (
            <div className="row vh-100 vw-100 align-items-center">
                <div className="col-xl-4 col-lg-4">
                    <Modal show={this.state.showModal}>
                        <Modal.Header>
                            <Modal.Title>UPDATE</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-xl-12 col-lg-12" id="pdfdiv">
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>CAR NAME :</label>
                                            <input type="text" className="form-control" value={this.state.carName} id="carName" readOnly placeholder="Car Name" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>CAR TYPE</label>
                                            <input type="text" className="form-control" value={this.state.carType} id="carType" readOnly placeholder="Car Type" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>PRICE TYPE</label>
                                            <input type="text" className="form-control" value={this.state.priceType} id="priceType" readOnly placeholder="Price Type" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>BASE PRICE</label>
                                            <input type="text" className="form-control" value={this.state.basePrice} id="basePrice" readOnly placeholder="Base Price" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>DAYS RENTED</label>
                                            <input type="number" className="form-control" value={this.state.daysRented} onChange={this.onhandleChange.bind(this)} id="daysRented" placeholder="Days Rented" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12">
                                        <div className="form-group">
                                            <label>TOTAL PRICE</label>
                                            <input type="number" className="form-control" value={this.state.totalPrice} readOnly id="totalPrice" placeholder="Total Price" />
                                        </div>
                                    </div>
                                    </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            {!this.state.toPrint ? <button type="button" className="btn btn-secondary" onClick={this.onClose.bind(this)}>Close</button>:""}
                            {!this.state.toPrint?<button disabled={!this.state.saveRentedDetails} type="button" className="btn btn-primary" onClick={this.onSaveRentDetails.bind(this)}>Save changes</button>:
                                    <button type="button" className="btn btn-danger" onClick={this.printDocument.bind(this)}>Print Pdf</button>}
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default AddToRent;