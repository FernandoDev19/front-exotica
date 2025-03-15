import { ChangeDetectionStrategy, Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './checkout-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutFormComponent implements OnInit {
  public checkoutForm!: FormGroup;
  private fb = inject(FormBuilder);
  protected confirm = output();

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(199)]],
      address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(7), Validators.maxLength(20),]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      department: ['', [Validators.required, Validators.maxLength(50)]],
      postal_code: ['', [Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]]
    });
  }
}
