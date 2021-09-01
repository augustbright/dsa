import {GraphEdge, Create, Connect, Traverse} from './types';

export const create: Create = <E extends unknown>(value: E) => ({
  value,
  next: new Set()
});

export const connect: Connect = <E extends unknown>(from: GraphEdge<E>, to: GraphEdge<E>) => {
  from.next.add(to);
  to.next.add(from);
};

export const deepTraverse: Traverse = <E extends unknown>(start: GraphEdge<E>) => null;
export const breadthTraverse: Traverse = <E extends unknown>(start: GraphEdge<E>) => null;
