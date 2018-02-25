import {element} from 'deku';
import _ from 'bootstrap';
import {Form, InputField, TextField} from 'deku-forms';

import {fetchUrl} from '../actions';

let textarea;

function render({ props, children, dispatch }) {
  return (
    <Form onSubmit={handle}>
      <InputField name="username"
        label="Username"
        required />
      <button type="submit">Submit</button>
    </Form>
  );
}

function onCreate ({ props, dispatch }) {
  dispatch({
    type: 'APP_STARTED'
  })
}

function handle(data, form) {
  // data: serialized form data
  // form: raw form element
  console.log(data);
}


export default {
  render,
  onCreate
}
