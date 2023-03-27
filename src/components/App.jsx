import { ContactForm } from './ContactForm/ContactForm';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export function App() {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('Contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('Contacts', JSON.stringify(contacts));
  }, [contacts]);

  const normalizeValue = value => value.toLowerCase().trim();

  const addContact = newContact => {
    const exist = contacts.some(
      contact =>
        normalizeValue(contact.name) === normalizeValue(newContact.name)
    );

    if (exist) {
      alert(`${newContact.name} already exist!`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { ...newContact, id: nanoid() },
    ]);
  };

  const deleteContact = id => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      normalizeValue(contact.name).includes(normalizeValue(filter))
    );
  };

  const addFilter = event => setFilter(event.target.value);

  const visibleContacts = getVisibleContacts();

  return (
    <>
      <h1 className={css.formTitle}>Phone Book</h1>
      <ContactForm addContact={addContact} />
      <h2 className={css.listTitle}>Contacts</h2>
      {contacts.length > 0 ? (
        <Filter setFilter={addFilter} />
      ) : (
        <p className={css.text}>There is no contacts in a Phone Book</p>
      )}
      {contacts.length > 0 && (
        <ContactList contacts={visibleContacts} deleteContact={deleteContact} />
      )}
    </>
  );
}
