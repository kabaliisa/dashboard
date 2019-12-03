import { Component, OnInit, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

import { BackdropService } from 'src/app/core/services/backdrop.service';
import { ComponenRegistryService } from 'src/app/core/services/component-registry.service';

@Component({
    selector: 'app-quick-sidebar',
    templateUrl: './quick-sidebar.component.html',
    styleUrls: ['./quick-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuickSidebarComponent implements OnInit {

    opened: boolean;

    constructor(
        // tslint:disable-next-line:variable-name
        private _el: ElementRef,
        private renderer: Renderer2,
        // tslint:disable-next-line:variable-name
        private _backdropService: BackdropService,
        // tslint:disable-next-line:variable-name
        private _componenRegistryService: ComponenRegistryService,
    ) { }

    ngOnInit() {
        // Register the component in registry
        this._componenRegistryService.register('quick-sidebar', this);

        this._backdropService.close.subscribe(() => {
            if (this.opened) {
                this._hideSidebar();
            }
        });
    }

    toggleOpen() {
        if ( this.opened ) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this._backdropService.show();
        this.opened = true;
        this.renderer.addClass(this._el.nativeElement, 'shined');
        document.getElementById('quick-sidebar').classList.add('shined');
    }

    close() {
        this._backdropService.hide();
        this._hideSidebar();
    }

    _hideSidebar() {
        this.opened = false;
        this.renderer.removeClass(this._el.nativeElement, 'shined');
        document.getElementById('quick-sidebar').classList.remove('shined');
    }

}
