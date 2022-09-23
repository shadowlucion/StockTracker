import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { SensexComponent } from './sensex/sensex.component';
import {FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSliderModule } from '@angular/material/slider';
import {ReactiveFormsModule} from '@angular/forms';
// import { UserComponent } from './user/user.component';
// import { HomeComponent } from './home/home.component';
// import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { NoPageComponent } from './no-page/no-page.component';
// import { SingleUserComponent } from './single-user/single-user.component';
// import { AboutMeComponent } from './about-me/about-me.component';
// import { AboutCompanyComponent } from './about-company/about-company.component'
import { HttpClientModule } from '@angular/common/http';
// import { SocketIoModule,SocketIoConfig} from 'ngx-socket-io'


// const config: SocketIoConfig = {
//   url:environment.socketUrl,
//   options:{transports: ['websocket']
//   }
// }

@NgModule({
  declarations: [
    AppComponent,
    // SensexComponent,
    // HeaderComponent,
    // ChildComponent,
    // UserDetailComponent,
    // UserComponent,
    // HomeComponent,
    // AboutComponent,
    NoPageComponent,
    // SingleUserComponent,
    // AboutMeComponent,
    // AboutCompanyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
