const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
    // const notes = require("./db.json");
    // const notes = Buffer.from(buffer).toString("utf-8");

    const notes = await getNotes();

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note);

    await fs.writeFile(notesPath, JSON.stringify(notes));
    console.log(chalk.green("Note added"));
}


async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: "utf-8"});
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
    const notes = await getNotes();

    console.log(chalk.bgBlue("Here is the list of notes:"));
    notes.forEach(note => {
        console.log(note.id, note.title);
    });
}

async function remove(id) {
    const notes = await getNotes();
    const filteredNotes = notes.filter(note => note.id !== id);
    if (notes.length === filteredNotes.length) {
        console.log(chalk.red(`Note with id = ${id} doesn't exists!`));
        return;
    }
    await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
    console.log(chalk.green(`Note with id = ${id} removed!`));
}

async function edit(id, title) {
    const notes = await getNotes();
    const noteIndex = notes.findIndex(note => note.id === id);
    notes[noteIndex].title = title;
    await fs.writeFile(notesPath, JSON.stringify(notes));
}

module.exports = {
    addNote,
    getNotes,
    remove,
    edit
}