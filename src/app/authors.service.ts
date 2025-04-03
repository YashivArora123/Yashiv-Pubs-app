import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthorsService {
  private http = inject(HttpClient);

  getAuthors() {
    return this.http.get<any[]>('http://localhost:3000/authors');
  }

  addAuthor(author: any) {
    return this.http.post('http://localhost:3000/authors', author);
  }
  deleteAuthor(au_id: string) {
    return this.http.delete(`http://localhost:3000/authors/${au_id}`);
  }
  
}
