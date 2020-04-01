import React from "react";

import PaymentMock from 'assets/img/Yandex Widget.png';
import CloseModalIcon from 'assets/img/close-modal.svg';
import Modal from 'react-modal';

import "./block-payment.scss";

export default class BlockPayment extends React.Component {
    constructor(props) {
        super(props);
    
    }

    render() {
        Modal.setAppElement('#app');

        const { isOpen, closeModal } = this.props;

        return (
            <Modal
            isOpen={isOpen}
            contentLabel="Modal"
            >
                <div className="modal-payment" id="modal-payment">
                       <div className='modal-payment__header'>
                            <img className="close-icon" src={CloseModalIcon} onClick={closeModal}/>
                       </div>
                       <div className="modal-payment__content">
                           <img className="payment-mock" src={PaymentMock} />    
                       </div>
                </div>
            </Modal>
        );
    }
}


// Добавить в родитель

// this.state = {
//     showModal: false,
// };

// openModal = () => {
//     this.setState({ showModal: true });
// }
 
// closeModal = () => {
//     this.setState({ showModal: false });
// }