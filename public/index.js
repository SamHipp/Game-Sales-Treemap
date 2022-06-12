// Fetching the data_________________________________________
fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
    .then((response) => response.json())
    .then((dataRes) => {
        
// Variables________________________________________________
        const data = dataRes['children'];
        const colors = [];
        data.map((item, i) => {
            // Making the entry an array so the category name can be added later
            return colors.push([`hsl(${(i * 360) / data.length}, 100%, 60%)`])
        })

        const graphHeight = 500;
        const graphWidth = 1000;
        const legendHeight = 300;
        const legendWidth = 700;
        const root = d3.hierarchy(dataRes).sum((d) => d.value)
        const treemap = d3.treemap().size([graphWidth, graphHeight]).paddingInner(1)(root);
        const legendBoxSize = 20;
        const tooltip = d3.select('#graph-container')
        .append('div')
        .attr('class', 'tooltip')
        .attr('id', 'tooltip')
        .style('visibility', 'hidden')
        .style('position', 'absolute');

        console.log(data);
        console.log(root.leaves());

        colors.map((item, i) => {
            return item.push(data[i].name);
        })

        console.log(colors);
// Graph Container_______________________________________________
        const svg = d3.select('#graph-container')
            .append('svg')
            .attr('height', graphHeight)
            .attr('width', graphWidth)
            .attr('id', 'graph');
        
// Adding the graph________________________________________________
        const cell = svg
            .selectAll('g')
            .data(root.leaves())
            .enter()
            .append('g')
            .attr('class', 'cell')
            .attr('transform', function (d) {
                return 'translate(' + d.x0 + ',' + d.y0 + ')';
              })
            // adding/removing tooltip
            .on('mouseover', (item, d) => {
            
            tooltip.html(
                `<p class='tooltip-text'>(${d.data.category}) ${d.data.name}:</p>
                <p class='tooltip-text'>${d.data.value} million</p>`
            )
            return tooltip.style('visibility', 'visible');
        })
        .on('mousemove', (item, d) => {
            return tooltip.style("top", (item.layerY-15)+"px").style("left",(item.layerX+15)+"px");
        })
        .on('mouseout', (item, d) => {
            return tooltip.style('visibility', 'hidden');
        });

        cell.append('rect')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('class', 'tile')
            // .style('stroke', 'black')
            .style('fill', d => {
                let fillColor = colors.filter((item) => {return item[1] === d.data.category});
                return fillColor[0][0];
            })
            .attr('data-name', d => d.data.name)
            .attr('data-category', d => d.data.category)
            .attr('data-value', d => d.data.value)

        cell.append('text')
            .attr('x', 5)
            .attr('y', 10)
            .style('inline-size', d => d.x1 - d.x0)
            // .attr('height', d => d.y1 - d.y0)
            .attr('class', 'tile-text')
            // .style('stroke', 'black')
            .text(d => d.data.name);

// Legend_________________________________________________________
        const legend = d3.select('#legend-container')
            .append('svg')
            .attr('height', legendHeight)
            .attr('width', legendWidth)
            .attr('id', 'legend')

        const legendCell = legend
            .selectAll('g')
            .data(colors)
            .enter()
            .append('g')
            .attr('class', 'legend-item')
            .attr('transform', (d, i) => {
                return `translate(${(legendWidth / 4) + (i % 2) * (legendWidth / 2)}, ${25 + Math.floor(i / 2) * (legendBoxSize + 5)})`;
            })

        legendCell.append('rect')
            .attr('height', legendBoxSize)
            .attr('width', legendBoxSize)
            .attr('fill', (d) => d[0])

        legendCell.append('text')
            .attr('class', 'legend-text')
            .attr('x', legendBoxSize + 5)
            .attr('y', (legendBoxSize + 5) / 2)
            .text(d => d[1])



// ______________________________________________________________________________
    });
