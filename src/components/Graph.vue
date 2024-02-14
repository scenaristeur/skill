<template>
    <div>
        {{ todos }}
        <div ref="graph" id="3d-graph"></div>
    </div>
</template>

<script>
import ForceGraph3D from '3d-force-graph';
export default {
    name: "Graph",
    data() {
        return {
            Graph: null,
            nodes: [],
            links: []
        }
    },
    mounted() {
        const graphDiv = this.$refs.graph
        // const N = 30;

        // this.nodes = [...Array(N).keys()].map(i => ({ id: i })),
        //     this.links = [...Array(N).keys()]
        //         .filter(id => id)
        //         .map(id => ({
        //             source: id,
        //             target: Math.round(Math.random() * (id - 1))
        //         }))

        this.Graph = ForceGraph3D();
        this.Graph(graphDiv)
            //.graphData(gData)
            .width(800)
            .height(600)
            .nodeAutoColorBy("type")
            .onNodeClick(node => {
                this.onNodeClick(node)
            })
        this.updateGraph()
    },
    methods: {
        onNodeClick(node) {
            console.log(node)
        },
        upsertNode( element) { 
            const i = this.nodes.findIndex(_element => _element.id === element.id);
            if (i > -1) this.nodes[i] = element; 
            else this.nodes.push(element);
        },
        upsertLink(link) {
            const i = this.links.findIndex(_element => _element.source === link.source && _element.name === link.name && _element.target === link.target);
            if (i > -1) this.links[i] = link; 
            else this.links.push(link);
        },

        updateNodes() {

            let users = this.users.map(user => ({ id: user.id, name: user.username, type: "user" }))
            users.forEach(user => this.upsertNode( user))
            //this.nodes = this.nodes.map(obj => users.find(o => o.id === obj.id) || obj);
            // arr1.map(obj => arr2.find(o => o.id === obj.id) || obj);
  

            //  console.log("todos", this.todos) 
            let todos = this.todos.filter(todo => todo.is_complete).map(todo => ({ id: todo.id, name: todo.task, type: "todo" }))
            todos.forEach(todo => this.upsertNode( todo))
  
            // this.nodes = this.nodes.map(obj => todos.find(o => o.id === obj.id) || obj);
            // console.log(this.nodes)
            // console.log("users", users, "todos", todos, "nodes", this.nodes, "links", this.links)
            this.updateGraph()
        },
        updateLinks() {
            this.links = []
           let todos = this.todos.filter(todo => todo.is_complete).map(todo => ({ id: todo.id, name: todo.task, user_id: todo.user_id,type: "todo" }))

            todos.forEach(todo  => {
                let link = {source: todo.user_id,   name: "interest",   target: todo.id}
                console.log(link)
                this.upsertLink( link)})
            this.updateGraph()
        },
        updateGraph() {
        
            this.Graph.graphData({ nodes: this.nodes, links: this.links })
        },
    },
    watch: {
        users() {
            this.updateNodes()
           
        },
        todos() {
            this.updateNodes()
            this.updateLinks()
            // this.graphData = { nodes: nodes, links: [] }
            // this.Graph.graphData(this.graphData)
        }
    },
    computed: {
        users() {
            return this.$store.state.users.users
        },
        todos() {
            return this.$store.state.todos.todos
        }
    }
}
</script>

<style scoped></style>