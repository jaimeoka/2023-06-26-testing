import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { asyncScheduler, scheduled } from 'rxjs';
import { RequestInfoComponent } from './request-info.component';
import { RequestInfoComponentHarness } from './request-info.component.harness';
import { AddressLookuper } from '@app/shared';
import { provideRouter } from '@angular/router';

describe('Request Info Component', () => {
  it('should find an address', async () => {
    const lookuper = {
      lookup: (query: string) =>
        scheduled([query === 'Domgasse 5'], asyncScheduler),
    };
    const fixture = TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RequestInfoComponent],
      providers: [
        provideRouter([]),
        { provide: AddressLookuper, useValue: lookuper },
      ],
    }).createComponent(RequestInfoComponent);
    const harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      RequestInfoComponentHarness
    );

    await harness.writeAddress('Domgasse 5');
    await harness.search();
    expect(await harness.getResult()).toBe('Brochure sent');
  });
});
