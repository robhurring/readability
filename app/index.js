import { element, createApp } from "deku";
import { createStore } from "redux";
import { reducer } from "./actions";
import App from "./components/App";
import styles from "./styles.css";
import 'bootstrap/dist/css/bootstrap.css';

let store = createStore(reducer);
let ctx = {};
let render = createApp(document.body, store.dispatch);

render(<App />, store.getState(), ctx);
