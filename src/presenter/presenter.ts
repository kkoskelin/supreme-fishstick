import { IContext, createOvermind } from 'overmind';
import { actions } from './actions/';
import { createActionsHook, createStateHook } from 'overmind-react';
import { effects } from './effects/';
import { initializeRouter } from './router';
import { state } from './state';

const overmindConfig = {
  actions,
  effects,
  state,
};

export type Context = IContext<{
  state: typeof overmindConfig.state;
  actions: typeof overmindConfig.actions;
  effects: typeof overmindConfig.effects;
}>;

export const overmindApp = createOvermind(overmindConfig);

initializeRouter(overmindApp);

export const useAppState = createStateHook<Context>();
export const useActions = createActionsHook<Context>();
