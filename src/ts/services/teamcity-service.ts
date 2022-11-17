import { TeamCity } from "../interfaces/teamcity";

export class TeamCityService implements TeamCity {
  private teamCityUrl: URL;
  private teamCityRestApiViewQueued: string;
  private teamCityRestApiBuildQueue: string;
  private accessToken: string;
  private csrf:string;

  constructor(teamCityUrl: string, accessToken: string, csrf:string) {
    this.setTeamCityUrl(teamCityUrl);
    this.setTeamCityRestApiCredentials(accessToken, csrf);
  }

  setTeamCityUrl(teamCityUrl: string): void {
    this.teamCityUrl = new URL(teamCityUrl);
    this.teamCityRestApiViewQueued = `${this.teamCityUrl.origin}/viewQueued.html`;
    this.teamCityRestApiBuildQueue = `${this.teamCityUrl.origin}/app/rest/buildQueue`;
  }

  setTeamCityRestApiCredentials(accessToken: string, csrf:string): void {
    this.accessToken = accessToken;
    this.csrf = csrf;
  }

  MovetoTop(buildId: number): void {
    const parametr = "moveToTop";
    const data = `${parametr}=${buildId}`;

    console.log(this.teamCityRestApiViewQueued.toString())
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", this.teamCityRestApiViewQueued);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.accessToken);
    xhr.setRequestHeader("X-TC-CSRF-TOKEN", this.csrf);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send(data);
  }

  queueRequest(): Document{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", this.teamCityRestApiBuildQueue, false );
    xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlHttp.setRequestHeader("X-TC-CSRF-TOKEN", this.csrf);

    xmlHttp.send( null );

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlHttp.responseText,"text/xml"); 
  
    return xmlDoc
  }
}
