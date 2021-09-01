export interface GraphEdge<E extends unknown> {
  value: E;
  next: Set<GraphEdge<E>>;
}
export interface Iterable<E extends unknown> {
  [Symbol.iterator]: () => {
    next: () => {
      value: E,
      done: false
    } | {
      done: true
    };
  }
}

export type Create = <E extends unknown>(value: E) => GraphEdge<E>;
export type Connect = <E extends unknown>(from: GraphEdge<E>, to: GraphEdge<E>) => void;
export type Traverse = <E extends unknown>(start: GraphEdge<E>) => Iterable<E>;
