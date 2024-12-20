class Graph {

    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(vertex1, vertex2, weight) {
        if (vertex1 === vertex2) {
            this.adjacencyList.get(vertex1).push({ vertex: vertex2, weight });
            return;
        }
        if (this.adjacencyList.has(vertex1)) {
            this.adjacencyList.get(vertex1).push({ vertex: vertex2, weight });
        }
        if (this.adjacencyList.has(vertex2)) {
            this.adjacencyList.get(vertex2).push({ vertex: vertex1, weight });
        }
    }

    getWeight(vertex1, vertex2) {
        if (this.adjacencyList.has(vertex1)) {
            return (this.adjacencyList).get(vertex1).find(entry => entry.vertex === vertex2).weight;
        }
    }


};

export default Graph;