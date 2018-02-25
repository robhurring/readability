import { element, createApp } from "deku";
import { createStore } from "redux";
import { reducer } from "./actions";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css"

import App from "./components/App";

let store = createStore(reducer);
let ctx = {};
let render = createApp(document.body, store.dispatch);

const update = (App, context) => {
  render(<App />, context);
}

update(App, store.getState());

store.subscribe(() => {
  update(App, store.getState());
});

