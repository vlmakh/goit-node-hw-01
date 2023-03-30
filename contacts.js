const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
}

async function getContactById(contactId) {
  const list = await listContacts();
  const contact = list.find((el) => el.id == contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const list = await listContacts();
  const updatedList = list.filter((el) => el.id != contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedList));
  const deletedContact = list.find((el) => el.id == contactId);
  return deletedContact;
}

async function addContact(name, email, phone) {
  const list = await listContacts();
  const newContact = { name, email, phone, id: uid(4) };
  list.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(list));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
