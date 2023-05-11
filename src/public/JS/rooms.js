/* eslint-disable eqeqeq */
/* eslint-disable no-undef */

document.addEventListener('DOMContentLoaded', () => {
  const socket = io('http://localhost:4000/', {
    auth: {
      bearerToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlByaW5jZSIsImVtYWlsIjoicHJpbWUwNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRYekpXU0hDSTJBb251TkRnbm5TWXNlNFRCUUdwcnE3aFRTcDZuQ0dJTDJaQVpET1BmSWt2ZSIsInJvbGVJZCI6Miwic3RhdHVzIjoiYWN0aXZlIiwiaWF0IjoxNjg0MzExMjA2LCJleHAiOjE2ODQzOTc2MDZ9.Z5vgr8dYcMwcrHc0BzfzokZbK_7v_yNu-r4JzGPlMGc',
    },
  });
  console.log('connected');

  // Function to display the list of rooms
  function displayRooms(rooms) {
    const roomsList = document.querySelector('.rooms ul');
    roomsList.innerHTML = '';

    // Create a list item for each room
    rooms.forEach((room) => {
      const li = document.createElement('li');
      const div = document.createElement('div');
      const h2 = document.createElement('h2');

      // Add the room name and number of clients to the list item
      h2.innerText = room;

      div.appendChild(h2);
      li.appendChild(div);

      // Add an event listener to join the room when the list item is clicked
      li.addEventListener('click', () => {
        socket.emit('join-room-event', room.name);
      });

      roomsList.appendChild(li);
    });
  }

  // Event emitter for the server for the form to join a room
  const joinForm = document.querySelector('.join-form');
  joinForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const roomNameInput = joinForm.querySelector("input[name='roomName']");
    const roomName = roomNameInput.value.trim();
    if (roomName !== '') {
      socket.emit('join-room-event', roomName);

      const url = `http://localhost:3000/chat/chatRoom?room=${roomName}`;
      window.open(url, '_blank'); // Opens a new tab with the chat room page.

      roomNameInput.value = '';
    }
  });

  // Event listener for the server for when the client receives the list of rooms
  socket.on('update-room-list-event', (rooms) => {
    displayRooms(rooms);
    console.log(rooms); // Show the rooms the user has joined on console log.
  });
});
