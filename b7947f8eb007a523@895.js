import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`# Mini-Project 1 (Geo)`
)}

function _2(md){return(
md`## Data

Here we load a [simplified and reduced version](https://docs.google.com/spreadsheets/d/18PAh9jNB6bo-jz0HfpAZwpwbUu0cXoxwZBZSP0oDVvM) of the [AidData dataset](https://www.aiddata.org/data/aiddata-core-research-release-level-1-3-1). You are free to change this code as you wish. If you don't want to preprocess your data on Observable, then you can do the preprocessing using whatever languages or tools you'd like and then [upload](/@observablehq/file-attachments) your preprocessed data to Observable. If you take this approach, then you should delete the \`aiddata\` cell below so that you're not loading unnecessary data.

The dataset contains the following columns:
- **yearDate**: year of the commitment as a Date object
- **yearInt**: year of the commitment as an integer
- **donor**: country providing the financial resource
- **recipient**: country receiving the financial resource
- **amount**: the total amount of financial resources provided
- **purpose**: the purpose of the transaction`
)}

function _3(Inputs,aiddata){return(
Inputs.table(aiddata)
)}

async function _aiddata(d3,googleSheetCsvUrl)
{
  const data = await d3.csv(googleSheetCsvUrl, row => ({
    yearDate: d3.timeParse('%Y')(row.year),
    yearInt: +row.year,
    donor: row.donor,
    recipient: row.recipient,
    amount: +row.commitment_amount_usd_constant/ 1000,
    purpose: row.coalesced_purpose_name,
  }));
  
  data.columns = Object.keys(data[0]);
  
  return data;
}


function _5(md){return(
md`Next we load GeoJSON data for countries. This file is derived from data from [Natural Earth](https://www.naturalearthdata.com).`
)}

function _geoJSON(FileAttachment){return(
FileAttachment("countries-50m.json").json()
)}

function _7(md){return(
md`## Questions

Your goal is to create 3 independent visualizations of the same data set, each one with the intent of answering the questions stated below. For each numbered visualization, you should be able to create a data visualization that answers **all** of the questions specified. These are the 3 visualizations you should create:

- **Visualization 1:** 

  Q1) How do the countries compare in terms of how much they receive and donate? **(20 points)** 

  Q2) Are there countries that donate much more than they receive or receive much more than they donate? **(20 points)**

  Aesthetics and Clarity **(10 points)**

- **Visualization 2:** 

  Q1) Do the countries that mostly receive or mostly donate tend to cluster around specific geographical areas of the world? **(20 points)**

  Q2) Are there neighboring countries that have radically different patterns in terms of how much they receive vs. how much they donate?  **(20 points)**

  Aesthetics and Clarity: **(10 points)**


- **[OPTIONAL / EXTRA POINTS] Visualization 3:** 

  Q1) Are there any major differences in how the top 5 most frequent purposes of disbursements (across all countries) distribute geographically in terms of countries that receive donations? **(15 points)**

  Q2) Are there countries that tend to receive more of certain types of donations than others? (Note: it would be more interesting to look at the top 5 purposes locally, for each individual country but visualizing the results may be even harder. If you want to try out a solution for this harder case it would be nice to see it). **(15 points)**

For each visualization add a description of your thought process and why you think your solution is *appropriate* and *effective*.

Note it is okay to submit more than one solution for a given visualization problem if you think there are some competing solutions that work well. When you do that, make sure to compare the solutions by commenting on their advantages and disadvantages.
`
)}

function _8(md){return(
md`### Remember

The questions above are a very useful tool for you to verify whether you are producing a good solution or not. As you go about solving this exercise you can use the questions above as an evaluation tool in two main ways:
1. Verify that you can indeed answer the questions with your visualization. If you can’t fully answer the questions, it means your solution has some problems.
2. Compare multiple solutions to the same problem and ask yourself: “which one makes it easier for me to answer these questions?”, where easier may mean, more accurately, with less effort or faster.
`
)}

function _9(md){return(
md`## Instructions
- Your coded solutions must use D3. Other visualization libraries are not allowed.
- You should feel free to process and transform the data any way you deem relevant and use any tool you prefer for data processing. Data transformation does not necessarily have to be in JavaScript nor within Observable. It’s ok to pre-process the data and then load it in Observable if you prefer.
- You can use Mike Bostock's [Color Legend](/@d3/color-legend) notebook to create your legends.`
)}

function _11(md){return(
md`## Grading Criteria

The main parameters we will use for grading are the following:

- Does the information extracted answer the questions posed in the exercise?
- Does the visualization answer the questions posed in the exercise?
- Is the visual representation clear? Does it have good aesthetics?
  - Review this [notebook on clarity](/@nyuinfovis/contextual-elements-aesthetics-and-clarity?collection=@nyuinfovis/guides-and-examples) for reference.`
)}

function _12(md){return(
md`## Solutions`
)}

function _13(md){return(
md`### Visualization 1:`
)}

function _14(d3,aiddata)
{
const donorTotal = d3.rollup(aiddata, 
  v => d3.sum(v, d => d.amount),
  d => d.donor
);

const receiveTotal = d3.rollup(aiddata, 
  v => d3.sum(v, d => d.amount),
  d => d.recipient
);

const combinedTotals = Array.from(receiveTotal, ([recipient, receiveAmount]) => {
  return {
    country: recipient,
    receiveAmount: (receiveAmount / (receiveAmount + (donorTotal.get(recipient) || 0))) * 100,
    donorAmount: 100 - ((receiveAmount / (receiveAmount + (donorTotal.get(recipient) || 0))) * 100)
  };
});

combinedTotals.sort((a, b) => b.donorAmount - a.donorAmount);
  
const width = 500;
const height = 500;
const margin = { top: 40, right: 150, bottom: 40, left: 150 };
  
const svg = d3.create('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

const x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);

const y = d3.scaleBand()
    .domain(combinedTotals.map(d => d.country))
    .range([0, height])
    .padding(0.1);

g.selectAll('.bar')
    .data(combinedTotals)
    .join('g')
      .attr('class', 'bar')
      .attr('transform', d => `translate(0,${y(d.country)})`)
    .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', d => x(d.donorAmount))
      .attr('height', y.bandwidth())
      .attr('fill', 'blue');

g.selectAll('.bar')
    .data(combinedTotals)
    .join('g')
      .attr('class', 'bar')
      .attr('transform', d => `translate(0,${y(d.country)})`)
    .append('rect')
      .attr('x', d => x(d.donorAmount))
      .attr('y', 0)
      .attr('width', d => x(d.receiveAmount)) 
      .attr('height', y.bandwidth())
      .attr('fill', 'orange');

svg.append('g')
    .attr('transform', `translate(${margin.left},${height + margin.top})`)
    .call(d3.axisBottom(x).ticks(10).tickFormat(d => `${d}%`));

svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`) 
    .call(d3.axisLeft(y));

svg.append('text')
    .attr('y', margin.top + height + margin.bottom - 10)
    .attr('x', margin.left + width / 2)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px') 
    .text('Percentage(%)');

svg.append('text')
    .attr('y', margin.top - 10)
    .attr('x', margin.left)
    .attr('text-anchor', 'middle')
    .attr('font-size', '12px') 
    .text('Countries');

const legendWidth = 200;
const legendHeight = 50;
const legendMargin = { top: 10, right: 10, bottom: 10, left: 10 };

const legend = svg.append('g')
    .attr('transform', `translate(${width + margin.left + 20}, ${margin.top})`);

const legendData = [
    { color: 'blue', label: 'Donation' },
    { color: 'orange', label: 'Receipt' }
];

legend.selectAll('.legend-item')
    .data(legendData)
    .join('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(0, ${i * 20})`)
    .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', d => d.color);

legend.selectAll('.legend-item')
    .append('text')
        .attr('x', 25)
        .attr('y', 15) 
        .text(d => d.label)
        .style('font-size', '12px');
  
return svg.node();
}


function _15(md){return(
md`### Visualization 2:`
)}

function _16(d3,aiddata,geoJSON)
{
const donorTotal = d3.rollup(aiddata, 
  v => d3.sum(v, d => d.amount),
  d => d.donor
);

const receiveTotal = d3.rollup(aiddata, 
  v => d3.sum(v, d => d.amount),
  d => d.recipient
);

const combinedTotals = Array.from(receiveTotal, ([recipient, receiveAmount]) => {
  return {
    country: recipient,
    receiveAmount: (receiveAmount / (receiveAmount + (donorTotal.get(recipient) || 0))) * 100,
    donorAmount: 100 - ((receiveAmount / (receiveAmount + (donorTotal.get(recipient) || 0))) * 100)
  };
});

const donorColorScale = d3.scaleQuantize()
  .domain([0, 100])
  .range(['#85c1e9 ', '#5dade2 ', '#3498db', '#2e86c1']); 

const receiveColorScale = d3.scaleQuantize()
  .domain([0, 100])
  .range(['#fad7a0 ', '#f8c471', '#f5b041', '#f39c12']); 

const zeroColor = '#d9d9d9';

const width = 1000;
const height = 500;
const margin = { top: 40, right: 150, bottom: 40, left: 150 };
  
const svg = d3.create('svg')
  .attr('width', width)
  .attr('height', height);

const worldOutline = d3.geoGraticule().outline()
  
const projection = d3.geoEqualEarth().fitSize([width, height], worldOutline)
const path = d3.geoPath().projection(projection);
  
svg.selectAll('path')
    .data(geoJSON.features)
    .join('path')
      .attr('d', path)
      .attr('fill', d => {
        const countryData = combinedTotals.find(country => d.properties.NAME.includes(country.country) || country.country.includes(d.properties.FORMAL_EN));
        const donorAmount = countryData?.donorAmount || 0;
        return donorAmount === 0 ? zeroColor : donorColorScale(donorAmount);
        })
      .attr('stroke', 'white');

svg.append("g")
    .selectAll("circle")
    .data(geoJSON.features)
    .join("circle")
      .attr("r", d => {
        const countryData = combinedTotals.find(country => d.properties.NAME.includes(country.country) || country.country.includes(d.properties.FORMAL_EN));
        const receiveAmount = countryData?.receiveAmount || 0;
        return receiveAmount === 0 ? 0 : 3;
        })
      .attr("fill-opacity", 1)
      .attr("transform", d => `translate(${path.centroid(d)})`)
      .attr("fill", d => {
        const countryData = combinedTotals.find(country => d.properties.NAME.includes(country.country) || country.country.includes(d.properties.FORMAL_EN));
        const receiveAmount = countryData?.receiveAmount || 0;
        return receiveAmount === 0 ? zeroColor : receiveColorScale(receiveAmount);
        });
  
  svg.append('path')
    .attr('d', path(worldOutline))
    .attr('stroke', 'lightgray')
    .attr('fill', 'none');

const legendGroup = svg.append('g')
  .attr('transform', `translate(${width - margin.right + 20}, ${margin.top})`);

legendGroup.append('text')
  .attr('x', 140 - width)
  .attr('y', 170)
  .text('Donation Ratio(%)')
  .style('font-size', '14px')
  .style('font-weight', 'bold');
  
const legendData = [
  { color: zeroColor, label: '0' },
  { color: '#85c1e9', label: '1-25' },
  { color: '#5dade2', label: '26-50' },
  { color: '#3498db', label: '51-75' },
  { color: '#2e86c1', label: '76-100' }
];

const legendRectSize = 20;
const legendSpacing = 5;

legendGroup.selectAll('rect')
  .data(legendData)
  .join('rect')
    .attr('x', 150 - width)
    .attr('y', (d, i) => i * (legendRectSize + legendSpacing) + 175)
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .attr('fill', d => d.color);

legendGroup.selectAll('text.legend-label')
  .data(legendData)
  .join('text')
    .attr('class', 'legend-label')
    .attr('x', legendRectSize + 160 - width)
    .attr('y', (d, i) => i * (legendRectSize + legendSpacing) + legendRectSize / 1.5 + 175)
    .text(d => d.label)
    .style('font-size', '12px')
    .attr('alignment-baseline', 'middle');

const legendGroupCircles = svg.append('g')
  .attr('transform', `translate(${width - margin.right + 20}, ${margin.top + 200})`);

legendGroupCircles.append('text')
  .attr('x', 140 - width)
  .attr('y', 111)
  .text('Receipt Ratio(%)')
  .style('font-size', '14px')
  .style('font-weight', 'bold');

const legendDataR = [
  { color: zeroColor, label: '0' },
  { color: '#fad7a0', label: '1-25' },
  { color: '#f8c471', label: '26-50' },
  { color: '#f5b041', label: '51-75' },
  { color: '#f39c12', label: '76-100' }
];

legendGroupCircles.selectAll('rect')
  .data(legendDataR)
  .join('rect')
    .attr('x', 150 - width)
    .attr('y', (d, i) => i * (legendRectSize + legendSpacing) + 120)
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .attr('fill', d => d.color);

legendGroupCircles.selectAll('text.legend-label')
  .data(legendDataR)
  .join('text')
    .attr('class', 'legend-label')
    .attr('x', legendRectSize + 160 - width)
    .attr('y', (d, i) => i * (legendRectSize + legendSpacing) + legendRectSize / 1.5 + 120)
    .text(d => d.label)
    .style('font-size', '12px')
    .attr('alignment-baseline', 'middle');

return svg.node()
}


function _17(md){return(
md`-----------------
## Appendix`
)}

function _d3(require){return(
require('d3@7')
)}

function _googleSheetCsvUrl(){return(
'https://docs.google.com/spreadsheets/d/18PAh9jNB6bo-jz0HfpAZwpwbUu0cXoxwZBZSP0oDVvM/gviz/tq?tqx=out:csv'
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["countries-50m.json", {url: new URL("./files/55260abbc777c0a3b8fed19f3929dd822fef9d5118b53b76b2176d20782910e599eac919999ea8ee85a60b783fd37082574f6591fd46c0d70ddf9b00df71ce27.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["Inputs","aiddata"], _3);
  main.variable(observer("aiddata")).define("aiddata", ["d3","googleSheetCsvUrl"], _aiddata);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("geoJSON")).define("geoJSON", ["FileAttachment"], _geoJSON);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  main.import("swatches", child1);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["d3","aiddata"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["d3","aiddata","geoJSON"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("googleSheetCsvUrl")).define("googleSheetCsvUrl", _googleSheetCsvUrl);
  return main;
}
