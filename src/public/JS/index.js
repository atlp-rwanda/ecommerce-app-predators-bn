const server = 'http://localhost:3000';

// get the namespaces list from the server and append to the DOM
const getNamespaces = async () => {
  // get the namespaces ul element
  const namespacesList = document.getElementById('namespaces-list');

  // fetch the namespaces from the db in app
  const response = await fetch(`${server}/api/chatDb/get-namespace`);
  const namespaces = await response.json();

  // iterate over the namespaces and append to the DOM
  namespaces.forEach((namespace) => {
    let nsp = namespace;
    if (namespace === '/') {
      nsp = 'main';
    }
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `http:/localhost:3000/rooms/?nsp=${nsp}`;
    a.textContent = `/${nsp}`;
    li.appendChild(a);
    namespacesList.appendChild(li);
  });
};
getNamespaces();
