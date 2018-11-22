import { NgModule } from '@angular/core';

import { WisevetSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [WisevetSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [WisevetSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class WisevetSharedCommonModule {}
