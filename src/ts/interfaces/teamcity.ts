
export interface TeamCity {
  setTeamCityUrl(teamCityUrl: string): void;
  setTeamCityRestApiCredentials(accessToken: string, csrf:string): void;
  MovetoTop(buildId: number, access_token: string, CSRF: string): void;
  queueRequest(): Document;
}
