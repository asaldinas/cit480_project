import React, { type FC, type ChangeEvent, useState } from 'react';
import type { Contact } from '../components/Types';
import type { Action } from "../reducers/contactsReducer";
import { Button, Form } from 'react-bootstrap';

interface ContactFormProps {
  dispatch: React.Dispatch<Action>;
  dataToEdit: Contact | undefined;
  toggleModal: () => void;
}

const ContactForm: FC<ContactFormProps> = ({  dispatch, dataToEdit, toggleModal}) => {
  const [contact, setContact] = useState({
    firstName: dataToEdit?.firstName ? dataToEdit.firstName : '',
    lastName:  dataToEdit?.lastName ? dataToEdit.lastName : '',
    phoneNumber: dataToEdit?.phoneNumber ? dataToEdit.phoneNumber : '',
    address: dataToEdit?.address ? dataToEdit.address : '',
    email:   dataToEdit?.email ? dataToEdit.email : '',
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dataToEdit) {
      dispatch({
        type: 'ADD_CONTACT',
        payload: {
          id: Date.now(), // returns current timestamp
          ...contact
        }
      });
      setContact({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        email: '',
      });
    } else {
      dispatch({
        type: 'UPDATE_CONTACT',
        payload: {
          id: dataToEdit.id,
        }
      });
      toggleModal();
    }
  };

  return (
    <Form onSubmit={handleOnSubmit} className="contact-form">
      <h3 className="mb-3">Add New Contact</h3>
      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          name="firstName"
          value={contact.firstName}
          type="text"
          placeholder="Enter first name"
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          name="lastName"
          value={contact.lastName}
          type="text"
          placeholder="Enter last name"
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          name="phoneNumber"
          value={contact.phoneNumber}
          type="text"
          placeholder="Enter phone number"
          onChange={handleOnChange}
        />
         <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          value={contact.email}
          type="email"
          placeholder="Enter email"
          onChange={handleOnChange}
        />
      </Form.Group>
      </Form.Group>
      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          name="address"
          value={contact.address}
          type="text"
          placeholder="Enter address"
          onChange={handleOnChange}
        />
      </Form.Group>
     
  <div className="d-flex justify-content-end">
<Button variant='primary' type='submit' className='submit-btn'>
  {dataToEdit ? 'Update Contact' : 'Add Contact'}
</Button>
      </div>
    </Form>
  );
};

export default ContactForm;