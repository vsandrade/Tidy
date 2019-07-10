// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TooltipModule, ModalModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

// Services
import { CustomerService } from './_services/customer.service';
import { FormService } from './_services/form.service';
import { NgxSpinnerService } from 'ngx-spinner';

// Pipes
import { DateTimeFormatPipePipe } from './_helpers/DateTimeFormatPipe.pipe';

// Components
import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';


@NgModule({
   declarations: [
      AppComponent,
      CustomersComponent,
      NavComponent,
      DateTimeFormatPipePipe,
      HomeComponent,
      AboutComponent
   ],
   imports: [
      BrowserModule,
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      NgxMaskModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      NgxSpinnerModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        timeOut: 3500,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        progressBar: true,
        closeButton: true
      })
   ],
   providers: [
      CustomerService,
      FormService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
