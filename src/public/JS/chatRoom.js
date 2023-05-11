/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  function queryFctn(room) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryValue = urlParams.get(room);

    return queryValue;
  }

  const socket = io('http://localhost:4000', {
    auth: {
      bearerToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlByaW5jZSIsImVtYWlsIjoicHJpbWUwNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRYekpXU0hDSTJBb251TkRnbm5TWXNlNFRCUUdwcnE3aFRTcDZuQ0dJTDJaQVpET1BmSWt2ZSIsInJvbGVJZCI6Miwic3RhdHVzIjoiYWN0aXZlIiwiaWF0IjoxNjg0MzExMjA2LCJleHAiOjE2ODQzOTc2MDZ9.Z5vgr8dYcMwcrHc0BzfzokZbK_7v_yNu-r4JzGPlMGc',
    },
    query: {
      activeRoom: queryFctn('room'),
    },
  });

  let room = queryFctn('room');

  socket.on('connected', () => {
    console.log('connected to server');
  });

  // receive the chats stored in the db
  socket.on('get-chat-history', (chats) => {
    // iterate through them & send to front-end
    chats.chatEach((chat) => {
      const { msg, name, date } = chat;

      const li = document.createElement('li');
      const div = document.createElement('div');
      const h5 = document.createElement('h5');
      const h6 = document.createElement('h6');
      const p = document.createElement('p');

      // Assign respectively the message, name and date to respective elements of the HTML.
      h5.innerText = name;
      h6.innerText = date;
      p.innerText = msg;

      // append elements respectively to each other
      div.appendChild(h5);
      div.appendChild(h6);
      div.appendChild(p);
      li.appendChild(div);
    });
  });

  // listen for 'chat message' event
  socket.on('new-message-event', (room, msg) => {
    const chatList = document.getElementById('chat-list');
    const newMessage = document.createElement('li');
    newMessage.textContent = msg;
    chatList.appendChild(newMessage);
  });

  // handle form submission
  const chatForm = document.getElementById('chat-form');
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const message = input.value;
    socket.emit('new-message-event', room, message);
    input.value = '';
  });

  const loginSection = document.getElementById('chat-form');
  loginSection.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('room-input');
    const message = input.value;
    if (message !== '') {
      room = message;
      socket.emit('join-room-event', message);
      input.value = '';
    }
  });
});
