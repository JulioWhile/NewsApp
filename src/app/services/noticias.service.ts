import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  headlinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http: HttpClient ) { }

  private ejecutarQuery<T>( query: string ) {
    query = apiUrl + query;
    return this.http.get<T>( query, { headers } );
  }

  getTopHeadLines() {
    this.headlinesPage++;

    return this.ejecutarQuery<RespuestaTopHeadlines>
                (`/top-headlines?country=us&page=${ this.headlinesPage }`); 
    // return this.http.get<R espuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=a15952cff06f4abcb9bbd734154cc54f`);
  }

  getTopHeadLinesCategoria( categoria: string ) {
    if( this.categoriaActual === categoria ) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>
                (`/top-headlines?country=us&category=${ categoria }&page=${ this.categoriaPage }`);
    // return this.http.get(`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=a15952cff06f4abcb9bbd734154cc54f`);
  }
}
