import { OptionsPageHandler } from "./page-handlers/options-page-handler";
import { ContextParamsPageHandler } from "./page-handlers/context-params-page-handler";
import { AppConfig } from "./app-config";
import { TeamCityService } from "./services/teamcity-service";


if (ContextParamsPageHandler.isValidcontextParamsPage()) {
  AppConfig.getConfig()
  .then(config => {
  const teamCity = new TeamCityService(config.teamCityBaseUrl, config.teamCityRestToken, config.teamCityCSRF);
  const contextParamsPageHandler = new ContextParamsPageHandler(teamCity)
  contextParamsPageHandler.displayContextParams()
});
}

function MoveToTop(e){
  AppConfig.getConfig()
      .then(config => {
          const teamCity = new TeamCityService(config.teamCityBaseUrl, config.teamCityRestToken, config.teamCityCSRF);
          teamCity.MovetoTop(e.target.getAttribute('index'))
      });
  };

function getBuilds() {
    document.getElementById("itemInfo").innerHTML=""
    AppConfig.getConfig()
      .then(config => {
        const teamCity = new TeamCityService(config.teamCityBaseUrl, config.teamCityRestToken, config.teamCityCSRF);
        var xml = teamCity.queueRequest()
        var builds = xml.getElementsByTagName("builds")[0];

        var keywords = (<any>$("#tagsinput")).tagsinput('items')
        let pattern = ""
        for (let index = 0; index < keywords.length; index++) {
          const tag = keywords[index];
          console.log(tag)
          pattern += `(?=.*${tag})`.toString()
        }

        var regPattern = RegExp(pattern) 

        if (builds) {
          var buildsNodes = builds.children;
          if (buildsNodes) {
            for (var i = 0; i < buildsNodes.length; i++) {
              var buildId = buildsNodes[i].getAttribute("id");
              var buildState = buildsNodes[i].getAttribute("state");
              var buildTypeId = buildsNodes[i].getAttribute("buildTypeId");
              
              if (regPattern.test(buildTypeId.toLowerCase())) {
                const btn = document.createElement("button");
                const para = document.createElement("p");
                const br = document.createElement("br");

                para.innerText =  `⏳${buildTypeId}`;
                para.id = 'p-' + i;
                para.setAttribute("class", "inline");
                para.style.cssText = "display: inline-block;"

                btn.innerHTML = `Push`;
                btn.id = 'button-' + i;
                btn.setAttribute("class", "btn btn-primary");
                btn.style.cssText = "display: inline-block;"
                btn.setAttribute('index', buildId);
                btn.addEventListener("click", MoveToTop)
                document.getElementById("itemInfo").appendChild(para);  
                document.getElementById("itemInfo").appendChild(btn);   
                document.getElementById("itemInfo").appendChild(br);    
              }
              else {
                continue;
              }
            }
          }
        }
  });
  }

const el = document.getElementById("refresh")
el.addEventListener("click", function () {  
  getBuilds()
}, false);
  
$('#tagsinput').on('itemAdded', () => {
  getBuilds()
});
  
$('#tagsinput').on('itemRemoved', () => {
  getBuilds()
});
  
const optionsPageHandler = new OptionsPageHandler();
optionsPageHandler.loadOptions();

