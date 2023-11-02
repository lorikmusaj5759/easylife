/*

Filename: ComplexCode.js

This code is a complex and elaborate implementation of a data structure called a graph. It provides various functionalities to manipulate and explore the graph, such as adding vertices and edges, finding the shortest path between two vertices, and checking if the graph is connected.

Author: Artificial Intelligence

*/

class Graph {
  constructor() {
    this.vertices = new Map();
    this.edges = new Map();
  }

  addVertex(vertex) {
    if (!this.vertices.has(vertex)) {
      this.vertices.set(vertex, []);
    }
  }

  addEdge(source, destination, weight = 1) {
    if (!this.vertices.has(source) || !this.vertices.has(destination)) {
      throw new Error("Vertex does not exist.");
    }

    const edge = { source, destination, weight };
    this.edges.get(source).push(edge);
  }

  removeVertex(vertex) {
    if (!this.vertices.has(vertex)) {
      throw new Error("Vertex does not exist.");
    }

    this.vertices.delete(vertex);

    const incomingEdges = [];
    const outgoingEdges = this.edges.get(vertex);

    for (const [source, edges] of this.edges.entries()) {
      for (let i = 0; i < edges.length; i++) {
        if (edges[i].destination === vertex) {
          incomingEdges.push({ source, index: i });
        }
      }
    }

    for (const { source, index } of incomingEdges) {
      this.edges.get(source).splice(index, 1);
    }

    this.edges.delete(vertex);
  }

  removeEdge(source, destination, weight) {
    if (!this.vertices.has(source) || !this.vertices.has(destination)) {
      throw new Error("Vertex does not exist.");
    }

    const edges = this.edges.get(source);

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      if (edge.destination === destination && edge.weight === weight) {
        edges.splice(i, 1);
        break;
      }
    }
  }

  findShortestPath(source, destination) {
    const distances = new Map();
    const previous = new Map();

    for (const vertex of this.vertices.keys()) {
      distances.set(vertex, Infinity);
    }

    distances.set(source, 0);

    const queue = [...this.vertices.keys()];

    while (queue.length !== 0) {
      queue.sort((a, b) => distances.get(a) - distances.get(b));
      const current = queue.shift();

      if (current === destination) {
        const path = [];
        let temp = current;
        while (temp !== source) {
          path.unshift(temp);
          temp = previous.get(temp);
        }
        path.unshift(source);
        return path;
      }

      if (distances.get(current) === Infinity) {
        break;
      }

      for (const edge of this.edges.get(current)) {
        const distance = distances.get(current) + edge.weight;
        if (distance < distances.get(edge.destination)) {
          distances.set(edge.destination, distance);
          previous.set(edge.destination, current);
        }
      }
    }

    return null;
  }

  isConnected() {
    const visited = new Set();
    const stack = [this.vertices.keys().next().value];

    while (stack.length !== 0) {
      const current = stack.pop();
      visited.add(current);

      for (const edge of this.edges.get(current)) {
        if (!visited.has(edge.destination)) {
          stack.push(edge.destination);
        }
      }
    }

    return visited.size === this.vertices.size;
  }
}

// Usage Example:

const graph = new Graph();

// Adding vertices
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");

// Adding edges
graph.addEdge("A", "B", 2);
graph.addEdge("B", "C", 1);
graph.addEdge("B", "D", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("D", "E", 1);

// Removing a vertex
graph.removeVertex("C");

// Removing an edge
graph.removeEdge("A", "B", 2);

// Finding the shortest path
const shortestPath = graph.findShortestPath("A", "E");
console.log("Shortest Path:", shortestPath);

// Checking if the graph is connected
const connected = graph.isConnected();
console.log("Is Connected:", connected);

// Further manipulations and explorations on the graph can be done using the provided methods.