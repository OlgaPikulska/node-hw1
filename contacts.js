import { readFile, writeFile } from 'node:fs/promises';
import { join } from "path";
import { nanoid } from "nanoid"

const directoryName = "db"
const fileName = "contacts.json"
const contactsPath = join(directoryName, fileName);


export const listContacts = async () => {
    try {
        const contacts = await readFile(contactsPath, { encoding: "utf-8" });
        return JSON.parse(contacts);
    } catch (error) {
        console.log(error);
    }
}

export const getContactById = async (contactId) => {
    try {
        const parsedContacts = await listContacts();
        const searchedContact = parsedContacts.find(contact => parseInt(contact.id) === contactId)
        return searchedContact
    } catch (error) {
        console.log(error)
    }
}

export const removeContact = async (contactId) => {
    try {
        const parsedContacts = await listContacts();
        const newContactsList = parsedContacts.filter(contact => parseInt(contact.id) !== contactId)
        await writeFile(contactsPath, JSON.stringify(newContactsList, null, 2))
    } catch (error) {
        console.log(error)
    }
}



export const addContact = async (name, email, phone) => {
    const newContact = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone,
    }

    const parsedContacts = await listContacts();
    const newContactsArray = [...parsedContacts, newContact]
    writeFile(contactsPath, JSON.stringify(newContactsArray, null, 2))
}
