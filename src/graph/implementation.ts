import {GraphEdge, Create, Connect, Traverse} from './types';

export const create: Create = <E extends unknown>(value: E) => ({
  value,
  next: new Set()
});

export const connect: Connect = <E extends unknown>(from: GraphEdge<E>, to: GraphEdge<E>) => {
  from.next.add(to);
  to.next.add(from);
};

export const deepTraverse: Traverse = <E extends unknown>(start: GraphEdge<E>) => ({
  [Symbol.iterator]: () => {
    const visited = new Set<GraphEdge<E>>();
    const stack = [] as Array<GraphEdge<E>>;

    stack.unshift(start);
    visited.add(start);

    return {
      next: () => {
        if (stack.length === 0) {
          return {
            done: true
          };
        }

        const result = {
          done: false as const,
          value: stack[0].value,
        };

        let nextUnvisited: GraphEdge<E> | undefined;
        while (nextUnvisited === undefined && stack.length > 0) {
          nextUnvisited = [...stack[0].next].find(edge => !visited.has(edge));
          if (!nextUnvisited) stack.shift();
        }
        if (nextUnvisited !== undefined) {
          stack.unshift(nextUnvisited);
          visited.add(nextUnvisited);
        }

        return result;
      }
    };
  }
});

export const breadthTraverse: Traverse = <E extends unknown>(start: GraphEdge<E>) => ({
  [Symbol.iterator]: () => {
    const visited = new Set<GraphEdge<E>>();
    const queue = [] as Array<GraphEdge<E>>;
    queue.push(start);
    visited.add(start);

    return {
      next: () => {
        if (queue.length === 0) {
          return {
            done: true
          };
        }

        // enqueue next edges
        for (const edge of queue[0].next) {
          if (!visited.has(edge)) {
            queue.push(edge);
            visited.add(edge);
          }
        }

        return {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          value: queue.shift()!.value,
          done: false as const
        }
      }
    };
  }
});
