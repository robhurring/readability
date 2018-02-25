import {element} from 'deku';

export default function render({props}) {
  return (
    <footer class="container text-muted">
      Credits:
      <a class="text-muted" href="http://juicystudio.com/services/readability.php">JuicyStudio</a>,
      <a class="text-muted" href="https://github.com/cgiffard/TextStatistics.js">cgiffard/TextStatistics.js</a>
    </footer>
  );
}

