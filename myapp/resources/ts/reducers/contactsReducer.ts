import type { Contact } from '../components/Types';

export interface AppState {
    contacts: Contact[];
  }

  export const contactsReducer = (state: AppState, action: Action): AppState => {
    switch(action.type){
        case 'ADD_CONTACT':
             // Update an existing contact in the state
            return {
              ...state,
              contacts: [...state.contacts, action.payload as Contact]
            };
        case 'UPDATE_CONTACT': {
             // Update an existing contact in the state
            const { id, updates } = action.payload as Update;
            return {
                ...state,
                contacts: state.contacts.map((contact) => {
                    if (contact.id === id) {
                        return {
                            ...contact,
                            ...updates
                        };
                    }
                    return contact;
                })
            };
        }
        case 'DELETE_CONTACT': {
              // Remove a contact from the state
            const { id } = action.payload;
            return {
              ...state,
              contacts: state.contacts.filter((contact) => contact.id !== id)
            };
          }

        default:
             // Return the current state if the action is unknown
            return state;
    }
}
export interface Update {
  id: number;
  updates: Contact;
}
export interface Action {
  payload: { id: any; };
  type: 'ADD_CONTACT' | 'UPDATE_CONTACT' | 'DELETE_CONTACT';
}
