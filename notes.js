const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, note) => {
  const notes = loadNotes();
  const titles = notes.map((n) => n.title).includes(title);

  if (titles) {
    console.log(chalk.red(`The title \'${title}\' already exists`));
    return;
  }

  notes.push({ title: title, note: note });
  saveNotes(notes);
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON, { flag: "w" });
  console.log(chalk.green("Note added!"));
};

const removeNote = (title, note) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((n) => {
    return n.title !== title;
  });
  const stringNote = JSON.stringify(filteredNotes);
  fs.writeFileSync("notes.json", stringNote);
  console.log(chalk.red("Note removed!"));
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((n) => n.title === title);
  if (!note) {
    console.log(chalk.red("Note not found!"));
    return;
  }
  console.log(chalk.blue(note.title), note.note);
};
const listNotes = () => {
  console.log(loadNotes());
};

const loadNotes = () => {
  try {
    const fileBuffer = fs.readFileSync("notes.json");
    const dataJSON = fileBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  readNote,
  listNotes,
};
