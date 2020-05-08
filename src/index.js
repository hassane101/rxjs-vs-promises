import "./styles.css";
import { fromEvent, from } from "rxjs";
import { switchMap, map } from "rxjs/operators";

const fakeCall = num => {
  const timeout = Math.random() * 1000;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num);
    }, timeout);
  });
};

const updateSpan = (id, val) => {
  document.getElementById(id).innerHTML = val;
};

////////////////////////////////

const withPromises = e => {
  fakeCall(e.target.value).then(val => {
    updateSpan("withPromisesValue", val);
  });
};

document
  .getElementById("promiseInput")
  .addEventListener("keyup", withPromises, false);

///////////////////////////////////

const keyUpStream = fromEvent(document.getElementById("rxInput"), "keyup");
keyUpStream
  .pipe(
    map(e => e.target.value),
    switchMap(num => from(fakeCall(num)))
  )
  .subscribe(val => updateSpan("withRxValue", val));
