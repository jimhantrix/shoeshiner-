import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';


import './Events.css';


class EventsPage extends Component {
  state ={
     creating: false
  };
  startCreateEventHandler = () =>{
     this.setState({creating: true});
  };

  modalConfirmHandler = () =>{
     this.setState({creating: false})
  };

  modalCancelHandler = () => {
     this.setState({creating: false});
  };

  render(){
    return (
      <React.Fragment>
        {this.state.creating && <Backdrop />}

        {this.state.creating && (
            <Modal
              title ="Add Events"
              canCancel
              canConfirm
              onCancel={this.modalCancelHandler}
              onConfrim ={this.modalConfirmHandler}>
              <form>
                <div className = "form-control">
                  <label htmFor ="title"> Title </label>
                  <input type ="text" id ="title"></input>
                </div>

                <div className = "form-control">
                  <label htmFor ="price"> Price </label>
                  <input type ="number" id ="price"></input>
                </div>

                <div className = "form-control">
                  <label htmFor ="date"> Date </label>
                  <input type ="date" id ="date"></input>
                </div>

                <div className = "form-control">
                  <label htmFor ="description"> Description </label>
                  <textarea id="description" row ="5"></textarea>
                </div>
              </form>
            </Modal>
          )
        }

        <div className='events-control'>
          <p> Share Shiner Events!</p>
          <button className ="btn" onClick = {this.startCreateEventHandler}> Create an event </button>
        </div>
      </React.Fragment>
    );
  }
}

export default EventsPage;
