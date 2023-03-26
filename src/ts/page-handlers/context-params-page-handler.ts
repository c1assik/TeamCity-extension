import { TeamCity } from "../interfaces/teamcity";
import { Config } from "../interfaces/config";


export class ContextParamsPageHandler {
  static isValidcontextParamsPage(): boolean {
    return (document.URL.indexOf("Tab=contextParams") > -1);
  }

  private teamCity: TeamCity;

  constructor(teamCity: TeamCity) {
    this.teamCity = teamCity;

    chrome.runtime.onMessage.addListener((message, sender) => {
      const config = <Config>message;
      this.teamCity.setTeamCityRestApiCredentials(config.teamCityRestToken, config.teamCityCSRF);
    });
  }


  displayContextParams(): void {
    var regPattern = RegExp("(?<=projectId=)([^&]+)") 
    var url =  document.URL.toString()
    const projectID = url.match(regPattern)[0]

    const response = this.teamCity.getPojectParams(projectID)    
    var contextParams = this.findContextParams(response)
    
    var ContextArray = contextParams.split("\n");
    
    var ParamValueMap = new Map();

    for(var i = 0; i < ContextArray.length; i++ ){
        ParamValueMap.set(ContextArray[i], this.findParamValue(response, ContextArray[i]))
    }

    var style = document.createElement('style');
    style.innerHTML = `
        .MyTable{
            border: 1px solid #eee;
            table-layout: fixed;
            width: 100%;
            margin-bottom: 20px;
        }
        .MyTable th {
            font-weight: bold;
            padding: 5px;
            background: #efefef;
            border: 1px solid #dddddd;
        }
        .MyTable td{
            padding: 5px 10px;
            border: 1px solid #eee;
            text-align: left;
        }
        .MyTable tbody tr:nth-child(odd){
            background: #fff;
        }
        .MyTable tbody tr:nth-child(even){
            background: #F7F7F7;
        }`;
    document.head.appendChild(style);

    var br = document.createElement("br")
    var details = document.createElement("details")
    var summary = document.createElement("summary")
        summary.innerHTML = "Контекстные параметры"

    var my_elem = document.getElementById('editContextParameters');


    var table = document.createElement('table');
    table.className = "MyTable"

    my_elem.parentNode.insertBefore(br, my_elem);
    my_elem.parentNode.insertBefore(details, my_elem);


    details.appendChild(summary)
    details.appendChild(table)

    let tableEl = document.querySelector(".MyTable");

    this.generateTableHead(tableEl, ["Параметр", "Текущее значение"]);
    this.generateTable(tableEl, ParamValueMap);
  }


  private generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
  

   private generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (let key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }


  private findContextParams(response: Document): string{
    const property = response.getElementsByTagName("property")

    for(var i = 0; i < property.length; i++){
        if (property[i].getAttribute("name") === "contextParameters"){
            return property[i].getAttribute("value")
        }
    }
  }

  private findParamValue(response: Document, param: string): string{
    const property = response.getElementsByTagName("property")

    for(var i = 0; i < property.length; i++){
         if (property[i].getAttribute("name") === param){
            return property[i].getAttribute("value")
        }
    }
  }
}