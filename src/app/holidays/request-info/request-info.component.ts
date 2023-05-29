import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AddressLookuper, validateAddress } from '@app/shared';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-request-info',
  templateUrl: './request-info.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    NgIf,
    AsyncPipe,
    NgStyle,
    RouterLink,
  ],
})
export class RequestInfoComponent implements OnInit {
  @Input() address = '';
  @Output() brochureSent = new EventEmitter<string>();

  #lookuper = inject(AddressLookuper);
  #formBuilder = inject(NonNullableFormBuilder);

  protected lookupResult = signal('');
  protected formGroup = this.#formBuilder.group({
    address: ['', [validateAddress]],
  });

  ngOnInit(): void {
    if (this.address) {
      this.formGroup.setValue({ address: this.address });
    }
  }

  async search() {
    const isValid = await firstValueFrom(
      this.#lookuper.lookup(this.formGroup.getRawValue().address)
    );
    this.lookupResult.set(isValid ? 'Brochure sent' : 'Address not found');
  }
}
