import { RootState } from "../store";

export const selectPizzaItems = (state: RootState) => state.pizza.items;
export const selectPizzaStatus = (state: RootState) => state.pizza.status;