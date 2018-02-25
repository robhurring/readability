import {element} from 'deku';

export default function render({props}) {
  return (
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="/">{props.title}</a>
        </div>
      </div>
    </nav>
  );
}
