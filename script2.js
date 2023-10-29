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

// Bar chart de tiempos
var svgTime = d3
    .select(".TimeChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right+80)
    .attr("height", height + margin.top + margin.bottom-250)
    .attr("id","timechart")
    .style("background-color", "#DCDCDC")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .append("g")
    .attr("class","graph3");


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
//Linea graph
var linegraph1 = d3
    .select(".PeopleLineGraph")
    .append("svg")
    .attr("width", width + margin.left + margin.right+80)
    .attr("height", height + margin.top + margin.bottom-200)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + (margin.top + 20)+")");

var linegraph2 = d3
    .select(".ReligionLineGraph")
    .append("svg")
    .attr("width", width + margin.left + margin.right+80)
    .attr("height", height + margin.top + margin.bottom-200)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + (margin.top + 20)+")");

var linegraph3 = d3
    .select(".PhilosophyLineGraph")
    .append("svg")
    .attr("width", width + margin.left + margin.right+80)
    .attr("height", height + margin.top + margin.bottom-200)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + (margin.top + 20)+")");

var linegraph4 = d3
    .select(".GeneralLineGraph")
    .append("svg")
    .attr("width", width + margin.left + margin.right+80)
    .attr("height", height + margin.top + margin.bottom-200)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + (margin.top + 20)+")");


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
var keyValue = {
    pWille:"Wille",
    pDing:"Ding an sich",
    pWahr:"Wahrheit",
    pTragische:"Tragische",
    pLeiden:"Leiden",
    pSchop:"Schopenhauer",
    pWagn:"Wagner",
    pKant:"Kant",
    pHindu: "Hinduism",
    pVedanta: "Vedanta",
    pBudd: "Buddhis",
    pSchleier: "Schleier",
    pDeutsch: "Deutschland",
    pMusik  : "Musik"
}

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
var dataYearFragment = [];
var dataGroup = [];	
var maxTotal = 0;
var uTotal = 0;
var groupT = 0;

d3.json("data.json").then(function(data){
    // ecmascript6 6
    //console.log("VALOR DEL DATA = ",data);
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
        
        var key_regex = Object.keys(keyValue)
        key_regex.forEach(function(keys) {
            var i = 0;
            eval("number_founds_year_"+keys+"="+i);
        })
       
        /*Bucle para agregar el año a cada fragmento y agregarlo en la dataFragment para mostrarlo despues*/
        data[year].forEach(function(data_year1){
            var uDataGroup ={}
            key_regex.forEach((keys)=> {
                var i = 0;
                eval("number_founds_subkey_"+keys+"="+i);
            })
            
            data_year1.fragments.forEach((fragment)=>{
                keys.forEach((key)=>{
                    var keys_search = Object.keys(array_data_search[key]);
                    keys_search.forEach((key_search)=>{
                        var regex = array_data_search[key][key_search];
                        var a_search=fragment.match(regex);
                        if(a_search == null){a_search = []}
                        key_regex.forEach((kys)=> {
                            if(key_search === kys){
                                eval("number_founds_subkey_"+kys+"+="+a_search.length);
                                uDataGroup[kys] =  eval("number_founds_subkey_"+kys)
                            }
                        });
                    })
                })
            })
            data_year1.year = year
            uDataGroup["year"] = ""+data_year1.year+"-"+data_year1.group 
            dataFragment.push(data_year1)
            dataGroup.push(uDataGroup)
        });
        /*******************************************************************/
        keys.forEach(function(key){      
            var number_founds_year = 0;
            //console.log("*****************************************************************************************");
            //console.log("VALOR DE LA KEY = ",key);
            data[year].forEach(function(data_year){
                //console.log("GRUPO  = %o AÑO %o", data_year.group, data_year.year);
               // console.log("DATA_YEAR = ", data_year);
                data_year.fragments.forEach(function(fragment){
                    //console.log("VALOR DEL FRAGMENT", fragment);
                    var keys_search = Object.keys(array_data_search[key]);
                    keys_search.forEach(function(key_search){
                        var regex = array_data_search[key][key_search];
                        var a_search=fragment.match(regex);
                        if(a_search == null){a_search = []}                       
                        
                        //console.log(year+"_"+key+"_"+key_search, a_search);
                        number_founds_year+=a_search.length
                        //console.log("VALOR DEL NUMBER FOUND = ",a_search);
                        //Bucle para sumar los datos de los subgrupos de "array_data_search"
                        keys.forEach(function(ky) {
                            var keys_sr = Object.keys(array_data_search[ky])
                            keys_sr.forEach(function(kys) {
                                if(key_search === kys){
                                    eval("number_founds_year_"+kys+"+="+a_search.length);
                                    udataRex[kys] = eval("number_founds_year_"+kys);
                                }
                            });
                        });                                
                    });
                    dataYearFragment
                });
            });
            uDataGraph[key] = number_founds_year; 
        });
        //Bucle para pintar el boton
        keys.forEach(function(key) {
            var keys_search = Object.keys(array_data_search[key])
            keys_search.forEach(function(keys) {
                
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
    
    // console.log("dataGraph", dataGraph);
    // console.log("data del regex", dataRex);
    
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

linearGraph();
BarChart();
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

var x1
var y1
//BarChart Función para el gráfico de selección de rango de años y dibujo del grafico de barras
function BarChart(){
    const newCSV = [
        [ "year","pWille","pDing","pWahr","pTragische","pLeiden","pSchop","pWagn","pKant",
            "pHindu", "pVedanta","pBudd", "pSchleier","pDeutsch","pMusik"],
        ...dataRex.map(data =>[data.year.getFullYear(),
            data.pWille,data.pDing,data.pWahr,data.pTragische,data.pLeiden,data.pSchop,data.pWagn,data.pKant
            ,data.pHindu,data.pVedanta,data.pBudd,data.pSchleier,data.pDeutsch,data.pMusik])
    ].map(e => e.join(","))
    .join("\n");

    var data = d3.csvParse(newCSV)
    
    //unificar data para tener año y cantidad por año
    const sumaPorAnio  = {};
    data.forEach(objeto => {
        const year = objeto.year;
        if (!sumaPorAnio[year]) {
          sumaPorAnio[year] = 0;
        }
        for (const clave in objeto) {
          if (!isNaN(objeto[clave]) && objeto[clave] !=year) {
            sumaPorAnio[year] += parseInt(objeto[clave], 10);
          }
        }
      });

    //GRAFICO TIME DE BARRAS
    datos = Object.entries(sumaPorAnio)

    x1 = d3.scaleBand()
        .domain(datos.map(d => d[0]))
        .range([0, width])
        .padding([0.2])

    y1 = d3.scaleLinear()
        .domain([0, d3.max(datos, d => d[1])])
        .range([ height-300, 0 ]);
        
    svgTime.selectAll(".bar")
        .data(datos)
        .join("rect")
        .attr("fill", "#e7e7e7")
        .attr("class", "chartTimes")
        .attr("x", d => x1(d[0]))
        .attr("y", d => y1(d[1])-10)
        .attr("height", d => (height -290 - y1(d[1])))
        .attr("width",x1.bandwidth()-20)  
}

function fGraph(lanio,ranio){

    svg1.selectAll("rect").remove();

    grafico2(lanio,ranio,0,34,0);
    grafico2(lanio,ranio,34,68,100);
    grafico2(lanio,ranio,68,102,200);
    grafico2(lanio,ranio,102,140,300);
}

function makeCSV(lanio,ranio,slice1,slice2) {

    const filteredData = dataGroup.filter(data => {
        const year = parseInt(data.year.split("-")[0]);
        if(year < lanio || year > ranio) return false;

        for (const key in data) {
            if (key !== "year" && data[key] !== 0) {
                return true; // Si encuentra un valor diferente de 0, incluir el objeto
            }
        }
        return false; 

    });

    var makeData = filteredData.slice(slice1,slice2)
    return newCSV1 = [
        [ "year","pWille","pDing","pWahr","pTragische","pLeiden","pSchop","pWagn","pKant",
            "pHindu", "pVedanta","pBudd", "pSchleier","pDeutsch","pMusik"],
        ...makeData
            .map(data =>[
                data.year,
                data.pWille,data.pDing,data.pWahr,data.pTragische,data.pLeiden,data.pSchop,data.pWagn,data.pKant
                ,data.pHindu,data.pVedanta,data.pBudd,data.pSchleier,data.pDeutsch,data.pMusik
            ])
    ].map(e => e.join(","))
    .join("\n");
}

//COLOR DE LA PALABRA SELECCIONADA
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
var count = 0;

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


//CREACION DEL STREAM POR PALABRA
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

    //Data de Religion
    var dataReligion = d3.csvParse(religionCSV)
    var keysReligion = dataReligion.columns.slice(1)

    //Data de Philosophy
    var dataPhilosophy = d3.csvParse(philosophyCSV)
    var keysPhilosophy = dataPhilosophy.columns.slice(1)

    //Data de Germany
    var dataGeneral = d3.csvParse(germanyCSV)
    var keysGeneral = dataGeneral.columns.slice(1)

    var datastackePeople = d3.stack()
        .keys(keysPeople)(dataPeople);
    
    var datastackeReligion = d3.stack()
        .keys(keysReligion)(dataReligion);

    var datastackePhilosophy = d3.stack()
        .keys(keysPhilosophy)(dataPhilosophy);

    var datastackeGeneral = d3.stack()
        .keys(keysGeneral)(dataGeneral);       

    var valC = false
    
    var textClick = function(d){
        var keyGroup
        valC = true
        //alert(valC)
        if(valC==true){
            var key = d.target.__data__
            const keys = Object.keys(keyValue);
            const index = keys.indexOf(key);
     
            if(index>=0 && index <=4){
                keyGroup = "Philosophy"
            }else if (index>=5 && index <=7){
                keyGroup = "People"
            }else if (index>=8 && index <=11){
                keyGroup = "Religion"
            }else if (index>=12 && index <=13){
                keyGroup = "General"
            };

            d3.selectAll(".linealG"+keyGroup)
                .style("opacity",1)
                .style("fill",eval("colorScaleSub."+key));

            d3.selectAll(".linealT"+keyGroup)
                .style("fill", "white");
            
            //Eliminar Circulos
            d3.select("."+keyGroup+"LineGraph").selectAll("circle").remove();
            
            d3.select(".lnl"+key)
                .style("fill", ()=>{
                    var color = d3.color(eval("colorScaleSub."+key))
                    color.r *= 0.8;
                    color.g *= 0.8;
                    color.b *= 0.8;
                    
                    return color.toString()
                });

            d3.select(".lnltxt"+key)
            .style("fill", eval("colorScaleSub."+key));  
            
            //console.log("Valor de key group", keyGroup);

            //CREACIÓN DE LOS CIRCULOS EN LAS LINEAS
            d3.selectAll("."+keyGroup+"LineGraph svg g").selectAll("myCircles")
                .data(eval("data"+keyGroup))
                .enter()
                .append("circle")
                .attr("fill", eval("colorScaleSub."+key)+1)
                .style("opacity", 0.1)
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
                    //console.log("Value de D", d);
                    return  y(stackedValue)
                })
                .style("cursor","pointer")
                .on("click", function(d) {
                    popData = d.target.__data__
                    var popDataHTML = ""
                    let dPop = Object.keys(popData)
                    var totalP = 0 
                    for (let i = 1; i < dPop.length; i++) {
                        popDataHTML += eval("keyValue."+dPop[i]+".toUpperCase()") + ": "
                        +"<span>"+ popData[dPop[i]] + " mentions"+"</span>"+"<br>" 
                        totalP += parseInt(popData[dPop[i]])
                    }

                    Tooltip
                        .style("opacity", .9)

                    d3.select(this)
                        .style("stroke", "white")
                        .style("opacity", 1);
                     
                    Tooltip
                        .html(""+popData.year+"<br>"+"<hr>"+
                            "Total: "+totalP+" mentions <br>"+
                            popDataHTML)
                        .style("left", (d.pageX-50) + "px")
                        .style("top", (d.pageY-((dPop.length-1)*20+60)) + "px")
                    //alert("Año: "+ popData.year+" "+key+": "+ eval("popData."+key))
                  })
                .on("mouseleave",function(d){
                    Tooltip.transition()
                        .duration(200)
                        .style("opacity", 0)
                    d3.select(this)
                    .style("stroke", "none")
                    .style("opacity", 0.1)
                });
        }
        if(valC==false){
            d3.selectAll(".linalT")
            .style("fill", "white");

            d3.selectAll(".linealG")
                .style("opacity",1);
        }

    }//FIN DE LA FUNCIÓN  TEXTCLICK


    //Bucle para generar los 4 gráficos
    for (let i = 1; i < 5; i++) {
        var keyLabel 
        if(i === 1){
            keyLabel = "People"
        }else if (i === 2){
            keyLabel = "Religion"
        }else if (i === 3){
            keyLabel = "Philosophy"
        }else if (i === 4) {
            keyLabel = "General"
        }
        var x = d3.scaleLinear()
            .domain(d3.extent(eval("data"+keyLabel), function(d) { return d.year; }))
            .range([ 0, width+100]);

        
        var y = d3.scaleLinear()
            .domain([0, 100])
            .range([ height-200, 100 ]);
    
        var area = d3.area()
            .x(function(d) { return x(d.data.year); })
            .y0(function(d) { return y(d[0]); })
            .y1(function(d) { return y(d[1]); })
            .curve(d3.curveCatmullRom.alpha(0));

         //CREACION DEL POPUP
        var Tooltip = d3.select("."+keyLabel+"LineGraph")   
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

        //CREANDO EL GRAFICO STACKEADO CON LA CLASS linealG+UpKEY
        eval("linegraph"+i).append("g")
            .selectAll("g")
            .data(eval("datastacke"+keyLabel))
            .enter()
            .append("path")
            .attr("d", area)
            .attr("class", function(d) {
                const keys = Object.keys(keyValue);
                const index = keys.indexOf(d.key);
                return "linealG"+keyLabel + " lnl"+d.key
            })
        .style("fill",(d)=>{return eval("colorScaleSub."+d.key)} );
        

        //CREANDO EL TEXTO DEL GRÄFICO
        eval("linegraph"+i).selectAll("mylabels").append("g")
            .data(eval("keys"+keyLabel))
            .enter()
            .append("text")
            .attr("x", function(d,i){
                if(i>0){
                    // console.log("Tamaño de texto", d,"-Valor: " +eval("keyValue."+d+".length") )
                    // console.log("Valor del long" + long);
                    distance = long*(long)+200
                    long =  eval("keyValue."+d+".length") + long
                    return distance
                }
                long =  eval("keyValue."+d+".length")
                return  0
                })
            .attr("y",25)
            .text(function(d,i){
                if (i>0){
                    return eval("keyValue."+d) 
                }
                return eval("keyValue."+d) 
            })
            .attr("text-anchor", "left")
            .attr("class", function(d){
                const keys = Object.keys(keyValue);
                const index = keys.indexOf(d);
                if(index>=0 && index <=4){
                    return "linealTPhilosophy" + " lnltxt"+d 
                }else if (index>=5 && index <=7){
                    return "linealTPeople" + " lnltxt"+d 
                }else if (index>=8 && index <=11){
                    return "linealTReligion" + " lnltxt"+d 
                }else if (index>=12 && index <=13){
                    return "linealTGeneral" + " lnltxt"+d 
                }
            })
            .style("alignment-baseline", "middle")
            .style("font-size","50px")
            .style("fill", "white")
            .style("font-family", "PlayfairDisplay-Regular")
            .style("cursor","pointer")
            .on("click",function(d){textClick(d,d3.event);});
    }
}

/*SLICE*/
// d3.selectAll('input[type="range"]')
//     .style("width",width+"px")

window.onload = function(){
    fGraph(1876,1880);
    moveSlide();
}

let sliderOne = d3.select("#slider-1");
let sliderTwo = d3.select("#slider-2");
let displayValOne = d3.select("#range1");
let displayValTwo = d3.select("#range2");

sliderOne.on("input",function(){
    if(parseInt(sliderTwo.node().value) - parseInt(sliderOne.node().value) <= 0){
        sliderOne.node().value = parseInt(sliderTwo.node().value) - 1;
    }
    displayValOne.text(sliderOne.node().value);
});

sliderTwo.on("input",function(){
    if(parseInt(sliderTwo.node().value) - parseInt(sliderOne.node().value) <= 0){
        sliderTwo.node().value = parseInt(sliderOne.node().value) + 1;
    }
    displayValTwo.text(sliderTwo.node().value);
});

//FUNCION PARA MOVER LOS SLICES
function moveSlide(){

    let sliderBarWidth  = sliderOne.node().offsetWidth; // ancho del slider
    let sliderValue = sliderOne.node().value; // Valor del slider
    let sliderPosition = (sliderValue - 1869) / (1888 - 1869);
    let thumbPosition = sliderPosition * (sliderBarWidth - 1)-(sliderValue-1869)*3.1;

    let sliderBarWidth2  = sliderTwo.node().offsetWidth; // ancho del slider
    let sliderValue2 = sliderTwo.node().value; // Valor del slider
    let sliderPosition2 = (sliderValue2 - 1869) / (1888 - 1869);
    let thumbPosition2 = sliderPosition2 * (sliderBarWidth2 - 1) -(sliderValue2-1869)*3.3;

    if(parseInt(sliderTwo.node().value) - parseInt(sliderOne.node().value) > 0){
        displayValOne.style("left",thumbPosition+"px").style("padding-left","8px")
        displayValTwo.style("left",thumbPosition2+"px").style("padding-left","8px")
        //Pintamos las barras seleccionadas en el rango
        d3.selectAll(".chartTimes").classed("selected", (d) => {
            return d[0] >= sliderValue && d[0]<=sliderValue2;        
        })
    }
    //para actualizar el grafico
    if (sliderValue < sliderValue2 && sliderValue2 > sliderValue){
        fGraph(sliderValue,sliderValue2);
    }
}

var child_brush;
var brush,brushg;

function makeBrush(val1,val2) {
    if(brush){
        if (val1 === 1){
            brush.move(brushg,[60,(50*(val2)+60+(val2-1)*3)])
        }
        else{
            brush.move(brushg,[(50*(val1-1)+60+(val1-1)*3),(50*(val2)+60+(val2-1)*3)])
        }
    }
    if(!brush){
        brush = d3.brushX()  
        .extent([[60,0],[(width + margin.left + margin.right-40),75]])

        brushg = d3.select("#timechart").append("g").attr("class", "parent")
              .call(brush);
        brush.move(brushg,[378,693])
    }
    
    const selection = d3.brushSelection(brushg.node());
    const xScale = x1; // X1 es la escala del grafico
    
    //pintamos las barras seleccionadas
    // d3.selectAll(".chartTimes").classed("selected", (d) => {
    //     return selection &&   xScale(d[0])+50 >= selection[0]  && xScale(d[0])+50 <= selection[1];        
    // })

    d3.select("#timechart").select('.parent .overlay').remove();
    d3.select("#timechart").select('.parent .move').remove();
}

function grafico2(lanio,ranio,lslice,rslice,high){

    var newCSV1 = makeCSV(lanio,ranio,lslice,rslice)
    var data2 = d3.csvParse(newCSV1)
    var groups2 = d3.map(data2, function(d){return(d.year)})
    var subgroups = data2.columns.slice(1)

    //agregando X axis
    var x = d3.scaleBand()
      .domain(groups2)
      .range([0, width])
      .padding([0.2])

    //agregando Y axis
    var y = d3.scaleLinear()
        .domain([0, maxTotal])
        .range([ 0, height+20 ]);
    
    //stacke data por subgrupos   
    var stackedData = d3.stack()
        .keys(subgroups)
        (data2)

    var mouseover = function(d) {
        var subgroupName = d3.select(this.parentNode).datum().key;
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
        .data(stackedData)
        .enter()
        .append("g")
        .attr("fill", "white")
        .attr("class", function(d){ return "myRect " + d.key })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("x", function(d,i) { return i*18; })
        .attr("y", function(d) { return y(d[0])+high; })
        .attr("height", function(d) {

            return y(d[1]) - y(d[0]); 
        })
        .attr("width",14)  
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)

    d3.selectAll(".myRect").style("opacity", 1);
}