require("dotenv").config();
const { InvalidNoteIdError, RecordNotFoundError } = require("../core/errors");
const { Note: NoteModel, User: UserModel } = require("../models");
const redisClient = require("../redis");

module.exports = {
  // Async function to get notes for a user
  async get(req) {
    const { user } = req;
    const keyName = `getAllNotes_use_${user.id}`;

    // Check if the notes data is available in the cache
    const cacheData = await redisClient.get(keyName);

    let notes;

    if (cacheData) {
      // If cache data exists, parse it and use the cached notes
      notes = JSON.parse(cacheData)
      console.log("🚀 ~ file: NotesController.js:20 ~ get ~ notes:",'form cache')
    } else {

      // Retrieve the notes from the database since they are not available in the cache
      notes = await NoteModel.findAll({
        include: [
          {
            model: UserModel,
            as: "Author",
            where: {
              id: user.id,
            },
            attributes: ["id", "name"],
            required: true,
          },
        ],
        order: [["createdAt", "desc"]],
      });

      // Set the retrieved notes in the cache
      // redisClient.set(keyName, JSON.stringify(notes), { EX: 30 });
      redisClient.set(keyName, JSON.stringify(notes), "EX", 30);

      console.log("🚀 ~ file: NotesController.js:41 ~ get ~ redisClient:", 'settting cache')
    }

    return notes;
  },

  // Async function to get a note by ID
  async getById(req) {
    const { user, params } = req;
    const { id } = params;

    // Find the note by ID, ensuring it belongs to the authenticated user
    const note = await NoteModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          as: "Author",
          where: {
            id: user.id,
          },
          attributes: ["id", "name"],
          required: true,
        },
      ],
      order: [["createdAt", "desc"]],
    });

    // If note is not found, throw an error
    if (!note) {
      throw new RecordNotFoundError();
    }

    return note;
  },

  // Async function to create a new note
  async create(req) {
    const { user, body } = req;
    const { description, type } = body;

    // Prepare the payload for creating the note
    const payload = {
      description,
      userId: user.id,
      type,
    };

    // Create a new note using the payload
    const note = await NoteModel.create(payload);

    return note;
  },

  // Async function to update a note
  async update(req) {
    const { user, body, params } = req;
    const { description, type } = body;
    const { id } = params;

    // Find the note by id, ensuring it belongs to the authenticated user
    const note = await NoteModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: UserModel,
          as: "Author",
          where: {
            id: user.id,
          },
          attributes: ["id", "name"],
          required: true,
        },
      ],
    });

    // If note is not found, throw an error
    if (!note) {
      throw new InvalidNoteIdError();
    }

    // Prepare the payload for updating the note
    const payload = {
      description: description || note.description,
      type: type || note.type,
    };

    // Update the note using the payload
    const updatedNote = await note.update(payload);

    return updatedNote;
  },

  // Async function to remove a note
  async remove(req) {
    const { user, params } = req;
    const { id } = params;

    // Find the note by id, ensuring it belongs to the authenticated user
    const note = await NoteModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: UserModel,
          as: "Author",
          where: {
            id: user.id,
          },
          attributes: ["id", "name"],
          required: true,
        },
      ],
    });

    // If note is not found, throw an error
    if (!note) {
      throw new InvalidNoteIdError();
    }

    // Delete the note
    await note.destroy();

    const data = { message: "Employee deleted successfully" };
    return data;
  },
};
