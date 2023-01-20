const yargs = require("yargs");
const pck = require("./package.json");
const { addNote, getNotes, printNotes, remove} = require("./notes.controller");

yargs.version(pck.version);

yargs.command({
    command: "add",
    describe: "Add new note to list",
    builder: {
        title: {
            type: "string",
            describe: "note title",
            demandOption: true
        }
    },
    handler({ title }) {
        addNote(title);
    }
})

yargs.command({
    command: "list",
    describe: "Print all notes",
    async handler() {
        // const notes = await getNotes();
        // console.log(notes);
        printNotes();
    }
})

yargs.command({
    command: "remove",
    describe: "Remove note by id",
    builder: {
        id: {
            type: "string",
            describe: "id of element which delete",
            demandOption: true
        }
    },
    handler({ id }) {
        remove(id);
    }
})

yargs.parse();