import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { UserService } from '../../core/services/user-service/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, EMPTY } from 'rxjs';
import { catchError, debounceTime, switchMap, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  loading: boolean = false;
  searchQuery: string = '';
  searchResults: any[] = [];
  noResults: boolean = false;
  private searchSubject = new Subject<string>();

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  @Output() userSelected = new EventEmitter<number>();

  constructor(private userService: UserService) {
    this.searchSubject
      .pipe(
        debounceTime(300),
        tap(() => {
          this.loading = true;
          this.noResults = false;
        }),
        switchMap((query) => {
          if (query.trim().length === 0) {
            this.loading = false;
            this.searchResults = [];
            this.noResults = false;
            return EMPTY;
          }
          return this.userService.searchUserById(query).pipe(
            catchError(() => {
              this.loading = false;
              this.noResults = true;
              return EMPTY;
            })
          );
        }),
        tap((response) => {
          this.loading = false;
          if (response?.data) {
            this.searchResults = [response.data];
            this.noResults = false;
          } else {
            this.searchResults = [];
            this.noResults = true;
          }
        })
      )
      .subscribe();
  }

  onSearchTermChange(): void {
    if (this.searchQuery.trim().length > 0) {
      this.searchSubject.next(this.searchQuery);
    } else {
      this.searchResults = [];
      this.noResults = false;
    }
  }

  onUserSelect(userId: number): void {
    this.userSelected.emit(userId);
    this.searchQuery = '';
    this.searchResults = [];
    this.noResults = false;
    this.loading = false;
    this.searchSubject.next('');
  }
}
