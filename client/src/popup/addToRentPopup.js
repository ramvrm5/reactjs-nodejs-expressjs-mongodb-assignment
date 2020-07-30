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
            toPrint: false,
            pdFileName: "",
        }
        this.container = container;
    }

    printDocument() {
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href',"D:\WorkSpace\Interview_assesment\reactjs-nodejs-expressjs-mongodb-assignment\server\public\pdf_files\ "+this.state.pdFileName);
        link.setAttribute('download', this.state.pdFileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
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
            "carType": this.state.carType,
            "priceType": this.state.priceType,
            "basePrice": this.state.basePrice,
            "rented": 1,
            "availableAfter": this.state.daysRented,
            "totalPrice": this.state.totalPrice
        };
        console.log(datastring)
        $.ajax({
            type: "POST",
            url: api_url + 'updateCarDetails',
            mimeType: 'text/plain; charset=x-user-defined',
            data: datastring,
            cache: false,
            async: true,
            success: function (data) {
                data = JSON.parse(data);
                this.setState({
                    toPrint: true,
                    pdFileName:data.data
                })
            }.bind(this),
            error: function (data) {
                data = JSON.parse(data);
            }.bind(this)
        });
        this.props.listcar()
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
            } else if (e.target.value <= 5) {
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
                            <Modal.Title>Buy for Rent</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                {!this.state.toPrint ? <div className="col-xl-12 col-lg-12" id="pdfdiv">
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
                                </div> :

                                    <div class="mt-4 mb-4">
                                        You can download <b>{this.state.carName}</b> reciept <a href="" onClick={this.printDocument.bind(this)}>Click Here</a>
                                    </div>}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-secondary" onClick={this.onClose.bind(this)}>Close</button>
                            {!this.state.toPrint ? <button disabled={!this.state.saveRentedDetails} type="button" className="btn btn-primary" onClick={this.onSaveRentDetails.bind(this)}>Save changes</button> : ""}
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default AddToRent;