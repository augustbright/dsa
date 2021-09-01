/* A linked list is a sequence of data structures,
which are connected together via links.
Linked List is a sequence of links which contains items.
Each link contains a connection to another link.
Linked list is the second most-used data structure after array.
*/

import { SymbolDisplayPartKind } from "typescript";

export interface Link<E extends unknown> {
  data: E;
  next: Link<E> | null;
}

export interface LinkedList<E extends unknown> {
  first: Link<E> | null;
  [Symbol.iterator]: () => {
    next: () => {
      done: false;
      value: E;
    } | {
      done: true;
      value: null;
    }
  }
}

export type Create = <E extends unknown>() => LinkedList<E>;
export type Unshift = <E extends unknown>(ll: LinkedList<E>, element: E) => void;
export type Shift = <E extends unknown>(ll: LinkedList<E>) => void;
export type Display = <E extends unknown>(ll: LinkedList<E>) => void;
export type Search = <E extends unknown>(ll: LinkedList<E>, key: number) => Link<E>;
export type Insert = <E extends unknown>(ll: LinkedList<E>, element: E, key: number) => void;
export type RemoveByKey = <E extends unknown>(ll: LinkedList<E>, key: number) => void;

