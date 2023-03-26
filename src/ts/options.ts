import { OptionsPageHandler } from "./page-handlers/options-page-handler";
import { ContextParamsPageHandler } from "./page-handlers/context-params-page-handler";
import { AppConfig } from "./app-config";
import { TeamCityService } from "./services/teamcity-service";

let buildList = new Array();

if (ContextParamsPageHandler.isValidcontextParamsPage()) {
  AppConfig.getConfig()
    .then(config => {
      const teamCity = new TeamCityService(config.teamCityBaseUrl, config.teamCityRestToken, config.teamCityCSRF);
      const contextParamsPageHandler = new ContextParamsPageHandler(teamCity)
      contextParamsPageHandler.displayContextParams()
    });
}

function MoveToTop(e) {
  AppConfig.getConfig()
    .then(config => {
      const teamCity = new TeamCityService(config.teamCityBaseUrl, config.teamCityRestToken, config.teamCityCSRF);
      teamCity.MovetoTop(e.target.getAttribute('index'))
    });
};

function findQueuedBuild() {
  document.getElementById("itemInfo").innerHTML = ""
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

              para.innerText = `⏳${buildTypeId}`;
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

function findBuild() {

  document.getElementById("BuildList").innerHTML = ""

  AppConfig.getConfig()
    .then(config => {
      const teamCity = new TeamCityService(config.teamCityBaseUrl, config.teamCityRestToken, config.teamCityCSRF);
      var xml = teamCity.getBuildTypes()
      var builds = xml.getElementsByTagName("buildTypes")[0];

      var keywords = (<any>$("#tagsinput2")).tagsinput('items')
      let pattern = ""
      for (let index = 0; index < keywords.length; index++) {
        const tag = keywords[index];
        pattern += `(?=.*${tag})`.toString()
      }

      var regPattern = RegExp(pattern)

      if (builds) {
        var buildsNodes = builds.children;
        if (buildsNodes) {
          for (var i = 0; i < buildsNodes.length; i++) {
            var buildId = buildsNodes[i].getAttribute("id");
            var buildState = buildsNodes[i].getAttribute("state");
            var projectId = buildsNodes[i].getAttribute("projectId");
            if (regPattern.test(buildId.toLowerCase())) {


              const btn = document.createElement("button");
              const para = document.createElement("p");
              const br = document.createElement("br");

              para.innerText = `${buildId}`;
              para.id = 'p-' + i;
              para.setAttribute("class", "inline");
              para.style.cssText = "display: inline-block;"

              btn.innerHTML = `Add`;
              btn.id = 'button-' + i;
              btn.setAttribute("class", "btn btn-primary");
              btn.style.cssText = "display: inline-block;"
              btn.setAttribute('projectId', buildId);
              btn.addEventListener("click", addBuild2List)
              document.getElementById("BuildList").appendChild(para);
              document.getElementById("BuildList").appendChild(btn);
              document.getElementById("BuildList").appendChild(br);
            }
            else {
              continue;
            }
          }
        }
      }
    });
}

function addBuild2List(e) {
  buildList.push(e.target.getAttribute("projectId"))
  console.log(buildList)
  const ol = document.querySelector("#libraries");
  const li = document.createElement('li');
  li.innerText = ""
  buildList.forEach(function (elem) {
    li.innerText = ""
    console.log("dfsdfs")
    li.innerText = elem;
    ol.appendChild(li);
  });
}


const find_build = document.getElementById("find_build")
find_build.addEventListener("click", function () {
  findBuild()
}, false);

const clear_build = document.getElementById("clear_build")
clear_build.addEventListener("click", function () {
  document.getElementById("BuildList").innerHTML = ""
}, false);


const run_build = document.getElementById("run_build")
run_build.addEventListener("click", function () {
  AppConfig.getConfig()
    .then(config => {
      const teamCity = new TeamCityService(config.teamCityBaseUrl, config.teamCityRestToken, config.teamCityCSRF);
      buildList.forEach(function (element) {
        teamCity.runBuild(element)
      })
    });
}, false);

const el = document.getElementById("refresh")
el.addEventListener("click", function () {
  findQueuedBuild()
}, false);

$('#tagsinput').on('itemAdded', () => {
  findQueuedBuild()
});

$('#tagsinput').on('itemRemoved', () => {
  findQueuedBuild()
});


document.getElementById("movetotop").addEventListener("click", function () {
  openCity(event, 'movetotop_tab')
}, false);

document.getElementById("sequence").addEventListener("click", function () {
  openCity(event, 'sequence_tab')
}, false);

document.getElementById("settings").addEventListener("click", function () {
  openCity(event, 'settings_tab')
}, false);

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}



$(document).ready(function () {
  chrome.storage.sync.get({ libraryOrder: [] }, function (result) {
    var libraryOrder = result.libraryOrder;
    (<any>$("#libraries li")).sort(function (a, b) {
      return libraryOrder.indexOf($(a).text()) - libraryOrder.indexOf($(b).text());
    }).appendTo("#libraries");
  });

  (<any>$("#libraries")).sortable({
    stop: function () {
      var libraryOrder = [];
      $("#libraries li").each(function (index) {
        libraryOrder.push($(this).text());
      });

      chrome.storage.sync.set({ libraryOrder: libraryOrder }, function () {
        console.log("Library order saved to Chrome Storage");
      });
    }
  });
});

document.getElementById("movetotop").click();

const optionsPageHandler = new OptionsPageHandler();
optionsPageHandler.loadOptions();

