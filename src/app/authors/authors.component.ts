import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsService } from '../authors.service';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './authors.component.html'
})
export class AuthorsComponent implements OnInit {
  displayedColumns: string[] = ['au_id', 'au_fname', 'au_lname', 'phone', 'city', 'state', 'contract', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  newAuthor = { au_id: '', au_fname: '', au_lname: '', phone: '', city: '' };

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authorService: AuthorsService) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.getAuthors().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }
  formatAuthorId() {
    const raw = this.newAuthor.au_id.replace(/\D/g, '').slice(0, 9); // Only digits, max 9
    let formatted = '';
  
    if (raw.length > 0) formatted = raw.slice(0, 3);
    if (raw.length > 3) formatted += '-' + raw.slice(3, 5);
    if (raw.length > 5) formatted += '-' + raw.slice(5);
  
    this.newAuthor.au_id = formatted;
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  addAuthor() {
    const auIdPattern = /^\d{3}-\d{2}-\d{4}$/;
    if (!auIdPattern.test(this.newAuthor.au_id)) {
      alert("Invalid ID format. Please use NNN-NN-NNNN (e.g., 123-45-6789)");
      return;
    }

    this.authorService.addAuthor(this.newAuthor).subscribe({
      next: () => {
        this.loadAuthors();
        this.newAuthor = { au_id: '', au_fname: '', au_lname: '', phone: '', city: '' };
      },
      error: (err) => {
        console.error('Failed to add author:', err);
        alert('Something went wrong. Please try again.');
      }
    });
    
  }

  deleteAuthor(au_id: string) {
    if (confirm('Are you sure you want to delete this author?')) {
      this.authorService.deleteAuthor(au_id).subscribe({
        next: () => this.loadAuthors(),
        error: err => {
          console.error('Delete failed:', err);
          alert('Failed to delete author.');
        }
      });
    }
  }
}
