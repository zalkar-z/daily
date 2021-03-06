import shortid from 'shortid';

export function getLists(store) {
  let lists = JSON.parse(localStorage.getItem('lists'));
  if (lists == null) lists = [];

  // update global store
  store.setState({ lists });
}

export function addList(store, newListName) {
  let lists = store.state.lists;

  const newList = {
    id: shortid.generate(),
    name: newListName,
    cards: [],
  }

  lists.push(newList);
  localStorage.setItem('lists', JSON.stringify(lists));

  // call getLists to update global state with latest list
  getLists(store);
}

export function deleteList(store, listId) {
  let { lists, activeList } = store.state;

  lists = lists.filter(list => list.id !== listId);

  localStorage.setItem('lists', JSON.stringify(lists));

  activeList = {cards: []};

  store.setState({ lists, activeList });
}