import React, { type FC } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import type { Contact } from '../components/Types';
import type { Action } from "../reducers/contactsReducer";

// Define the extra props that are not part of the Contact interface
interface ExtraProps {
  handleEdit: (id: number) => void;
  dispatch: React.Dispatch<Action>;
}

// Use the FC type to define the props that the ContactItem component expects
const ContactItem: FC<Contact & ExtraProps> = ({ id, firstName, lastName, phoneNumber, address, email, handleEdit, dispatch }) => {
  // Use destructuring to extract the properties from the Contact object that was passed as a prop

  // Render the table row with the contact information
  return (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{phoneNumber}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>
        {/* Use the handleEdit function to edit the contact */}
        <AiFillEdit
          size={20}
          onClick={() => handleEdit(id)}
          color='blue'
          className='icon'
        />
      </td>
      <td>
        {/* Use the dispatch function to delete the contact */}
        <AiFillDelete
          size={20}
          onClick={() => {
            const confirmDelete = window.confirm(
              `Are you sure you want to delete contact for user ${firstName} ${lastName}?`
            );
            if (confirmDelete) {
              dispatch({
                type: 'DELETE_CONTACT',
                payload: { id }
              });
            }
          }}
          color='red'
          className='icon'
        />
      </td>
    </tr>
  );
};

export default ContactItem;