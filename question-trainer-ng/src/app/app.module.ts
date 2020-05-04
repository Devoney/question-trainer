
import { AppComponent } from './app.component';
import { appReducers } from './store/reducers/app.reducer';
import { AppRoutingModule } from './app-routing.module';
import { BookAddComponent } from './components/library/book/book-add/book-add.component';
import { BookEditComponent } from './components/library/book/book-edit/book-edit.component';
import { BookManagerComponent } from './components/library/book/book-manager/book-manager.component';
import { BookRowComponent } from './components/library/book/book-row/book-row.component';
import { BooksOverviewComponent } from './components/library/book/books-overview/books-overview.component';
import { BottomBarComponent } from './components/layout/bottom-bar/bottom-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getInitialAppState } from './store/state/app.state';
import { HttpClientModule } from '@angular/common/http';
import { I18nContainerComponent } from './components/i18n-container/i18n-container.component';
import { I18nService } from './services/i18n.service';
import { IconButtonComponent } from './components/controls/icon-button/icon-button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
    BookRowComponent,
    BooksOverviewComponent,
    BottomBarComponent,
    ConfirmationDialogComponent,
    I18nContainerComponent,
    IconButtonComponent,
    QuestionListComponent,
    TabPageComponent,
    TabsComponent,
    TopBarComponent,
    ViewModeComponent,
    BookEditComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers, { initialState: getInitialAppState() }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
