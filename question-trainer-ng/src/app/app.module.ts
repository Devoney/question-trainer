
import { AppComponent } from './app.component';
import { appReducers } from './store/reducers/app.reducer';
import { AppRoutingModule } from './app-routing.module';
import { BookAddComponent } from './components/library/book/book-add/book-add.component';
import { BookManagerComponent } from './components/library/book/book-manager/book-manager.component';
import { BookRowComponent } from './components/library/book/book-row/book-row.component';
import { BooksOverviewComponent } from './components/library/book/books-overview/books-overview.component';
import { BottomBarComponent } from './components/layout/bottom-bar/bottom-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getInitialAppState } from './store/state/app.state';
import { HttpClientModule } from '@angular/common/http';
import { IconButtonComponent } from './components/controls/icon-button/icon-button.component';
import { NgModule } from '@angular/core';
import { QuestionListComponent } from './components/question/question-list/question-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { TabPageComponent } from './components/layout/tab-page/tab-page.component';
import { TabsComponent } from './components/layout/tabs/tabs.component';
import { TopBarComponent } from './components/layout/top-bar/top-bar.component';
import { ViewModeComponent } from './components/layout/view-mode/view-mode.component';

@NgModule({
  declarations: [
    AppComponent,
    BookAddComponent,
    BookManagerComponent,
    BottomBarComponent,
    QuestionListComponent,
    TabPageComponent,
    TabsComponent,
    TopBarComponent,
    ViewModeComponent,
    BooksOverviewComponent,
    BookRowComponent,
    IconButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers, { initialState: getInitialAppState() }),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
