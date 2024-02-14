<template>
    <div>
        {{  session  }}
        <div ref="graph" id="3d-graph"></div>
    </div>
</template>

<script>
import ForceGraph3D from '3d-force-graph';
export default {
    name: "Graph",
    mounted() {
        const graphDiv = this.$refs.graph
        const N = 300;
        const gData = {
            nodes: [...Array(N).keys()].map(i => ({ id: i })),
            links: [...Array(N).keys()]
                .filter(id => id)
                .map(id => ({
                    source: id,
                    target: Math.round(Math.random() * (id - 1))
                }))
        };
        this.Graph = ForceGraph3D();
        this.Graph(graphDiv)
            .graphData(gData)
            .width(800)
            .height(600)
    },
    computed: {
    session() {
      return this.$store.state.core.session
    },
}
}
</script>

<style scoped></style>