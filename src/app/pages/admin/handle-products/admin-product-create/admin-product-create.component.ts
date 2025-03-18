import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../../shared/components/products/data-access/product.service';
import { Url } from 'url';

@Component({
  selector: 'app-admin-product-create',
  imports: [NgIf, ReactiveFormsModule, FormsModule, NgFor],
  templateUrl: './admin-product-create.component.html',
  styleUrl: './admin-product-create.component.css',
})
export class AdminProductCreateComponent implements OnInit {
  productForm!: FormGroup;
  images: File[] = [];
  imagesUrl: string[] = [];
  isSubmitting = false;

  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(5000)]],
      offer: [null, Validators.min(0)],
      description: ['', [Validators.required, Validators.minLength(10)]],
      availableStock: [null, [Validators.required, Validators.min(1)]],
      minimumStock: [0, [Validators.required, Validators.min(0)]],
    });
  }

  formatInput(controlName: 'price' | 'offer', event: any): void {
    const input = event.target.value.replace(/\D/g, '');
    const numericValue = parseFloat(input) || 0;

    this.productForm.get(controlName)?.setValue(numericValue);
    event.target.value = this.formatCurrency(numericValue);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  onImageUpload(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      for (const file of Array.from(target.files)) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.images.push(file);
          this.imagesUrl.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    if (this.images.length === 0) {
      alert('No has seleccionado ninguna imagen');
      return;
    }

    if (this.images.some(image => image.size > 5 * 1024 * 1024)) {
      alert('El tamaño máximo permitido por imagen es de 5 MB');
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('price', String(Number(this.productForm.value.price)));
    formData.append('offer', this.productForm.value.offer ? String(Number(this.productForm.value.offer)) : ''); 
    formData.append('description', this.productForm.value.description);
    formData.append('available_stock', String(Number(this.productForm.value.availableStock)));
    formData.append('minimum_stock', this.productForm.value.minimumStock ? String(Number(this.productForm.value.minimumStock)) : '');
  
    this.images.forEach((image, index) => {
      formData.append('images', image);
    });
    
    this.productService.createProduct(formData).subscribe({
      next: product => {
        console.log('Product creado exitosamente.', product);
        alert('Producto creado exitosamente');
        this.productForm.reset();
        this.images = [];
        this.isSubmitting = false;
      },
      error: e => {
        console.error('Error al crear producto.', e);
        alert('Error al crear el producto');
      }
    });
  }
}
