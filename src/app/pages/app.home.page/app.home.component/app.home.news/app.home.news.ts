/**
 * @file app.home.news.ts
 * @author zhouminghui
 * @description 新闻
*/

import {Component, AfterViewChecked, OnInit} from '@angular/core';
import { FontFamliyService } from '../../../../shared/font-famliy.service';
import { CookieService } from 'ngx-cookie';
import { LanguageService } from '../../../../shared/language.service';

@Component({
    selector: 'app-home-news',
    templateUrl: './app.home.news.html',
    styleUrls: ['./app.home.news.css']
})

export class HomeNewsComponent implements AfterViewChecked, OnInit {
    public currentLanguage = this._cookieService.get('SelectedLanguage');
    public languageList = ['', ''];
    public languagesDic: any;

    constructor(
        private _languageService: LanguageService,
        private _cookieService: CookieService,
        public _fontFamlily: FontFamliyService
    ) {}

    ngOnInit(): void {
        this._languageService
            .getLanguageConfig()
            .subscribe(data => {
            this.currentLanguage =
                data['languagesDic2'][
                this._languageService.getWebPageCurrentLanguage()
                ];
            console.log(this.currentLanguage);
            this._fontFamlily.changeFontFamily(
                this.currentLanguage
            );
        });
    }

    ngAfterViewChecked() {
        // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: xxxxxxxxx
        // 这里需要注意的是，变更检测和验证摘要是同步执行的，这意味着如果我们异步更新属性
        // 当验证循环正在运行中时，属性值不会变化更新，应用也就不会抛出错误了。
        // https://www.cnblogs.com/xudengwei/p/9214959.html
        if (this._cookieService.get('SelectedLanguage')) {
            if (this.currentLanguage !== this._cookieService.get('SelectedLanguage')) {
                setTimeout(() => {
                    this.currentLanguage = this._cookieService.get('SelectedLanguage');
                });
            }
        }
    }

}
