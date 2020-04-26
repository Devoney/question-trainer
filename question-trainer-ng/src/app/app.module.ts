
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ViewModeComponent } from './components/layout/view-mode/view-mode.component';
import { TopBarComponent } from './components/layout/top-bar/top-bar.component';
import { BottomBarComponent } from './components/layout/bottom-bar/bottom-bar.component';
import { QuestionListComponent } from './components/question/question-list/question-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewModeComponent,
    TopBarComponent,
    BottomBarComponent,
    QuestionListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
