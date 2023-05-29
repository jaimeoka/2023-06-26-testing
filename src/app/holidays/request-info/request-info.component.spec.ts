import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { asyncScheduler, scheduled } from 'rxjs';
import { RequestInfoComponent } from './request-info.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AddressLookuper, Configuration } from '@app/shared';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { By } from '@angular/platform-browser';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Request Info Component', () => {
  it('should find an address', fakeAsync(() => {
    const lookuper = {
      lookup: (query: string) =>
        scheduled([query === 'Domgasse 5'], asyncScheduler),
    };
    const fixture = TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RequestInfoComponent],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        { provide: AddressLookuper, useValue: lookuper },
        {
          provide: Configuration,
          useValue: { baseUrl: 'http://localhost:4200' },
        },
      ],
    }).createComponent(RequestInfoComponent);
    const input = fixture.debugElement.query(By.css('[data-testid=ri-address]'))
      .nativeElement as HTMLInputElement;
    const button = fixture.debugElement.query(By.css('[data-testid=ri-search]'))
      .nativeElement as HTMLButtonElement;

    fixture.detectChanges();
    flush();

    input.value = 'Domgasse 5';
    input.dispatchEvent(new Event('input'));
    button.click();
    tick();
    fixture.detectChanges();

    const lookupResult = fixture.debugElement.query(
      By.css('[data-testid=ri-message]')
    ).nativeElement as HTMLButtonElement;
    expect(lookupResult.textContent).toContain('Brochure sent');
  }));

  it('should do an integration test for Domgasse 5', fakeAsync(() => {
    const fixture = TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RequestInfoComponent],
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: Configuration,
          useValue: { baseUrl: 'http://localhost:4200' },
        },
      ],
    }).createComponent(RequestInfoComponent);
    const input = fixture.debugElement.query(By.css('[data-testid=ri-address]'))
      .nativeElement as HTMLInputElement;
    const button = fixture.debugElement.query(By.css('[data-testid=ri-search]'))
      .nativeElement as HTMLButtonElement;

    fixture.detectChanges();
    flush();

    input.value = 'Domgasse 5';
    input.dispatchEvent(new Event('input'));
    button.click();
    TestBed.inject(HttpTestingController)
      .expectOne((req) => !!req.url.match(/nominatim/))
      .flush([true]);
    tick();
    fixture.detectChanges();

    const lookupResult = fixture.debugElement.query(
      By.css('[data-testid=ri-message]')
    ).nativeElement as HTMLButtonElement;
    expect(lookupResult.textContent).toContain('Brochure sent');
  }));
});
