import { fromEvent, from, of, Observable, interval, timer } from 'rxjs'; 
import { debounceTime, map, mapTo,filter, distinctUntilChanged, mergeMap, catchError, switchMap } from 'rxjs/operators';



// saf
// [switchMap]
// --------------------------------------------

function simulateFirebase(val: any, delay: number) {
    return interval(delay).pipe(
    	map(index => val + " " + index)
    )
}

const firebase1$ = simulateFirebase("FB-1 ", 5000);
// const firebase2$ = simulateFirebase("FB-2 ", 1000);

const firebaseResult$ = firebase1$.pipe(
  switchMap(sourceValue => {
      console.log("source value " + sourceValue);
      return simulateFirebase("inner observable ", 1000)
  })
);

const subscriber = firebaseResult$.subscribe(
    console.log,
    console.error,
    () => console.log('completed firebaseResult$')
);

timer(20000).pipe(
    	map(() => subscriber.unsubscribe())
    ).subscribe(
    console.log,
    console.error,
    () => console.log('completed firebaseResult$')
);

// end[switchMap]
// --------------------------------------------





// [mergeMap]
// --------------------------------------------
/*
function simulateFirebase(val: any, delay: number) {
    return interval(delay).pipe(
    	map(index => val + " " + index)
    )
}

const firebase1$ = simulateFirebase("FB-1 ", 5000);
const firebase2$ = simulateFirebase("FB-2 ", 1000);

firebase1$.subscribe(
    console.log,
    console.error,
    () => console.log('firebase1$ completed')
);

firebase2$.subscribe(
    console.log,
    console.error,
    () => console.log('firebase2$ completed')
);


let count = 0;
const makeRequest = ( who) => {
  return interval(1000).pipe(
    mapTo(who + 'success ' + count++)
  )
}

let count1 = 0;
let subscription = interval(1000).pipe(
  mergeMap(() => {
    let who = 'second thread ' + count1++ + ' ';
    console.log('-----------------------------')
    return makeRequest(who);
  })
).subscribe({
  next: console.log
});

timer(20000).pipe(
    	map(() => subscription.unsubscribe())
    ).subscribe(
    console.log,
    console.error,
    () => console.log('completed firebaseResult$')
);
*/
// end [mergeMap]
// --------------------------------------------

// const input = document.querySelector('input');
// const ul = document.querySelector('ul');

// fromEvent(input, 'keyup').pipe(
//   debounceTime(700),
//   map(event => event.target.value),
//   filter(val => val.length > 2),
//   distinctUntilChanged(),
//   mergeMap(value => {
//     return from(getUsersRepsFromAPI(value)).pipe(
//       catchError(err => of([]))
//     )
//   })
// ).subscribe({
//   next: reps => recordRepsToList(reps)
// })

// const recordRepsToList = (reps) => {
//   for (let i = 0; i < reps.length; i++) {

//     // если элемент не существует, то создаем его
//     if (!ul.children[i]) {
//       const newEl = document.createElement('li');
//       ul.appendChild(newEl);
//     }

//     // записываем название репозитория в элемент
//     const li = ul.children[i];
//     li.innerHTML = reps[i].name;
//   }

//   // удаляем оставшиеся элементы
//   while (ul.children.length > reps.length) {
//     ul.removeChild(ul.lastChild);
//   }
// }

// const getUsersRepsFromAPI = (username) => {
//   const url = `https://api.github.com/users/${ username }/repos`;
//   return fetch(url)
//     .then(response => {
//       if(response.ok) {
//         return response.json();
//       }

//       throw new Error('Ошибка');
//     });
// }