import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {ConfigService} from './demo/service/app.config.service';
import {AppConfig} from './demo/domain/appconfig';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-config',
    template: `
        <div class="layout-config" (click)="appMain.onConfigClick($event)">
            <a style="cursor: pointer" id="layout-config-button" class="layout-config-button" (click)="onConfigButtonClick($event)">
                <i class="pi pi-cog"></i>
            </a>
            <a style="cursor: pointer" class="layout-config-close" (click)="onConfigCloseClick($event)">
                <i class="pi pi-times"></i>
            </a>
            <div class="layout-config-content">
                <div class="px-3 pt-3">
                    <h5>Theme Customization</h5>
                    <span>Serenity offers different themes for layout, topbar, menu etc.</span>
                </div>

                <hr class="mb-0" />

                <div class="layout-config-options p-3">
                    <h6>Special Layouts</h6>
                    <div class="layout-themes">
                        <div *ngFor="let specialLayout of specialLayoutColors">
                            <a style="cursor: pointer" (click)="changeLayout(specialLayout.label)">
                                <img src="assets/layout/images/configurator/layout/special/{{specialLayout.image}}.png"
                                     [alt]="specialLayout.label"/>
                                <i class="pi pi-check" *ngIf="layout === specialLayout.label"></i>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `
})
export class AppConfigComponent implements OnInit, OnDestroy {

    themes: any[] | undefined;

    themeColor = 'deeppurple';

    layout = 'deeppurple';

    flatLayoutColors: any[] | undefined;

    specialLayoutColors: any[] | undefined;

    config: AppConfig | undefined;

    subscription: Subscription | undefined;

    constructor(public app: AppComponent, public appMain: AppMainComponent, public configService: ConfigService) {
    }

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
        });

        this.flatLayoutColors = [
            {name: 'Amber Pink', label: 'amber', color: '#FFB300'},
            {name: 'Blue Amber', label: 'blue', color: '#1E88E5'},
            {name: 'Blue Grey Green', label: 'bluegrey', color: '#607D8B'},
            {name: 'Brown Cyan', label: 'brown', color: '#795548'},
            {name: 'Cyan Amber', label: 'cyan', color: '#00BCD4'},
            {name: 'Deep Orange Cyan', label: 'deeporange', color: '#F4511E'},
            {name: 'Deep Purple Orange', label: 'deeppurple', color: '#5E35B1'},
            {name: 'Green Brown', label: 'green', color: '#43A047'},
            {name: 'Grey Indigo', label: 'grey', color: '#757575'},
            {name: 'Indigo Pink', label: 'indigo', color: '#3f51b5'},
            {name: 'Light Blue Blue Grey', label: 'lightblue', color: '#03A9F4'},
            {name: 'Light Green Purple', label: 'lightgreen', color: '#7CB342'},
            {name: 'Lime Blue Grey', label: 'lime', color: '#C0CA33'},
            {name: 'Orange Indigo', label: 'orange', color: '#FB8C00'},
            {name: 'Pink Amber', label: 'pink', color: '#D81B60'},
            {name: 'Purple Pink', label: 'purple', color: '#8E24AA'},
            {name: 'Teal Red', label: 'teal', color: '#009688'},
            {name: 'Yellow Teal', label: 'yellow', color: '#FBC02D'},
        ];
        this.specialLayoutColors = [
            {image: 'reflection', label: 'reflection'},
            {image: 'moody', label: 'moody'},
            {image: 'cityscape', label: 'cityscape'},
            {image: 'cloudy', label: 'cloudy'},
            {image: 'storm', label: 'storm'},
            {image: 'palm', label: 'palm'},
            {image: 'flatiron', label: 'flatiron'}
        ];
        this.themes = [
            {name: 'amber', color: '#FFB300'},
            {name: 'blue', color: '#2196F3'},
            {name: 'bluegrey', color: '#607D8B'},
            {name: 'brown', color: '#4E342E'},
            {name: 'cyan', color: '#00BCD4'},
            {name: 'deeppurple', color: '#673AB7'},
            {name: 'deeporange', color: '#FF5722'},
            {name: 'green', color: '#4CAF50'},
            {name: 'grey', color: '#757575'},
            {name: 'indigo', color: '#3F51B5'},
            {name: 'lightblue', color: '#03A9F4'},
            {name: 'lightgreen', color: '#8BC34A'},
            {name: 'lime', color: '#CDDC39'},
            {name: 'orange', color: '#FF9800'},
            {name: 'pink', color: '#E91E63'},
            {name: 'purple', color: '#9C27B0'},
            {name: 'teal', color: '#009688'},
            {name: 'yellow', color: '#FFEB3B'},
        ];
    }

    onLayoutColorChange(event : any, color: any) {
        this.app.layoutColor = color;
        this.app.darkMenu = color === 'dark';

        const themeLink = document.getElementById('theme-css');
        const urlTokens = themeLink?.getAttribute('href')?.split('/') ?? [];
        const newURL = urlTokens.join('/');
        
        this.replaceLink(themeLink, newURL);
        this.configService.updateConfig({...this.config, ...{dark: color.indexOf("light") === -1}});
    }

    changeTheme(theme : any) {
        this.themeColor = theme;

        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const themeHref = 'assets/theme/' + theme + '/theme-' + this.app.layoutColor + '.css';
        this.replaceLink(themeLink, themeHref);
    }

    changeLayout(layout : any) {
        this.layout = layout;

        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const layoutHref = 'assets/layout/css/layout-' + layout + '.css';
        this.replaceLink(layoutLink, layoutHref);
    }

    replaceLink(linkElement : any, href : any) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    onConfigButtonClick(event : any) {
        this.appMain.configActive = !this.appMain.configActive;
        event.preventDefault();
    }

    onConfigCloseClick(event : any) {
        this.appMain.configActive = false;
        event.preventDefault();
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    ngOnDestroy(){
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }
}
