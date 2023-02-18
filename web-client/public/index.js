const result = [];

const item = document.createElement("p");
const values = document.createElement("span");
const meter = document.createElement("meter");

meter.min = 0;
meter.max = 50;
meter.value = (50 - fitness(result)).toFixed(2);
meter.style.width = "100%";
meter.style.height = "100%";
values.innerText = `${result.result.join(" ")}: ${50 - result.fitness}`;

item.style.display = "grid";
item.style.gridTemplateColumns = "5em 1fr";
item.style.columnGap = "1em";

item.appendChild(meter);
item.appendChild(values);
document.querySelector("main").appendChild(item);
