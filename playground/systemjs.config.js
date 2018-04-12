'use strict';
/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function () {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': '../node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
      'tslib': 'npm:tslib/tslib.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      rxjs: 'npm:rxjs',
      'ngx-bootstrap': 'npm:ngx-bootstrap/bundles/ngx-bootstrap.umd.min.js',
      'ngx-md': 'npm:ngx-md/bundles/ngx-md.umd.min.js',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'dexih-ngx-components': '../dist'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      '.': {
        defaultExtension: 'js'
      },
      app: {
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'dexih-ngx-components': {
        main: 'dexih-ngx-components.umd.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
