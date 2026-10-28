# Week 03 Answers

## 1. Array index as :key when the list is filtered

If I use the index as the key, Vue matches cards by position, not by which event they are. After filtering, the card at position 0 is a different event, but Vue reuses the old component for that position. So the local state (like an open details panel) stays on that position and shows up on the wrong event. Using `e.id` as the key fixes it, because each card keeps its own state.

## 2. Why `visible` is a computed and not a function

A computed is cached. It only runs again when something it uses changes (`search`, `category` or `events`). A function in the template runs on every re-render, even if the change has nothing to do with the filter. When I type in the search box both of them recalculate, because `search` changed. The difference shows up when other state changes, because then the computed just returns the saved result.

## 3. Why EventCard emits `book` instead of changing `event.booked`

First, props are read-only and data flows one way, from parent to child. If the card changes `event.booked` itself, Vue warns and the data gets messy. Second, the parent owns the data, so it is the single place that decides what happens when someone books (check the capacity, save the booking). This also keeps EventCard reusable, because it only reports "the user clicked book" and does not need to know what happens next.

## 4. `const { booked } = reactive(event); booked++`

Destructuring copies the value into a plain number, so `booked` is no longer connected to the reactive object. When I do `booked++` it only changes my local variable, and Vue never sees it, so the page does not update. To keep it reactive I need to use `toRefs()` or just write `state.booked`. Also, `event` is a prop here, so I should not change it anyway (see question 3).

## 5. Where `myBookings` lives

It lives in `App.vue`, the parent of both components. EventCard and EventList are siblings or children, so they can't share data with each other directly. Also cards get removed and re-created when the list is filtered, so state inside them would be lost. In `App.vue` the data stays safe, and it goes down as props while the `book` event comes back up.