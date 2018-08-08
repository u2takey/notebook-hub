import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Repo, Page, Notebook} from './model/model';
import {Service} from './service/service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-repo-detail',
  templateUrl: './repo.detail.html',
  styleUrls: ['./app.component.css']
})
export class RepoDetailComponent implements OnInit {
  notebooks: Notebook[];
  repo: any = new Repo;
  page: Page = new Page();
  lastKeypress: number;
  repoName: string;
  searchTerm$ = new Subject<string>();
  constructor(
    private ref: ChangeDetectorRef,
    private service: Service,
    private route: ActivatedRoute
  ) {
    this.page.size = 20;
    this.page.totalElements = 0;
    this.page.totalPages = 0;
    this.page.pageNumber = 0;
  }
  ngOnInit(): void {
    this.repoName = this.route.snapshot.paramMap.get('repo');

    this.service.getNotebooksCount(this.repoName).then(count => {
      this.page.totalElements = count;
      this.page.totalPages = count / this.page.size;
      this.setPage({ offset: 0 });
    });
    this.service.getRepo(this.repoName).then(repo => {
      this.repo = repo;
    });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    const offset = this.page.pageNumber * this.page.size;
    this.service
      .getNotebooks(offset, this.page.size, this.repoName)
      .then(
        notebooks => {
          this.notebooks = notebooks;
          this.ref.detectChanges();
        },
        err => {
          console.log(err);
        }
      );
  }
}
