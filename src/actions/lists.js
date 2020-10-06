export function getLists(store) {
  let lists = localStorage.getItem('lists');
  if (lists == null) lists = [];

  // update global store
  store.setState({ lists });
}

export function addList(store, newList) {
  let lists = localStorage.getItem('lists');
  if (lists == null) lists = [];

  lists.push(newList);

  // update global store
  store.setState({ lists });
}