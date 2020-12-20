// Set up svg
let svgWidth = 960;
let svgHeight = 600;

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

// append an svg element to the chart 
let svg = chart.append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

// append an svg group
let chartGroup = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// initial parameters; x and y axis
let chosenXAxis = 'poverty';
let chosenYAxis = 'healthcare';

// function for updating the x-scale 
function xScale(censusData, chosenXAxis) {
    
    let xLinear = d3.scaleLinear()
      .domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
        d3.max(censusData, d => d[chosenXAxis]) * 1.2])
      .range([0, chartWidth]);

    return xLinear;
}

// function for updating y-scale
function yScale(censusData, chosenYAxis) {
    //scales
    let yLinear = d3.scaleLinear()
      .domain([d3.min(censusData, d => d[chosenYAxis]) * 0.8,
        d3.max(censusData, d => d[chosenYAxis]) * 1.2])
      .range([chartHeight, 0]);
  
    return yLinear;
}

// function for updating the x axis
function renderXAxis(newXScale, xAxis) {
    let bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(2000)
      .call(bottomAxis);
  
    return xAxis;
}

// function used for updating y axis
function renderYAxis(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(2000)
      .call(leftAxis);
  
    return yAxis;
}

// function for updating the circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(2000)
      .attr('cx', data => newXScale(data[chosenXAxis]))
      .attr('cy', data => newYScale(data[chosenYAxis]))

    return circlesGroup;
}

// function for updating labels
function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    textGroup.transition()
      .duration(2000)
      .attr('x', d => newXScale(d[chosenXAxis]))
      .attr('y', d => newYScale(d[chosenYAxis]));

    return textGroup
}

// x axis tool tips 
function styleX(value, chosenXAxis) {

    //poverty
    if (chosenXAxis === 'poverty') {
        return `${value}%`;
    }
    //household income
    else if (chosenXAxis === 'income') {
        return `${value}`;
    }
    else {
      return `${value}`;
    }
}

// updating circles group
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
    // x axis
    if (chosenXAxis === 'poverty') {
      var xLabel = 'Poverty:';
    }
    else if (chosenXAxis === 'income'){
      var xLabel = 'Median Income:';
    }
    else {
      var xLabel = 'Age:';
    }

    // y axis
    if (chosenYAxis ==='healthcare') {
        var yLabel = "No Healthcare:"
    }
    else if(chosenYAxis === 'obesity') {
        var yLabel = 'Obesity:';
    }
    else{
        var yLabel = 'Smokers:';
    }

    //create tooltip
    var toolTip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-8, 0])
        .html(function(d) {
            return (`${d.state}<br>${xLabel} ${styleX(d[chosenXAxis], chosenXAxis)}<br>${yLabel} ${d[chosenYAxis]}%`);
    });

    circlesGroup.call(toolTip);

    circlesGroup.on('mouseover', toolTip.show)
        .on('mouseout', toolTip.hide);

        return circlesGroup;
};

// load data 
d3.csv('assets/data/data.csv').then(function(censusData) {

    console.log(censusData);

    // parse data
    censusData.forEach(function(data){
        data.obesity = +data.obesity;
        data.income = +data.income;
        data.smokes = +data.smokes;
        data.age = +data.age;
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
    });

    //create linear scales
    var xLinear = xScale(censusData, chosenXAxis);
    var yLinear = yScale(censusData, chosenYAxis);

    //create x axis
    var bottomAxis = d3.axisBottom(xLinear);
    var leftAxis = d3.axisLeft(yLinear);

    //append X
    var xAxis = chartGroup.append('g')
      .classed('x-axis', true)
      .attr('transform', `translate(0, ${height})`)
      .call(bottomAxis);

    //append Y
    var yAxis = chartGroup.append('g')
      .classed('y-axis', true)
      //.attr
      .call(leftAxis);
    
    //append Circles
    var circlesGroup = chartGroup.selectAll('circle')
      .data(censusData)
      .enter()
      .append('circle')
      .classed('stateCircle', true)
      .attr('cx', d => xLinearScale(d[chosenXAxis]))
      .attr('cy', d => yLinearScale(d[chosenYAxis]))
      .attr('r', 14)
      .attr('opacity', '.5');

    //append Initial Text
    var textGroup = chartGroup.selectAll('.stateText')
     .data(censusData)
     .enter()
     .append('text')
     .classed('stateText', true)
     .attr('x', d => xLinearScale(d[chosenXAxis]))
     .attr('y', d => yLinearScale(d[chosenYAxis]))
     .attr('dy', 3)
     .attr('font-size', '10px')
     .text(function(d){return d.abbr});