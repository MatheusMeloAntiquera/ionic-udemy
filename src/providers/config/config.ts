import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {

  constructor() {

  }

  public getConfigData(): any {
    let config = localStorage.getItem("config");

    try {
      return JSON.parse(config);
    }catch( erro ){
      return {};
    }
  }

  public setConfigData(showSlider?: boolean, name?: string, username?: string) {
    let configAtual = this.getConfigData();

    let config = {
      "showSlider": true,
      "name": "",
      "username": ""
    };
    
    if (configAtual != null) {
      
      config.showSlider = showSlider != null ? showSlider : configAtual.showSlider;
      config.name = name || configAtual.name;
      config.username = username || configAtual.username;
      
    } else {
      config = {
        "showSlider": showSlider != null ? showSlider : config.showSlider,
        "name": name || config.name,
        "username": username || config.username
      }
    }

    localStorage.setItem("config", JSON.stringify(config));
  }
}
