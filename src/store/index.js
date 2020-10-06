import React from 'react';
import useGlobalHook from './useGlobalHook';

import * as actions from '../actions/index';

const initialState = {
  lists: [],
  // cards: [],
  // checklists: [],
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;