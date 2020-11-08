import React from 'react';
import useGlobalHook from './useGlobalHook';

import * as actions from '../actions/index';

const initialState = {
  lists: [],
  activeCard: {checklist: []},
  activeList: {cards: []},
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;