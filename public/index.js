// Fetching the data_________________________________________
fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
    .then((response) => response.json())
    .then((dataRes) => {
        
// Variables________________________________________________
        const data = dataRes['children'];
        const colors = [];
        data.map((item, i) => {
            return colors.push(`hsl(${(i * 360) / data.length}, 80%, 50%)`)
        })

        console.log(data);

        const graphHeight = 500;
        const graphWidth = 1000;
        const hPadding = 300;
        const treemap = d3.treemap().size([graphWidth, graphHeight]).paddingInner(1);


        const svg = d3.select('#graph-container')
            .append('svg')
            .attr('height', graphHeight)
            .attr('width', graphWidth)
            .attr('id', 'graph');

        svg.append('g')
            .selectAll('rect')
            .data(colors)
            .enter()
            .append('rect')
            .attr('height', 20)
            .attr('width', 20)
            .attr('x', (d, i) => 50 + (i * 20))
            .attr('y', 50)
            .attr('fill', (d) => d)



// ______________________________________________________________________________
    });



/*

User Story #3: My tree map should have rect elements with a corresponding class="tile" that represent the data.

User Story #4: There should be at least 2 different fill colors used for the tiles.

User Story #5: Each tile should have the properties data-name, data-category, and data-value containing their corresponding name, category, and value.

User Story #6: The area of each tile should correspond to the data-value amount: tiles with a larger data-value should have a bigger area.

User Story #7: My tree map should have a legend with corresponding id="legend".

User Story #8: My legend should have rect elements with a corresponding class="legend-item".

User Story #9: The rect elements in the legend should use at least 2 different fill colors.

User Story #10: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.

User Story #11: My tooltip should have a data-value property that corresponds to the data-value of the active area.

For this project you can use any of the following datasets:

Kickstarter Pledges: https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json
Movie Sales: https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json
Video Game Sales: https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json
*/