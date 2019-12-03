import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, Renderer2, HostBinding, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ThemeConfigService } from '../../../../../app/core/services/theme-config.service';
import { ComponenRegistryService } from '../../../../../app/core/services/component-registry.service';
import { BackdropService } from '../../../../../app/core/services/backdrop.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {

    themeConfig: any;
    // tslint:disable-next-line:variable-name
    _SidebarDrawerMode = false;
    // tslint:disable-next-line:variable-name
    _sidebarAlwaysDrawerMode = false;
    // tslint:disable-next-line:variable-name
    _folded = false;
    opened: boolean;

    constructor(
        // tslint:disable-next-line:variable-name
        private _el: ElementRef,
        private renderer: Renderer2,
        // tslint:disable-next-line:variable-name
        private _backdropService: BackdropService,
        // tslint:disable-next-line:variable-name
        public _themeConfigService: ThemeConfigService,
        // tslint:disable-next-line:variable-name
        private _componenRegistryService: ComponenRegistryService,
    ) { }

    ngOnInit() {
        this._themeConfigService._configSubject
            .subscribe((config) => {
                this.themeConfig = config;
                this._sidebarAlwaysDrawerMode = config.layout.sidebar.always_drawer_mode;
            });

        // Register the component in registry
        this._componenRegistryService.register('sidenav', this);

        this._sidebarAlwaysDrawerMode
            ? this._setDrawerSidebarMode()
            : this.toggleDrawerSidebarMode();

        this._backdropService.close.subscribe(() => {
            if (this._SidebarDrawerMode && this.opened) {
                this._hideSidebar();
            }
        });
    }

    ngOnDestroy() {
        this.hide();
    }

    ngAfterViewInit() {}

    sidebarToggleHandler() {
        if (this._SidebarDrawerMode) {
            // this.toggleDrawerSidebar();
        } else {
            document.body.classList.toggle('mini-sidebar');
        }
    }


    toggleDrawerSidebar() {
        if ( this.opened ) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        if ( !this._SidebarDrawerMode ) { return; }

        this._backdropService.show();
        this._showSidebar();
    }

    hide() {
        if ( !this._SidebarDrawerMode ) { return; }

        this._backdropService.hide();
        // this._hideSidebar();
    }

    _showSidebar() {
        this.opened = true;

        this.renderer.addClass(this._el.nativeElement, 'shined');
        document.getElementById('sidebar').classList.add('shined');
    }

    _hideSidebar() {
        if ( this.opened ) {
            this.opened = false;

            this.renderer.removeClass(this._el.nativeElement, 'shined');
            document.getElementById('sidebar').classList.remove('shined');
        }
    }


    toggleDrawerSidebarMode() {
        if ( this._sidebarAlwaysDrawerMode ) {
            return;
        }

        if (this._canSetDrawerMode() && !this._SidebarDrawerMode) {
            this._setDrawerSidebarMode();
        } else if ( !this._canSetDrawerMode() && this._SidebarDrawerMode) {
            this._removeDrawerSidebarMode();
        }
    }

    _setDrawerSidebarMode() {
        document.body.classList.add('drawer-sidebar');
        this._SidebarDrawerMode = true;
    }

    _removeDrawerSidebarMode() {
        document.body.classList.remove('drawer-sidebar');
        this._SidebarDrawerMode = false;
    }

    _canSetDrawerMode() {
        return (window.innerWidth < 992 && !document.body.classList.contains('mini-sidebar'));
    }

    @HostListener('window:resize')
    onResize() {
        this.toggleDrawerSidebarMode();
    }

}
