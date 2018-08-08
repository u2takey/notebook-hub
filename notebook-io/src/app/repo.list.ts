import {Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Repo, Page } from './model/model';
import { Service } from './service/service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo.list.html',
  styleUrls: ['./app.component.css']
})
export class RepoListComponent implements OnInit {
  repos: Repo[];
  page: Page = new Page();
  lastKeypress: number;
  searchTerm$ = new Subject<string>();
  constructor(
    private ref: ChangeDetectorRef,
    private service: Service,
    private router: Router,
  ) {
    this.page.size = 20;
    this.page.totalElements = 0;
    this.page.totalPages = 0;
    this.page.pageNumber = 0;
    this.search(this.searchTerm$);
  }
  ngOnInit(): void {
    this.service.getReposCount('').then(count => {
      this.page.totalElements = count;
      this.page.totalPages = count / this.page.size;
      this.setPage({ offset: 0 });
    });
  }

  search(terms: Observable<string>) {
    return terms
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe(q => {
        this.service.getReposCount(q).then(count => {
          this.page.totalElements = count;
          this.page.totalPages = count / this.page.size;
          this.setPage({ offset: 0 }, q);
        });
      });
  }

  setPage(pageInfo, query: string = '') {
    this.page.pageNumber = pageInfo.offset;
    const offset = this.page.pageNumber * this.page.size;
    this.service.getRepos(offset, this.page.size, query).then(
      repos => {
        repos.forEach((r, index) => {
          repos[index]['encode_full_name'] = encodeURIComponent(r.get('repo')['full_name']);
          // console.log(repos[index]["encode_full_name"]);
        });
        this.repos = repos;

        this.ref.detectChanges();
      },
      err => {
        console.log(err);
      }
    );
  }
}
