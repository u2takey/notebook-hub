import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {Service} from './service/service';
import {RepoListComponent} from './repo.list';
import {RepoDetailComponent } from './repo.detail';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AppRoutingModule} from './app.route';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule
} from '@angular/material';

// In your App's module:
@NgModule({
  declarations: [AppComponent, RepoListComponent, RepoDetailComponent],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule
  ],
  exports: [MatButtonModule, MatToolbarModule, MatCardModule],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule {}
