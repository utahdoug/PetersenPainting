import { Component } from '@angular/core';

@Component({
    selector: 'top-menu',
    templateUrl: './topmenu.component.html',
    styleUrls: ['./topmenu.component.scss']
})

export class TopMenuComponent {
    today = new Date();
}