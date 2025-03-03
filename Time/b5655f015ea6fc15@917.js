import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`# Mini-Project 2 (Time)`
)}

function _2(md){return(
md`## Data

Here we load a [simplified and reduced version](https://docs.google.com/spreadsheets/d/1YiuHdfZv_JZ-igOemKJMRaU8dkucfmHxOP6Od3FraW8/) of the [AidData dataset](https://www.aiddata.org/data/aiddata-core-research-release-level-1-3-1). You are free to change this code as you wish. If you don't want to preprocess your data on Observable, then you can do the preprocessing using whatever languages or tools you'd like and then [upload](/@observablehq/file-attachments) your preprocessed data to Observable. If you take this approach, then you should delete the \`aiddata\` cell below so that you're not loading unnecessary data.

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
    amount: +row.commitment_amount_usd_constant,
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

Your goal is to create 3 independent visualizations of the same data set, each one with the intent of answering the questions stated below. For each numbered visualization, you should be able to create a data visualization that answers **all of the questions** specified. These are the 3 visualizations you should create:

- **Visualization 1:** 

  Q1) How does the amount donated vs. amount received change over time for each country? **(10 points)**
  
  Q2) Are there countries that mostly send or mostly receive and countries that have a similar amount of donations they receive and send? **(10 points)** 
  
  Q3) Are there countries that change their role over time? That is, they used to mostly send donations and turn into mostly receiving donations and vice-versa? **(10 points)**
  
  Q4) Are there countries in which you can find a sudden increase ("peak") or a sudden decrease ("valley")? **(10 points)**

  Aesthetics and Clarity **(10 points)**

- **Visualization 2:** 

  Q1) Focus on the top 10 “Coalesced Purposes” of donations (in terms of amount of disbursement across all countries and all time).   **(20 points)**
  
  Q2) What are the top 10 purposes of disbursements (in terms of total amount of disbursement) and how does their relative amount compare over time? E.g., are there purposes that tend to be prominent for a period of time and others that become more prominent during other periods?  **(20 points)**
  
  Hint: looking at the graph one should be able to observe: “Ah! During these years donations were mostly about X but then there were way more donations about Y”. Note: if the purpose is “UNSPECIFIED” it should be removed.

  Aesthetics and Clarity **(10 points)**

- **[OPTIONAL/EXTRA POINTS] Visualization 3:**  **(20 points)**

  Q1) Focusing exclusively on countries that receive donations, how do donations shift geographically over time? 
  
  Q2) Do donations tend to be always in the same regions of the world over the years or they have been shifting over time? 
  
  Q3) Can you build a visualization that shows the “history of donations” so that one can get a sense of which regions of the world have had more need for donations over the years? 

  Note 1: for this visualization you can, if you wish, use interaction (but you don’t have to).

** Note: ** 

  - For this exercise you may want to review the lecture on geographical visualization in which we explain how you can visualize geographical data over time. 
  - If you want, you can aggregate data over a few years (say, group together data at 5 year intervals).

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
  - Review this [notebook on clarity](/@nyuinfovis/contextual-elements-aesthetics-and-clarity) for reference.`
)}

function _12(md){return(
md`# Solutions:`
)}

function _13(md){return(
md`## **Visualization 1**
To display the pattern changes over time and identify peaks and valleys, a line chart is the best choice. Based on this, to explore the changing roles of countries, we need two lines representing donations and receipts for each country. However, due to the large number of countries and their complex donation patterns, displaying all countries in a single chart would make it overly complex. Therefore, I decided to divide the countries into smaller charts, making it easier to explore the donation patterns of each individual country.`
)}

function _14(Swatches,d3){return(
Swatches(d3.scaleOrdinal(["Donation", "Receipt"], ['blue','orange']))
)}

function _15(donateData,d3,width,height,margin,dateExtent,recipientData,numCols,col,row,line,xAxis,yAxis)
{
  const donationMap = new Map(donateData.map(d => [d.country, d.rates]));
  
  const svg = d3.create('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('font-family', 'sans-serif');

  const format = d3.timeFormat('%B %Y');
  svg.append('text')
      .attr('y', margin.top - 10)
      .text(`Donation vs Receipt (Billion $), ${format(dateExtent[0])} - ${format(dateExtent[1])}`);

  const cells = svg.selectAll('g')
    .data(recipientData)
    .join('g')
      .attr('transform', (d, i) => {
        const r = Math.floor(i / numCols);
        const c = i % numCols;
        return `translate(${col(c)}, ${row(r)})`;
      });
  
  cells.append('path')
      .attr('d', d => line(d.rates))
      .attr('stroke', 'orange')
      .attr('fill', 'none');

cells.append('path')
    .attr('d', d => {
      const donationRates = donationMap.get(d.country);
      return donationRates ? line(donationRates) : null;
    })
    .attr('stroke', 'blue')
    .attr('fill', 'none');
  
  cells.append('text')
      .attr('font-size', 10)
      .attr('dominant-baseline', 'middle')
      .attr('x', 0)
      .attr('y', 15)
      .text(d => d.country)
  
  const xAxes = cells.append('g')
      .attr('transform', d => `translate(0,${row.bandwidth()})`)
      .call(xAxis)
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('line').attr('stroke', '#c0c0c0'));

  xAxes.filter((d, i) => i < recipientData.length - numCols)
    .selectAll('text')
    .remove();

  const yAxes = cells.append('g')
      .call(yAxis)
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('line').attr('stroke', '#c0c0c0'));

  yAxes.filter((d, i) => i % numCols !== 0)
    .selectAll('text')
    .remove();
  
  return svg.node();
}


function _16(md){return(
md`## Visulization 2
This visualization also aims to display pattern changes over time and identify peaks and valleys, so using a line chart is still a good choice. Unlike the previous visualization, where there were many countries, this time we only have ten purposes to show. Therefore, the best way to compare them is to put them in the same chart.`
)}

function _17(Swatches,d3,top10Purposes){return(
Swatches(d3.scaleOrdinal(top10Purposes, d3.schemeCategory10))
)}

function _18(width,d3,dateExtent,maxAmount,top10Purposes,purposeRecords)
{
  const margin = {top: 10, right: 30, bottom: 20, left: 40};
  const visWidth = width - margin.left - margin.right;
  const visHeight = 500 - margin.top - margin.bottom;
  
  const svg = d3.create('svg')
      .attr('width', visWidth + margin.left + margin.right)
      .attr('height', visHeight + margin.top + margin.bottom);

  const format = d3.timeFormat('%B %Y');
  svg.append('text')
      .attr('y', margin.top + 10)
      .attr('x', width / 3)
      .text(`Top10 Donation purposes, ${format(dateExtent[0])} - ${format(dateExtent[1])}`);

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const x = d3.scaleTime()
      .domain([dateExtent[0], dateExtent[1]])
      .range([0, visWidth]);
  
  const y = d3.scaleLinear()
      .domain([0, maxAmount / 1000000000]).nice()
      .range([visHeight, 0]);
  
  const xAxis = d3.axisBottom(x);
  
  const yAxis = d3.axisLeft(y);
  
  g.append('g')
      .attr('transform', `translate(0,${visHeight})`)
      .call(xAxis);
  
  g.append('g')
      .call(yAxis)
      .call(g => g.selectAll('.domain').remove())
    .append('text')
      .attr('text-anchor', 'start')
      .attr('dominant-baseline', 'middle')
      .attr('fill', 'black')
      .attr('x', 5)
      .text('Donation (Billion $)');
  
  const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.amount / 1000000000));

  const color = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(top10Purposes);
  
  const series = g.selectAll('.series')
    .data(purposeRecords)
    .join('g')
      .attr('stroke', ([purpose]) => color(purpose))
      .attr('class', 'series')
    .append('path')
      .datum(([purpose, amount]) => amount)
      .attr('fill', 'none')
      .attr('stroke-width', 1)
      .attr('d', line);
  
  return svg.node();
}


function _19(md){return(
md`## Visulization 3
If we want to answer the question "How do donations shift geographically over time?", a Geomap is necessary for this visualization. However, if we want to observe donations from different times, I think a single Geomap cannot clearly display the information. Therefore, I believe the best way is to use interaction, which allows users to switch between decades, changing the color depths on the map to represent donation amounts.`
)}

function _20(md){return(
md`### Receipt By decades (70s - 10s)`
)}

function _decadeFeature(Inputs,decades){return(
Inputs.radio(
  decades, 
  { value: decades[0], label: 'Decade Selector' }
)
)}

function _22(d3,geoJSON,updateReceiveDataByDecade)
{  
  const width = 1000;
  const height = 500;
  const margin = { top: 40, right: 150, bottom: 40, left: 150 };

  const receiveColorScale = d3.scaleQuantize()
    .domain([0, 100])
    .range(['#fad7a0 ', '#f8c471', '#f5b041', '#f39c12']); 
  
  const zeroColor = '#d9d9d9';
    
  const svg = d3.create('svg')
    .attr('width', width)
    .attr('height', height);
  
  const worldOutline = d3.geoGraticule().outline();
  const projection = d3.geoEqualEarth().fitSize([width, height], worldOutline);
  const path = d3.geoPath().projection(projection);
  
  svg.selectAll('path')
      .data(geoJSON.features)
      .join('path')
      .attr('d', path)
      .attr('fill', d => {
        const countryData = updateReceiveDataByDecade.get(d.properties.NAME) || 0;
        return countryData === 0 ? zeroColor : receiveColorScale(countryData / 100000000);
      })
      .attr('stroke', 'white');

  svg.append('path')
    .attr('d', path(worldOutline))
    .attr('stroke', 'lightgray')
    .attr('fill', 'none');
  
  const legendGroup = svg.append('g')
    .attr('transform', `translate(${width - margin.right + 20}, ${margin.top})`);
  
  legendGroup.append('text')
    .attr('x', 140 - width)
    .attr('y', 170)
    .text('Receipt (100 million $)')
    .style('font-size', '14px')
    .style('font-weight', 'bold');

  const legendDataR = [
    { color: zeroColor, label: '0' },
    { color: '#fad7a0', label: '1-25' },
    { color: '#f8c471', label: '26-50' },
    { color: '#f5b041', label: '51-75' },
    { color: '#f39c12', label: '76+' }
  ];
  
  const legendRectSize = 20;
  const legendSpacing = 5;

  legendGroup.selectAll('rect')
    .data(legendDataR)
    .join('rect')
      .attr('x', 150 - width)
      .attr('y', (d, i) => i * (legendRectSize + legendSpacing) + 180)
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .attr('fill', d => d.color);
  
  legendGroup.selectAll('text.legend-label')
    .data(legendDataR)
    .join('text')
      .attr('class', 'legend-label')
      .attr('x', legendRectSize + 160 - width)
      .attr('y', (d, i) => i * (legendRectSize + legendSpacing) + legendRectSize / 1.5 + 180)
      .text(d => d.label)
      .style('font-size', '12px')
      .attr('alignment-baseline', 'middle');
  
  return svg.node();
}


function _23(md){return(
md`## Visualization 1 Workspace:`
)}

function _recData(aiddata){return(
aiddata.reduce((acc, curr) => {
  if (!acc[curr.recipient]) {
    acc[curr.recipient] = [];
  }
  const existingEntry = acc[curr.recipient].find(entry => new Date(entry.yearDate).getFullYear() === new Date(curr.yearDate).getFullYear());
  if (existingEntry) {
    existingEntry.amount += curr.amount;
  } else {
    acc[curr.recipient].push({ yearDate: curr.yearDate, amount: curr.amount });
  }
  acc[curr.recipient].sort((a, b) => new Date(a.yearDate) - new Date(b.yearDate));
  return acc;
}, {})
)}

function _donData(aiddata){return(
aiddata.reduce((acc, curr) => {
  if (!acc[curr.donor]) {
    acc[curr.donor] = [];
  }
  const existingEntry = acc[curr.donor].find(entry => new Date(entry.yearDate).getFullYear() === new Date(curr.yearDate).getFullYear());
  if (existingEntry) {
    existingEntry.amount += curr.amount;
  } else {
    acc[curr.donor].push({ yearDate: curr.yearDate, amount: curr.amount });
  }
  acc[curr.donor].sort((a, b) => new Date(a.yearDate) - new Date(b.yearDate));
  return acc;
}, {})
)}

function _recipientData(recData){return(
Object.keys(recData).map(country => {
  const records = recData[country];
  const totalAmount = records.reduce((sum, entry) => sum + entry.amount, 0);
  const average = totalAmount / records.length;
  return {
    country: country,
    rates: records.map(entry => ({ date: entry.yearDate, rate: entry.amount / 1000000000 })),
    average: average
  };
})
)}

function _donateData(donData){return(
Object.keys(donData).map(country => {
  const records = donData[country];
  const totalAmount = records.reduce((sum, entry) => sum + entry.amount, 0);
  const average = totalAmount / records.length;
  return {
    country: country,
    rates: records.map(entry => ({ date: entry.yearDate, rate: entry.amount / 1000000000 })),
    average: average
  };
})
)}

function _countries(recipientData){return(
recipientData.map(d => d.country)
)}

function _margin(){return(
{ top: 30, bottom: 50, right: 10, left: 30 }
)}

function _height(){return(
750
)}

function _allDates(aiddata){return(
aiddata.map(entry => new Date(entry.yearDate))
)}

function _dateExtent(d3,allDates){return(
d3.extent(allDates)
)}

function _numRows(){return(
7
)}

function _numCols(recipientData,numRows){return(
Math.ceil(Object.keys(recipientData).length / numRows)
)}

function _row(d3,numRows,margin,height){return(
d3.scaleBand()
    .domain(d3.range(numRows))
    .range([margin.top, height - margin.bottom])
    .padding(0.05)
)}

function _col(d3,numCols,margin,width){return(
d3.scaleBand()
    .domain(d3.range(numCols))
    .range([margin.left, width - margin.right])
    .padding(0.1)
)}

function _x(d3,dateExtent,col){return(
d3.scaleTime()
    .domain(dateExtent)
    .range([0, col.bandwidth()])
)}

function _maxRate(d3,donateData){return(
d3.max(donateData, state => d3.max(state.rates, d => d.rate))
)}

function _y(d3,maxRate,row){return(
d3.scaleLinear()
    .domain([0, maxRate])
    .range([row.bandwidth(), 0])
)}

function _line(d3,x,y){return(
d3.line()
  .x(d => x(d.date))
  .y(d => y(d.rate))
  .defined(d => d.rate !== null)
)}

function _xAxis(d3,x){return(
d3.axisBottom(x)
  .tickSizeOuter(0)
  .ticks(4, "'%y")
)}

function _yAxis(d3,y){return(
d3.axisLeft(y)
  .tickSizeOuter(0)
  .ticks(4)
)}

function _Swatches(d3,htl){return(
function Swatches(color, {
  columns = null,
  format,
  unknown: formatUnknown,
  swatchSize = 15,
  swatchWidth = swatchSize,
  swatchHeight = swatchSize,
  marginLeft = 0
} = {}) {
  const id = `-swatches-${Math.random().toString(16).slice(2)}`;
  const unknown = formatUnknown == null ? undefined : color.unknown();
  const unknowns = unknown == null || unknown === d3.scaleImplicit ? [] : [unknown];
  const domain = color.domain().concat(unknowns);
  if (format === undefined) format = x => x === unknown ? formatUnknown : x;

  function entity(character) {
    return `&#${character.charCodeAt(0).toString()};`;
  }

  if (columns !== null) return htl.html`<div style="display: flex; align-items: center; margin-left: ${+marginLeft}px; min-height: 33px; font: 10px sans-serif;">
  <style>

.${id}-item {
  break-inside: avoid;
  display: flex;
  align-items: center;
  padding-bottom: 1px;
}

.${id}-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - ${+swatchWidth}px - 0.5em);
}

.${id}-swatch {
  width: ${+swatchWidth}px;
  height: ${+swatchHeight}px;
  margin: 0 0.5em 0 0;
}

  </style>
  <div style=${{width: "100%", columns}}>${domain.map(value => {
    const label = `${format(value)}`;
    return htl.html`<div class=${id}-item>
      <div class=${id}-swatch style=${{background: color(value)}}></div>
      <div class=${id}-label title=${label}>${label}</div>
    </div>`;
  })}
  </div>
</div>`;

  return htl.html`<div style="display: flex; align-items: center; min-height: 33px; margin-left: ${+marginLeft}px; font: 10px sans-serif;">
  <style>

.${id} {
  display: inline-flex;
  align-items: center;
  margin-right: 1em;
}

.${id}::before {
  content: "";
  width: ${+swatchWidth}px;
  height: ${+swatchHeight}px;
  margin-right: 0.5em;
  background: var(--color);
}

  </style>
  <div>${domain.map(value => htl.html`<span class="${id}" style="--color: ${color(value)}">${format(value)}</span>`)}</div>`;
}
)}

function _44(md){return(
md`## Visualization 2 Workspace:`
)}

function _top10PurposeAmountArray(d3,aiddata){return(
Array.from(
  d3.rollup(
    aiddata.filter(d => d.purpose !== "Sectors not specified"),
    v => d3.sum(v, d => d.amount),
    d => d.purpose
  ),
  ([purpose, amount]) => ({ purpose, amount })
)
.sort((a, b) => d3.descending(a.amount, b.amount))
.slice(0, 10)
)}

function _top10Purposes(top10PurposeAmountArray,d3){return(
top10PurposeAmountArray
  .sort((a, b) => d3.descending(a.amount, b.amount))
  .slice(0, 10)
  .map(d => d.purpose)
)}

function _top10PurposeRecords(aiddata,top10Purposes){return(
aiddata
  .filter(d => top10Purposes.includes(d.purpose))
  .map(d => ({ purpose: d.purpose, amount: d.amount, date: d.yearDate }))
)}

function _dateMergedRecords(top10PurposeRecords){return(
top10PurposeRecords.reduce((acc, current) => {
  const existing = acc.find(
    item => item.date.getTime() === current.date.getTime() && item.purpose === current.purpose
  );
  if (existing) {
    existing.amount += current.amount;
  } else {
    acc.push({ ...current });
  }
  return acc;
}, [])
)}

function _sortedRecords(dateMergedRecords){return(
dateMergedRecords.sort((a, b) => new Date(a.date) - new Date(b.date))
)}

function _purposeRecords(sortedRecords){return(
sortedRecords.reduce((map, record) => {
  const { purpose, amount, date } = record;
  if (!map.has(purpose)) {
    map.set(purpose, []);
  }
  map.get(purpose).push({ symbol: purpose, amount: amount, date: date });
  return map;
}, new Map())
)}

function _maxAmount(d3,sortedRecords){return(
d3.max(sortedRecords, d => d.amount)
)}

function _52(md){return(
md`## Visualization 3 Workspace:`
)}

function _decades(aiddata){return(
Array.from(new Set(aiddata.map(d => Math.floor(d.yearInt / 10) * 10))).sort()
)}

function _updateReceiveDataByDecade(d3,aiddata,decadeFeature){return(
d3.rollup(
      aiddata.filter(d => Math.floor(d.yearInt / 10) * 10 === decadeFeature),
      v => d3.sum(v, d => d.amount),
      d => d.recipient
    )
)}

function _totalAmount(updateReceiveDataByDecade){return(
Array.from(updateReceiveDataByDecade.values()).reduce((sum, value) => sum + value, 0)
)}

function _56(md){return(
md`-----------------
## Appendix`
)}

function _d3(require){return(
require('d3@7')
)}

function _googleSheetCsvUrl(){return(
'https://docs.google.com/spreadsheets/d/1YiuHdfZv_JZ-igOemKJMRaU8dkucfmHxOP6Od3FraW8/gviz/tq?tqx=out:csv'
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
  main.variable(observer()).define(["Swatches","d3"], _14);
  main.variable(observer()).define(["donateData","d3","width","height","margin","dateExtent","recipientData","numCols","col","row","line","xAxis","yAxis"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["Swatches","d3","top10Purposes"], _17);
  main.variable(observer()).define(["width","d3","dateExtent","maxAmount","top10Purposes","purposeRecords"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("viewof decadeFeature")).define("viewof decadeFeature", ["Inputs","decades"], _decadeFeature);
  main.variable(observer("decadeFeature")).define("decadeFeature", ["Generators", "viewof decadeFeature"], (G, _) => G.input(_));
  main.variable(observer()).define(["d3","geoJSON","updateReceiveDataByDecade"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer("recData")).define("recData", ["aiddata"], _recData);
  main.variable(observer("donData")).define("donData", ["aiddata"], _donData);
  main.variable(observer("recipientData")).define("recipientData", ["recData"], _recipientData);
  main.variable(observer("donateData")).define("donateData", ["donData"], _donateData);
  main.variable(observer("countries")).define("countries", ["recipientData"], _countries);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("allDates")).define("allDates", ["aiddata"], _allDates);
  main.variable(observer("dateExtent")).define("dateExtent", ["d3","allDates"], _dateExtent);
  main.variable(observer("numRows")).define("numRows", _numRows);
  main.variable(observer("numCols")).define("numCols", ["recipientData","numRows"], _numCols);
  main.variable(observer("row")).define("row", ["d3","numRows","margin","height"], _row);
  main.variable(observer("col")).define("col", ["d3","numCols","margin","width"], _col);
  main.variable(observer("x")).define("x", ["d3","dateExtent","col"], _x);
  main.variable(observer("maxRate")).define("maxRate", ["d3","donateData"], _maxRate);
  main.variable(observer("y")).define("y", ["d3","maxRate","row"], _y);
  main.variable(observer("line")).define("line", ["d3","x","y"], _line);
  main.variable(observer("xAxis")).define("xAxis", ["d3","x"], _xAxis);
  main.variable(observer("yAxis")).define("yAxis", ["d3","y"], _yAxis);
  main.variable(observer("Swatches")).define("Swatches", ["d3","htl"], _Swatches);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer("top10PurposeAmountArray")).define("top10PurposeAmountArray", ["d3","aiddata"], _top10PurposeAmountArray);
  main.variable(observer("top10Purposes")).define("top10Purposes", ["top10PurposeAmountArray","d3"], _top10Purposes);
  main.variable(observer("top10PurposeRecords")).define("top10PurposeRecords", ["aiddata","top10Purposes"], _top10PurposeRecords);
  main.variable(observer("dateMergedRecords")).define("dateMergedRecords", ["top10PurposeRecords"], _dateMergedRecords);
  main.variable(observer("sortedRecords")).define("sortedRecords", ["dateMergedRecords"], _sortedRecords);
  main.variable(observer("purposeRecords")).define("purposeRecords", ["sortedRecords"], _purposeRecords);
  main.variable(observer("maxAmount")).define("maxAmount", ["d3","sortedRecords"], _maxAmount);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("decades")).define("decades", ["aiddata"], _decades);
  main.variable(observer("updateReceiveDataByDecade")).define("updateReceiveDataByDecade", ["d3","aiddata","decadeFeature"], _updateReceiveDataByDecade);
  main.variable(observer("totalAmount")).define("totalAmount", ["updateReceiveDataByDecade"], _totalAmount);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("googleSheetCsvUrl")).define("googleSheetCsvUrl", _googleSheetCsvUrl);
  return main;
}
