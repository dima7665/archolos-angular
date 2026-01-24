import { Component, input } from "@angular/core";
import { MatButtonAppearance, MatButton } from '@angular/material/button';

@Component({
    selector: 'btn',
    template: '<button [matButton]="type()"><ng-content></ng-content></button>',
    imports: [MatButton]
})
export class ButtonComponent {
    public readonly type = input<'' | MatButtonAppearance>('')
}
