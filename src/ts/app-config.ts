import { Config } from "./interfaces/config";
import { Storage } from "./interfaces/storage";
import { ChromeStorageService } from "./services/chrome-storage-service";

export class AppConfig {
  static storageKeys = [ "tc-rest-token", "tc-rest-csrf", "tagsinput", "tagsinput2", "tc-url"];

  static getConfig(storage?: Storage): Promise<Config> {
    storage = storage || new ChromeStorageService();

    return storage.getData(AppConfig.storageKeys)
      .then(items => {
        const config: Config = AppConfig.convertObjectToConfig(items);
        return Promise.resolve(config);
      });
  }

  static convertObjectToConfig(storageObject: object): Config {
    const config: Config = {
      teamCityRestToken: storageObject[AppConfig.storageKeys[0]] || "",
      teamCityCSRF: storageObject[AppConfig.storageKeys[1]] || "",
      buildFilter: storageObject[AppConfig.storageKeys[2]] || "",
      buildList: storageObject[AppConfig.storageKeys[3]] || "",
      teamCityBaseUrl: storageObject[AppConfig.storageKeys[4]] || "",
    };
    return config;
  }
}
