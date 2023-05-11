import jsend from 'jsend';
import chatServices from '../services/chat.services.js';

export default {
  getNamespace: async (req, res) => {
    // fetch data from db
    try {
      const nameSpaces = await chatServices.getNamespaces();
      return res.json(nameSpaces);
    } catch (error) {
      console.log(error.message);
      return error;
    }
  },
  addNamespace: async (req, res) => {
    // adds a new namespace.
    try {
      const { namespace } = req.body;
      const id = await chatServices.addNamespace(namespace); // returns a string.
      return res
        .status(200)
        .json(jsend.success({ id }));
    } catch (error) {
      console.log(error.message);
      return error;
    }
  },
  getRooms: async (req, res) => {
    // fetch all rooms for a namespace.
    try {
      const rooms = await chatServices.getRooms(req.params.namespace); // returns a list.

      // send the list.
      return res.json(rooms);
    } catch (error) {
      console.log(error.message);
      return error;
    }
  },
};
