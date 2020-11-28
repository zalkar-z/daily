import shortid from 'shortid';
import { getLists } from './lists';

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

export function deleteCard(store, cardId) {
  let { lists, activeList } = store.state;

  activeList.cards = activeList.cards.filter(card => card.id !== cardId);

  lists[lists.findIndex(list => list.id === activeList.id)] = activeList;

  localStorage.setItem('lists', JSON.stringify(lists));

  store.setState({ lists, activeList });
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

export function updateChecklistItem(store, index, isComplete) {
  let { activeList, activeCard, lists } = store.state;

  activeCard.checklist[index].isComplete = isComplete;

  activeList.cards[activeList.cards.findIndex(card => card.id === activeCard.id)] = activeCard;
  lists[lists.findIndex(list => list.id === activeList.id)] = activeList;

  localStorage.setItem('lists', JSON.stringify(lists));

  store.setState({ lists, activeList, activeCard });
}

export function deleteChecklistItem(store, index) {
  let { activeList, activeCard, lists } = store.state;

  activeCard.checklist.splice(index, 1);

  activeList.cards[activeList.cards.findIndex(card => card.id === activeCard.id)] = activeCard;
  lists[lists.findIndex(list => list.id === activeList.id)] = activeList;

  localStorage.setItem('lists', JSON.stringify(lists));

  store.setState({ lists, activeList, activeCard });
}