// Set up svg
let svgWidth = 960;
let svgHeight = 620;

// set up margins
let margin = {
  top: 20, 
  right: 40, 
  bottom: 200,
  left: 100
};

// calculate chart height and width
let chartWidth = svgWidth - margin.right - margin.left;
let chartHeight = svgHeight - margin.top - margin.bottom;

// append a div class to the scatter element
let chart = d3.select('#scatter')
  .append('div')
  .classed('chart', true);

//append an svg element to the chart 
let svg = chart.append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

//append an svg group
let chartGroup = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

//initial parameters; x and y axis
let chosenXAxis = 'poverty';
let chosenYAxis = 'healthcare';