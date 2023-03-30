const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      if (!list) {
        console.log("\x1B[33m List is empty...");
        return;
      }
      console.log(list);
      break;

    case "get":
      const foundContact = await getContactById(id);
      if (!foundContact) {
        console.log(`\x1B[33m Contact with id:${id} was not found`);
        return;
      }
      console.log(foundContact);
      break;

    case "add":
      const addedContact = await addContact(name, email, phone);
      if (!addedContact) {
        throw new Error(`\x1B[31m Contact ${name} was not added`);
        return;
      }
      console.log(
        `\x1B[32m Contact ${addedContact.name} was added successfully`
      );
      break;

    case "remove":
      const removedContact = await removeContact(id);
      if (!removedContact) {
        console.log(`\x1B[33m Contact with id:${id} was not found`);
        return;
      }
      console.log(
        `\x1B[32m Contact ${removedContact.name} was removed successfully`
      );
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
