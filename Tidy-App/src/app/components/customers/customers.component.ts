import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { CustomerService } from '../../_services/customer.service';
import { Customer } from '../../_models/Customer';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormService } from 'src/app/_services/form.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {

  CustomersFiltered: Customer[];
  Customers: Customer[];
  customer: Customer;
  textFilter: string;
  msnDeleteCustomer: string;
  registerForm: FormGroup;
  modeSave = 'postCustomer';

  private unsubscriber = new Subject();

  constructor(
      private customerService: CustomerService
    , private fb: FormBuilder
    , private toastr: ToastrService
    , private formService: FormService
    , private spinner: NgxSpinnerService
  ) { }

  get TextFilter(): string {
    return this.textFilter;
  }

  set TextFilter(value: string) {
    this.textFilter = value;
    this.CustomersFiltered = this.textFilter ? this.customersFilter(this.TextFilter) : this.Customers;
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  customersFilter(filterBy: string): Customer[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.Customers.filter(
      customer => customer.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  ngOnInit() {
    this.validation();
    this.fetchCustomers();
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  validation() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.required]]
    });
  }

  saveCustomer(template: any) {
    if (this.registerForm.valid) {
      this.spinner.show();

      if (this.modeSave === 'postCustomer')
        this.customer = {...this.registerForm.value};
      else
        this.customer = {id: this.customer.id, ...this.registerForm.value};

      this.customerService[this.modeSave](this.customer)
        .pipe(takeUntil(this.unsubscriber))
        .subscribe(
        () => {
          template.hide();
          this.fetchCustomers();
          this.toastr.success('Customer Saved Successfully!');
        }, (error: any) => {
          this.toastr.error(`Error: Customer cannot be saved!`);
          console.error(error);
        }
      ).add(() => this.spinner.hide());

    }
  }

  deleteCustomer(customer: Customer, template: any) {
    this.openModal(template);
    this.customer = customer;
    this.msnDeleteCustomer = `Are you sure that you want to delete CUSTOMER: ${customer.name} ID: ${customer.id}`;
  }

  confirmDelete(template: any) {
    this.spinner.show();
    this.customerService.deleteCustomer(this.customer.id)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => {
        template.hide();
        this.fetchCustomers();
        this.toastr.success('Customer Deleted Successfully.');
      }, (error: any) => {
        this.toastr.error('Error: Deleted Unsuccessfully');
        console.error(error);
      }
    );
  }

  editCustomer(customer: Customer, template: any) {
    this.modeSave = 'putCustomer';
    this.openModal(template);
    this.customer = Object.assign({}, customer);
    this.registerForm.patchValue(this.customer);
    this.formService.markFormGroupTouched(this.registerForm);
  }

  newCustomer(template: any) {
    this.modeSave = 'postCustomer';
    this.openModal(template);
  }

  fetchCustomers() {
    this.spinner.show();
    this.customerService.getAllCustomers()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((customer: Customer[]) => {
        this.Customers = customer;
        this.CustomersFiltered = customer;
        this.toastr.success('Customers were loaded successfully!');
      }, (error: any) => {
        this.toastr.error('Customers were not loaded!');
        console.log(error);
      }
    ).add(() => this.spinner.hide());
  }

  isFieldValid(field: string) {
    return this.registerForm.get(field).errors && this.registerForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }



}
