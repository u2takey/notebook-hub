import * as AV from 'leancloud-storage';
import { Injectable } from '@angular/core';
import { Repo, Notebook } from '../model/model';

@Injectable()
export class Service {
  constructor() {
    AV.init({
      appId: '9WCV6neWEfwrmbDMBnQxPG2l-gzGzoHsz',
      appKey: 'exaM75bUxc7aNzRjGvw5kXXm'
    });
  }

  getRepos(offset, limit: number, q: string): Promise<any[]> {
    const q1 = new AV.Query('repos');
    const q2 = new AV.Query('repos');
    if (q !== '') {
      q1.contains('repo.description', q);
      q2.containsAll('tags', [q]);
    }
    const query = AV.Query.or(q1, q2);
    query.limit(limit);
    query.skip(offset);
    return query.find();
  }

  getRepo(q: string): Promise<any> {
    const query = new AV.Query('repos');
    query.equalTo("repo.full_name", q);
    return query.first();
  }

  getReposCount(q: string): Promise<number> {
    const q1 = new AV.Query('repos');
    const q2 = new AV.Query('repos');
    if (q !== '') {
      q1.contains('repo.description', q);
      q2.containsAll('tags', [q]);
    }
    const query = AV.Query.or(q1, q2);
    return query.count();
  }

  getNotebooksCount(q: string): Promise<number> {
    const query = new AV.Query('notebooks');
    query.equalTo('repo', q);
    return query.count();
  }

  getNotebooks(offset, limit: number, q: string): Promise<any[]> {
    const query = new AV.Query('notebooks');
    query.equalTo('repo', q);
    query.limit(limit);
    query.skip(offset);
    return query.find();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
