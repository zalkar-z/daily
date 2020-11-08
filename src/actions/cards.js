import shortid from 'shortid';
import { getLists } from './lists';
import { act } from 'react-dom/test-utils';

export function addCard(store, listId, newCardName) {
  let lists = store.state.lists;
  if (lists == null) lists = [];

  const newCard = {
    id: shortid.generate(),
    title: newCardName,
    checklist: [{
      title: 'Sample TODO',
      isComplete: false,
    }]
  }

  let index = lists.findIndex(list => list.id === listId);
  if (index !== -1) lists[index].cards.push(newCard);

  localStorage.setItem('lists', JSON.stringify(lists));

  // call getLists to update global state with latest list
  getLists(store);
}

export function setActiveCard(store, cardId) {
  let lists = store.state.lists;
  if (lists == null) lists = [];

  let activeList = lists.filter(list => list.cards.findIndex(card => card.id === cardId) !== -1)[0];
  let activeCard = activeList.cards.filter(card => card.id === cardId)[0];

  store.setState({ activeList, activeCard });
}

export function addChecklistItem(store, title) {
  let { activeList, activeCard, lists } = store.state;

  activeCard.checklist.push({
    title: title,
    isComplete: false,
  });

  activeList.cards[activeList.cards.findIndex(card => card.id === activeCard.id)] = activeCard;
  lists[lists.findIndex(list => list.id === activeList.id)] = activeList;

  localStorage.setItem('lists', JSON.stringify(lists));

  store.setState({ lists, activeList, activeCard });
}