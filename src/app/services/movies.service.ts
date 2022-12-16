import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {key, url } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MoviesService { 
  constructor(private http: HttpClient) { } 
  getMovies(page: number = 1){
    return this.http.get(`${url}movie/top_rated?api_key=${key}&language=en-US&page=${page}`)
  }
}
