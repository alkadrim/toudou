import Vue from 'vue'
import {polyfill} from 'es6-promise'
import App from "@core/App"

import {polyfillLoader} from 'polyfill-io-feature-detection'

polyfillLoader({
  "features":    "Promise",
  "onCompleted": polyfill
});
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach
}

document.addEventListener(
  'readystatechange',
  (event) => {
    if (document.readyState !== 'complete') {
      return false;
    }
    new Vue(
        {
            el:         '#app',
            template:   '<App/>',
            components: {
              App
            }
        }
    )
  })
