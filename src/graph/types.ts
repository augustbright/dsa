export interface Edge<E extends unknown> {
  value: E;
}

export type Vertex<E extends unknown> = [Edge<E>, Edge<E>];

export interface Graph<E extends unknown> {
  edges: Array<Edge<E>>;
  vertices: Array<Vertex<E>>;
}

export type Create = <E extends unknown>() => Graph<E>;
export type addVertex = <E extends unknown>(graph: Graph<E>, value: E) => void;
export type addEdge = <E extends unknown>(
  graph: Graph<E>,
  first: Edge<E>,
  second: Edge<E>
) => void;
