import {h1, h2, output} from '../utils';
import type {
  Create,
  Display,
  Insert,
  RemoveByKey,
  Search,
  Shift,
  Unshift,
  LinkedList,
  Link
} from './types';

const create: Create = <E extends unknown>() => {
  const list: LinkedList<E> = {
    first: null,
    [Symbol.iterator]: () => {
      let item = list.first;
      return {
        next: () => {
          if (!item) {
            return {
              done: true,
              value: null
            };
          }
          const result = {
            done: false as const,
            value: item.data
          };
          item = item.next;
          return result;
        }
      }
    }
  };

  return list;
}

const display: Display = <E extends unknown>(list: LinkedList<E>) => {
  for (let item of list) {
    output(item);
  }
}

const unshift: Unshift = <E extends unknown>(list: LinkedList<E>, element: E) => {
  const first: Link<E> = {
    data: element,
    next: list.first
  };
  list.first = first;
};


export const run = () => {
  h1('Linked Lists');

  let list = create<number>();

  h2('unshift 7, 4');
  unshift(list, 7);
  unshift(list, 4);
  display(list);

  h2('to array');
  output([...list]);
};
