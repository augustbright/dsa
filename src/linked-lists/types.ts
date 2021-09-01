/* A linked list is a sequence of data structures,
which are connected together via links.
Linked List is a sequence of links which contains items.
Each link contains a connection to another link.
Linked list is the second most-used data structure after array.
*/

// Simple typing
export interface SimpleLink<E extends unknown> {
  data: E;
  next: SimpleLink<E> | null;
}

export interface SimpleLinkedList<E extends unknown> {
  first: SimpleLink<E>;
}


// Complex typing
type LinkParams = 'Circular'|'Doubly'|undefined;

export type Link<
  E extends unknown,
  Params extends LinkParams = undefined
> =  {
    data: E;
    next: Extract<Params, 'Circular'> extends never ? Link<E, Params> | null : Link<E, Params>;
} & (Extract<Params, 'Doubly'> extends never ? {} : {
    previous: Extract<Params, 'Circular'> extends never ? Link<E, Params> | null : Link<E, Params>;
});

export interface LinkedList<E extends unknown, Params extends LinkParams = undefined> {
  first: Link<E, Params>;
}

// examples

// @ts-expect-error
const link: Link<number, 'Circular'> = {
  data: 1
};
link.next = link;

const ll: LinkedList<number, 'Circular'> = {
  first: link
}

const simpleLink: SimpleLink<number> = {
  data: 1,
  next: null
};

const simpleLL: SimpleLinkedList<number> = {
  first: simpleLink
};
