var margin = { top: 20, right: 40, bottom: 30, left: 60 };
var width =
  document.getElementsByClassName("chart")[0].clientWidth -
  margin.left -
  margin.right;
var height = 400 - margin.top - margin.bottom;

var svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", width + margin.left + margin.right-600)
    .style("border", "1px solid red")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var svg2 = d3
    .select(".chart2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("border", "1px solid red")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//bar chart + INFO
const svg1 = d3
    .select(".chart1")
    .append("svg")
    .attr("width", width + margin.left + margin.right-450)
    .attr("height", height + margin.top + margin.bottom+20)
    .style("background-color", "#DCDCDC")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .append("g")
    .attr("class","graph3");

var linegraph = d3
    .select(".PeopleLineGraph")
    .append("svg")
    .attr("width", width + margin.left + margin.right+80)
    .attr("height", height + margin.top + margin.bottom-200)
    .style("border", "1px solid red")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var keys_resp=  ["philosophy", "people", "religion","general"];
var keys = ["philosophy", "people", "religion","general"];
var array_data_search = {
    philosophy: {
        pWille: /\b[Ww]ille\w+/gi,
        pDing: /\bDing an sich\w+/gi,
        pWahr: /\b[Ww]ahrheit\w+/gi,
        pTragische: /\b[Tt]ragi\w+/gi,
        pLeiden: /\b[Ll]eiden\w+/gi
    },
    people: {
        pSchop: /\b[Ss]chopenhauer\w+/gi,
        pWagn: /\b[Ww]agner\w+/gi,
        pKant: /\b[Kk]ant\w+/gi
    },
    religion: {
        pHindu: /\b[Hh]indus\w+/gi,
        pVedanta: /\b[Vv]eda\w+/gi,
        pBudd: /\b[Bb]uddhis\w+/gi,
        pSchleier: /\bSchleier\w+/gi
    },
    general: {
        pDeutsch: /\b[Dd]eutsch\w+/gi,
        pMusik: /\b[Mm]usik\w+/gi
    }
};


var colorScale = {
    philosophy: "#087F8C",
    people: "#E12179",
    religion: "#BB9F06",
    general: "#8F8F8F"
}
var colorScaleSub = { 
    pWille:"#087F8C",
    pDing:"#087F8C",
    pWahr:"#087F8C",
    pTragische:"#087F8C",
    pLeiden:"#087F8C",
    pSchop:"#E12179",
    pWagn:"#E12179",
    pKant:"#E12179",
    pHindu: "#BB9F06",
    pVedanta: "#BB9F06",
    pBudd: "#BB9F06",
    pSchleier: "#BB9F06",
    pDeutsch: "#8F8F8F",
    pMusik  : "#8F8F8F"
}

var dataGraph = [];
var dataRex = [];
var dataFragment = [];
var maxTotal = 0;
var uTotal = 0;
var groupT = 0;

d3.json("data.json").then(function(data){
    // ecmascript6 6
    var years = Object.keys(data); 

    d3.select(".fragmentTitle").append("text")
                .html("<p>YEAR:<b>"+1869+"</b> | GROUP:<b>"+data[1869][0].group+"</b> | SEASON:<b>"+data[1869][0].season +"</b></p>")
                .style("color","red")
    data[1869][0].fragments.forEach(function(fragment){
        d3.select(".fragmentText").append("div").html(fragment)
    })

    years.forEach(function(year){

        
        var uDataGraph = {};
        var udataRex ={};
        
        uDataGraph.year = new Date(year, 0, 1);
        udataRex.year = new Date(year, 0, 1);        

        keys.forEach(function(key) {
            var keys_search = Object.keys(array_data_search[key])
            keys_search.forEach(function(keys) {
                var i = 0;
                eval("number_founds_year_"+keys+"="+i);
            })
        });
        console.log("data year-"+ year +" :", data[year])
        /*Bucle para agregar el año a cada fragmento y agregarlo en la dataFragment para mostrarlo despues*/
        data[year].forEach(function(data_year){
            data_year.year = year
            dataFragment.push(data_year)
        })

        /*******************************************************************/
        keys.forEach(function(key){      
            var number_founds_year = 0;
            data[year].forEach(function(data_year){
                groupT += 1
                data_year.fragments.forEach(function(fragment){
                    var keys_search = Object.keys(array_data_search[key]);
                    keys_search.forEach(function(key_search){
                        var regex = array_data_search[key][key_search];
                        var a_search=fragment.match(regex);                       
                        if(a_search != null){
                            //console.log(year+"_"+key+"_"+key_search, a_search);
                            number_founds_year+=a_search.length
                            //Bucle para sumar los datos de los subgrupos de "array_data_search"
                            keys.forEach(function(ky) {
                                var keys_sr = Object.keys(array_data_search[ky])
                                keys_sr.forEach(function(kys) {
                                    if(key_search === kys){
                                        eval("number_founds_year_"+kys+"+="+a_search.length);
                                    }
                                });
                            });
                        };                                 
                    });
                });   
            });
            uDataGraph[key] = number_founds_year; 
            // uDataGraph[key] = Math.floor(Math.random() * 100);
        });
        //Bucle para pintar el boton
        keys.forEach(function(key) {
            var keys_search = Object.keys(array_data_search[key])
            keys_search.forEach(function(keys) {
                udataRex[keys] = eval("number_founds_year_"+keys);

                d3.selectAll(".btn-"+keys).style("color","white")
                    .style("background-color",colorScaleSub[keys])
                    .style("border", "1px solid"+colorScaleSub[keys])
                    .style("margin","5px 5px 5px 5px")
                    .style("display","inline-block")
                    .style("opacity",0.5)
                    .on("click", function() {
                        d3.selectAll(".btChart").style("opacity",0.5)
                        d3.selectAll(".btn-"+keys).style("opacity",1)
                    })
            })
        });
        
        // total data 
        uTotal = uDataGraph.philosophy + uDataGraph.people + uDataGraph.religion + uDataGraph.general;
        if(maxTotal < uTotal) maxTotal=uTotal;
        
        dataRex.push(udataRex);
        dataGraph.push(uDataGraph);
        
    });

    
    var xScale = d3.scaleLinear()
                    .domain([dataGraph[0].year, dataGraph[dataGraph.length-1].year])
                    .range([0, width]);

    var yScale = d3.scaleLinear()
                    .domain([0, maxTotal])
                    .range([height, 0]);
    
    var areaGen = d3.area()
                    .x((d) => xScale(d.data.year))
                    .y0((d) => yScale(d[0]))
                    .y1((d) => yScale(d[1])).curve(d3.curveCatmullRom.alpha(0.5));

    var areaGen2 = d3.area()
                    .x((d) => xScale(d.data.year))
                    .y0((d) => yScale(d[0]))
                    .y1((d) => yScale(d[1]));;

    var stackGen = d3.stack()
                    .keys(keys)
                    .offset(d3.stackOffsetSilhouette)
                    .order(d3.stackOrderNone);
    var stackedSeries = stackGen(dataGraph);
    var z = d3.interpolateCool

    console.log("dataGraph", dataGraph);
    console.log("data del regex", dataRex);
    console.log("data del Fragment", dataFragment);

    svg.append("g")
        .attr("class","graph1")
        .selectAll(".areas")
        .data(stackedSeries)
        .join("path")
        .attr("d", areaGen)
        .attr("fill", (d) => colorScale[d.key]);

    svg2.append("g")
        .selectAll(".areas")
        .data(stackedSeries)
        .join("path")
        .attr("d", areaGen2)
        .attr("fill", (d) => colorScale[d.key]);
    
    var xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"));
    svg.append("g")
        .attr("transform", "translate(0,0)")
        .attr("class", "AxisX")
        .call(xAxis);

BarChart();
linearGraph();
});


function updateAll() {

    var xScale = d3.scaleLinear()
        .domain([dataGraph[0].year, dataGraph[dataGraph.length-1].year])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, maxTotal])
        .range([0, width-height-300]);

    var areaGen1 = d3.area()
        .y((d) => xScale(d.data.year))
        .x0((d) => yScale(d[0]))
        .x1((d) => yScale(d[1])).curve(d3.curveCatmullRom.alpha(0.5));

    var stackGen = d3.stack()
        .keys(keys)
        .offset(d3.stackOffsetSilhouette)
        .order(d3.stackOrderNone);

    var stackedSeries = stackGen(dataGraph);

    d3.select(".chart")
    .transition()
    .duration(2000)
    .style("text-align", "center")

    d3.select(".AxisX")
    .transition()
    .duration(2000)
    .attr("transform", "rotate(90)")
    .attr("")


    d3.select(".chart")
    .selectAll("svg")
    .transition()
    .duration(2000)
    .attr("width",height+150)
    .attr("height",width+50);

    d3.select(".chart")
    .selectAll("svg")
    .selectAll("path")
    .data(stackedSeries)
    .transition()
    .duration(2000)
    .attr("d", areaGen1)
    .attr("fill", (d) => colorScale[d.key])
    .end();

    d3.select(".graph1")
    .transition()
    .duration(2000)
    .attr("transform", "translate(210,0)")
    
}

function UpdateG2(key){

    var xScale = d3.scaleLinear()
                    .domain([dataGraph[0].year, dataGraph[dataGraph.length-1].year])
                    .range([0, width]);

    var yScale = d3.scaleLinear()
                    .domain([0, maxTotal])
                    .range([height-150, 0]);
    
    var areaGen = d3.area()
                    .y((d) => xScale(d.data.year))
                    .x0((d) => yScale(d[0]))
                    .x1((d) => yScale(d[1])).curve(d3.curveCatmullRom.alpha(0.5));

    var stackGen = d3.stack()
                    .keys([keys[key-1]])
                    .offset(d3.stackOffsetSilhouette)
                    .order(d3.stackOrderNone);
    var stackedSeries = stackGen(dataGraph);

    d3.select(".chart")
    .transition()
    .duration(2000)
    .style("text-align", "center")

    d3.select(".AxisX")
    .transition()
    .duration(2000)
    .attr("transform", "rotate(90)")
    .attr("")

    d3.select(".chart")
    .selectAll("svg")
    .transition()
    .duration(2000)
    .attr("width",height+150)
    .attr("height",width+50);

    graf = d3.select(".chart")
    .selectAll("svg")
    .selectAll("path")
    .data(stackedSeries);
    graf
    .transition()
    .duration(2000)
    .attr("d", areaGen)
    .attr("fill", (d) => colorScale[d.key]);
    graf
    .exit().remove();
}

function BarChart(){

    const newCSV = [
        [
            "year","pWille","pDing","pWahr","pTragische","pLeiden","pSchop","pWagn","pKant",
            "pHindu", "pVedanta","pBudd", "pSchleier","pDeutsch","pMusik"
        ],
        ...dataRex.map(data =>[
            data.year.getFullYear(),
            data.pWille,data.pDing,data.pWahr,data.pTragische,data.pLeiden,data.pSchop,data.pWagn,data.pKant
            ,data.pHindu,data.pVedanta,data.pBudd,data.pSchleier,data.pDeutsch,data.pMusik
        ])
    ].map(e => e.join(","))
    .join("\n");
    
    var data = d3.csvParse(newCSV)
    
    var subgroups = data.columns.slice(1)

    var groups = d3.map(data, function(d){return(d.year)})
    
    //agregando X axis
    var x = d3.scaleBand()
      .domain(groups)
      .range([0, width-410])
      .padding([0.2])

    svg1.append("g")
    .attr("transform", "translate(0," + (height+20) + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

    //agregando Y axis
    var y = d3.scaleLinear()
    .domain([0, maxTotal])
    .range([ height+20, 0 ]);
    
    svg1.append("g")
        .call(d3.axisLeft(y))
    
    //stacke data por subgrupos   
    var stackedData = d3.stack()
        .keys(subgroups)
        (data)

    var mouseover = function(d) {

        var subgroupName = d3.select(this.parentNode).datum().key;

        //var subgroupValue = d.currentTarget.__data__[subgroupName];

        //d3.selectAll(".myRect").style("opacity", "10%")

        d3.selectAll("."+subgroupName)
          .style("opacity", 1)
          .attr("fill", colorScaleSub[subgroupName] )
    };

    var mouseleave = function(d) {

        d3.selectAll(".myRect")
            .style("opacity",1)
            .attr("fill", "white" )
    };



    svg1.append("g")
        .selectAll("g")
        // Ingrese en la pila de datos = Key de bucle por Key = grupo por grupo
        .data(stackedData)
        .enter().append("g")
            .attr("fill", "white")
            .attr("class", function(d){ return "myRect " + d.key })
            .selectAll("rect")
      // ingrese una segunda vez = subgrupo de bucle por subgrupo para agregar todos los rectángulos
            .data(function(d) { return d; })
            .enter().append("rect")
                .attr("x", function(d) { return x(d.data.year); })
                .attr("y", function(d) { return y(d[1]); })
                .attr("height", function(d) { return y(d[0]) - y(d[1]); })
                .attr("width",x.bandwidth())
                
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave)

    d3.selectAll(".myRect").style("opacity", 1)
}

function SelectChart(key) {

    d3.selectAll(".btn-"+key).style("color","#FFFFFF")
    .style("background-color",colorScaleSub[key])
    .style("border", "1px solid"+colorScaleSub[key])

    
    d3.selectAll(".myRect").style("opacity", 1).attr("fill", "white")

    d3.selectAll("."+key)
          .style("opacity", 1)
          .attr("fill", colorScaleSub[key]);
}

var totalTabs = $('.nav-tabs li').length;
var currentTab = 1;
var count =0;

//accion del Boton Next de FRAGMENT INFO
$('#ntxbtn').click(function(e){
    count +=1;
    if (count >= 1){
        d3.selectAll("#prevbtn").style("display", "");
    };

    d3.select(".fragmentTitle")
            .html("<p>YEAR:<b>"+dataFragment[count].year+"</b> | GROUP:<b>"+dataFragment[count].group+"</b> | SEASON:<b>"+dataFragment[count].season +"</b></p>")
            .style("color","red");

    d3.selectAll(".fragmentText").html("")

    dataFragment[count].fragments.forEach(function(fragments){
        d3.selectAll(".fragmentText").append("div").html(fragments)
    });
});
//accion del Boton Prev de FRAGMENT INFO
$('#prevbtn').click(function(e){
    count -=1;
    if (count <= 0){
        d3.selectAll("#prevbtn").style("display", "none");
    };

    d3.select(".fragmentTitle")
            .html("<p>YEAR:<b>"+dataFragment[count].year+"</b> | GROUP:<b>"+dataFragment[count].group+"</b> | SEASON:<b>"+dataFragment[count].season +"</b></p>")
            .style("color","red");
            
    d3.selectAll(".fragmentText").html("");

    dataFragment[count].fragments.forEach(function(fragments){
        d3.selectAll(".fragmentText").append("div").html(fragments)
    });
});


//CREACION DEL GRAFICO LINEAL
function linearGraph() {
    const peopleCSV = [
        [
            "year",
            "pWagn","pSchop","pKant"
        ],
        ...dataRex.map(data =>[
            data.year.getFullYear(),
            data.pWagn,data.pSchop,data.pKant
        ])
    ].map(e => e.join(","))
    .join("\n");

    const religionCSV = [
        [
            "year",
            "pHindu","pVedanta","pBudd","pSchleier"
        ],
        ...dataRex.map(data =>[
            data.year.getFullYear(),
            data.pHindu,data.pVedanta,data.pBudd,data.pSchleier
        ])
    ].map(e => e.join(","))
    .join("\n");

    const philosophyCSV = [
        [
            "year",
            "pWille","pDing","pWahr","pLeiden","pTragische"
        ],
        ...dataRex.map(data =>[
            data.year.getFullYear(),
            data.pWille,data.pDing,data.pWahr,data.pLeiden,data.pTragische
        ])
    ].map(e => e.join(","))
    .join("\n");


    const germanyCSV = [
        [
            "year",
            "pDeutsch","pMusik"
        ],
        ...dataRex.map(data =>[
            data.year.getFullYear(),
            data.pDeutsch,data.pMusik
        ])
    ].map(e => e.join(","))
    .join("\n");

    
    //Data de people
    var dataPeople = d3.csvParse(peopleCSV)
    var keysPeople = dataPeople.columns.slice(1)

    console.log("data peolple" , dataPeople)


    //Data de Religion
    var dataReligion = d3.csvParse(religionCSV)
    var keysReligion = dataReligion.columns.slice(1)

    //Data de Philosophy
    var dataPhilosophy = d3.csvParse(philosophyCSV)
    var keysPhilosophy = dataPhilosophy.columns.slice(1)

    //Data de Germany
    var dataGermany = d3.csvParse(germanyCSV)
    var keysGermany = dataGermany.columns.slice(1)



    var datastackePeople = d3.stack()
        .keys(keysPeople)(dataPeople);
    
    var x = d3.scaleLinear()
        .domain(d3.extent(dataPeople, function(d) { return d.year; }))
        .range([ 0, width+100]);

    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([ height-200, 0 ]);
    
    var area = d3.area()
        .x(function(d) { return x(d.data.year); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); })
        .curve(d3.curveCatmullRom.alpha(0.1));
        

    var valC = false

    //CREACION DEL POPUP
    var Tooltip = d3.select(".PeopleLineGraph")
                    .append("div")
                    .style("opacity", 0)
                    .attr("class", "tooltip")
                    .style("background-color", "#222222")
                    .style("border", "solid")
                    .style("border-width", "2px")
                    .style("border-radius", "5px")
                    .style("border-color", "#222222")
                    .style("padding", "5px")
                    .style("color", "white")

    var textClick = function(d,event){
        valC = true
        //alert(valC)
        if(valC==true){
            var key = d.target.__data__
            console.log(key)

            d3.selectAll(".linealG")
            .style("opacity",1)
            .style("fill","#E12179");
            
            d3.selectAll(".linalT")
            .style("fill", "white");
            
            d3.select(".lnl"+key)
            .style("opacity",2)
            .style("fill","#C81A45");

            d3.select(".lnltxt"+key)
            .style("fill", eval("colorScaleSub."+key));
            
            //Eliminar Circulos
            d3.select(".PeopleLineGraph").selectAll("circle").remove()
          
          
            //CREACIÓN DE LOS CIRCULOS EN LAS LINEAS
            linegraph.selectAll("myCircles")
                .data(dataPeople)
                .enter()
                .append("circle")
                .attr("fill", eval("colorScaleSub."+key))
                .attr("stroke", "none")
                .attr("cx", function(d) { return x(d.year) })
                .attr("r", 4)
                .attr("cy", function(d ,i ) {
                    const keys = Object.keys(d)
                    const index = keys.indexOf(key)
                    var stackedValue = 0
                    const values = Object.values(d)
                    for (let i = 0; i < index; i++) {
                        stackedValue+=parseInt(values[i+1])
                    }
                    console.log("Value de D", d);
                    console.log("INDICE:" , index, "STACKE VALUE" ,stackedValue)
                    //return y(eval("d."+key))
                    return  y(stackedValue)
                })
                .style("cursor","pointer")
                .on("click", function(d) {
                    popData = d.target.__data__
                    Tooltip.transition()
                        .duration(200)
                        .style("opacity", .9)
                    d3.select(this)
                        .style("stroke", "white")
                        .style("opacity", 1);
                     
                    Tooltip
                        .html("The exact value of<br>this cell is: " + popData.year)
                        .style("left", (d.pageX-50) + "px")
                        .style("top", (d.pageY-60) + "px")
                    //alert("Año: "+ popData.year+" "+key+": "+ eval("popData."+key))
                  })
                .on("mouseleave",function(d){
                    Tooltip
                        .style("opacity", 0)
                    d3.select(this)
                    .style("stroke", "none")
                    .style("opacity", 0.8)
                })
        }
        if(valC==false){
            d3.selectAll(".linalT")
            .style("fill", "white");

            d3.selectAll(".linealG")
                .style("opacity",1);
        }

    }

    linegraph.append("g")
        .selectAll("g")
        .data(datastackePeople)
        .enter()
        .append("path")
        .attr("class", function(d) { return "linealG" + " lnl"+d.key })
        .style("fill", colorScale.people)
        .attr("d", area);

    

    linegraph.selectAll("mylabels").append("g")
        .data(keysPeople)
        .enter()
        .append("text")
            .attr("x", function(d,i){
                if(i>0){
                    return 0 + i*(200)+((i-1)*(140))
                }
                return  0
                })
            .attr("y",50)
            .text(function(d){ 
                if(d=="pWagn"){
                    return "Wagner"
                }
                if(d=="pSchop"){
                    return "Schopenhauer"
                }
                if(d=="pKant"){
                    return "Kant"
                }
            })
            .attr("text-anchor", "left")
            .attr("class", function(d){return "linalT lnltxt"+d})
            .style("alignment-baseline", "middle")
            .style("font-size","56px")
            .style("fill", "white")
            .style("font-family", "PlayfairDisplay-Regular")
            .style("cursor","pointer")
            .on("click",function(d){textClick(d,d3.event);});
     
}

