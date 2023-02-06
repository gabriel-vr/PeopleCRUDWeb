import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from 'src/app/Classes/Pessoa';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  url = 'https://localhost:7076/api/pessoas';

  constructor(private http: HttpClient) { 

  }

  pegarTodos(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.url);
  }
  
  pegarPorId(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.url}/${id}`);
  }

  salvarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.post<Pessoa>(this.url, pessoa, httpOptions);
  }

  atualizarPessoa(pessoa: Pessoa): Observable<any> {
    return this.http.put<Pessoa>(this.url, pessoa, httpOptions);
  }

  deletarPessoa(id: number): Observable<any> {
    return this.http.delete<number>(`${this.url}/${id}`, httpOptions);
  }

}
