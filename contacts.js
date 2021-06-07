const { v4: uuidv4 } = require("uuid");

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const dataParse = JSON.parse(data);
    console.table(dataParse);
  } catch (err) {
    console.error(err);
  }
}

// ------------- второй вариант без промисов с колбэком--------------
// function listContacts() {
//       fs.readFile(contactsPath, "utf8", (err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           const dataParse = JSON.parse(data);
//           console.table(dataParse);
//         }
//       });
// }
// ---------------------------------------------------------------------

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const foundContact = contacts.find(
      (contact) => contact.id === Number(contactId)
    );

    fs.writeFile("./db/contacts.json", JSON.stringify(foundContact, null, 2));

    console.log(await fs.readFile(contactsPath, "utf8"));
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const filteredContacts = contacts.filter(
      (contact) => contact.id !== Number(contactId)
    );

    fs.writeFile(
      "./db/contacts.json",
      JSON.stringify(filteredContacts, null, 2)
    );
    console.log(await fs.readFile(contactsPath, "utf8"));
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  const todo = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const dataParse = JSON.parse(data);

    fs.writeFile(
      "./db/contacts.json",
      JSON.stringify([todo,...dataParse], null, 2)
    );

    console.log("contact added successfully");
    console.log(await fs.readFile(contactsPath, "utf8"));
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
