import { element } from "deku";
import { Form, InputField, TextField } from "deku-forms";
import Header from "./Header";
import Footer from "./Footer";

function render({ props, children, dispatch, context }) {
  console.log(arguments);
  return (
    <section>
      <Header title="Readability" />
      <p>{context.clicks}</p>
      <button onClick={()=>{dispatch({type:'BOOM'})}}>boom</button>
      <Footer />
    </section>
  );
}

function onCreate({ props, dispatch }) {
  dispatch({
    type: "APP_STARTED"
  });
}

function handle(data, form) {
  // data: serialized form data
  // form: raw form element
  console.log(data);
}

export default {
  render,
  onCreate
};
