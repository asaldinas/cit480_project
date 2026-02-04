import React, {type FC} from 'react';
import { Modal } from 'react-bootstrap';
import type { Contact } from '../components/Types';
import type { Action } from "../reducers/contactsReducer";
import ContactForm from './ContactForm';

interface EditModalProps {
    showModal: boolean;
    dataToEdit: Contact | undefined;
    toggleModal: ()  => void;
    dispatch: React.Dispatch<Action>
}
const EditModal: FC<EditModalProps> = ({toggleModal, dataToEdit, showModal, dispatch}) => {
 return (
    <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
            <Modal.Title>Update Contact Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ContactForm
             dispatch={dispatch}
             dataToEdit={dataToEdit}
             toggleModal={toggleModal}
            />
        </Modal.Body>
    </Modal>
 )
}
export default EditModal;