import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {
  private baseApiPath = "https://api.themoviedb.org/3/";
  constructor(public http: HttpClient) {
  }

  getLatestMovies() {
    return this.http.get(this.baseApiPath + "movie/popular?api_key=" + this.getApiKey());
  }

  private getApiKey() {
    return "00f8106c44de340c3d9d317e319676e4";
  }

  retornaDetalhesFilme(id) {
    return this.http.get(this.baseApiPath + `movie/${id}?api_key=` + this.getApiKey());
  }

}
