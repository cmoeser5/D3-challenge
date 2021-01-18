# Health Risk Analysis with D3

## Background
Analyzed the health risks facing particular demographics with the dataset provided by creating charts, graphs and interactive elements. The dataset used is from the U.S. Census Bureau is based on the 2014 ACS (American Community Survey) and included data on rates of income, obesity, poverty, smoking, age and lack of healthcare.

## Technologies Used
* JavaScript
* D3
* HTML

### Static Image of Scatter Plot
Created dynamic scatter plot that represents each state with circle elements. The plot includes additional labels and has click elements so users can decide which data to display. The plot also includes animation transitions for the circles' locations as well as the range of axes.

![static image](images/scatter_plot.png)

### Dynamic Scatter Plot
![dynamic image](images/scatter_plot.gif)

## Conclusions
* States with higher rates of poverity tend to higher rates of residents with no healthcare and higher rates of obesity
* The median age of residents without healthcare is lower in states that have a higher percentage of residents without healthcare.
* States with a higher obesity percentage tend to have a lower median household income.

Deployed link: https://cmoeser5.github.io/Health-Risk-Analysis/

To visualize different data views, please select from the various headings of Poverty, Age, Household Income, Obesity, Smokers, and Without Healthcare. Each selection shifts the State data represented in circles on the graph. The small circles can then be selected or hovered over to view the specific values for that state.

This data is older, 2014, but still relevant in demonstrating relatedness to the markers being measured. You can see that when selecting poverty and absence of healthcare you find two extremes. Texas, at the top of the graph, having a poverty rate of 17.2 % with 24.9 % without healthcare and Massechusetts having a poverty rate of 11.6 % but 4% rate without healthcare. In 2006, Massechusetts healthcare reform was passed into law with the aim to provide coverage to 100% of it's residents. It would be interesting to find the poverty level in Massechusetts prior to 2006, to see if this coverage helped improve the rate of poverty there.

If you shift the view again, selecting age instead of poverty, you will note that the majority of those without healthcare are in the 35 - 45 age range. But you will also find, that selection of obesity and smokers doesn't shift the average age range by much at all!
