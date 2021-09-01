export interface GraphEdge<E extends unknown> {
  value: E;
  next: Array<GraphEdge<E>>;
}

export type Create = <E extends unknown>() => GraphEdge<E>;
export type connect = <E extends unknown>(from: GraphEdge<E>, to: GraphEdge<E>) => void;
