import shortid from 'shortid';
import { getLists } from './lists';

export function addCard(store, listId, newCardName) {
  let lists = JSON.parse(localStorage.getItem('lists'));
  if (lists == null) lists = [];

  const newCard = {
    id: shortid.generate(),
    title: newCardName,
    checklist: {
      id: shortid.generate(),
      title: "Checklist for ".concat(newCardName),
      todo: [],
    },
  }

  let index = lists.findIndex(list => list.id === listId);
  if (index !== -1) lists[index].cards.push(newCard);

  localStorage.setItem('lists', JSON.stringify(lists));

  // call getLists to update global state with latest list
  getLists(store);
}