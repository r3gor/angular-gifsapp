import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _history: string[] = [];
  private _last_result: Gif[] = [];
  private API_URL: string = "https://api.giphy.com/v1/gifs"
  private API_KEY: string = "f6Wkmkd6h9UrLoKwyTT50nOZqKW36Iy9"

  public results: Gif[] = [];

  get history(){
    return [...this._history];
  }

  constructor( private http: HttpClient){
    // Los componentes actuan como singletons, solo se crean una vez
    // por lo que el constructor solo se llama una vez (al inicio del
    // cargado de la aplicación).
    this._history = JSON.parse(localStorage.getItem("history")!) || []
    this.results = JSON.parse(localStorage.getItem("last_result")!) || []
  };

  findGifs(query: string){
    const limit = 6;
    this.saveHistory(query);

    const params: HttpParams = new HttpParams()
      .set("api_key", this.API_KEY)
      .set("limit", limit)
      .set("q", query)  

    this.http.get<SearchGIFResponse>(
      `${this.API_URL}/search`, {params})
      .subscribe((res: SearchGIFResponse) => {
        this.results = res.data
        console.log(res.data)
        localStorage.setItem("last_result", JSON.stringify(this.results))
      })

    console.log(this._history);
  }
  
  saveHistory(query: string){
    query = query.toLowerCase()
    if (this._history.includes(query)) return; 
    this._history.unshift(query);
    this._history = this._history.splice(0, 10);
    localStorage.setItem("history", JSON.stringify(this._history))
  }

}
