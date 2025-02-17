// Import Site singleton where the site logic is located
import 'bootstrap'
import {Site} from './project/Site'
import {FreshContentNotification} from './vendor/fw/fresh-content-notification/FreshContentNotification'
import {Workbox} from 'workbox-window/build/workbox-window.prod.umd'

// Import base styles
import './index.scss'

// Initialize Site
// We do not store this variable as it's not needed in "window" object or anywhere in this file
// This is a singleton and if you need this, just run getInstance again.
Site.getInstance()

// Update HTML class to show user has JS enabled
document.documentElement.classList.remove('no-js')
document.documentElement.classList.add('js')

// Service worker init. This will be removed from code on build if you turn off the service worker in package.json
if (__SERVICE_WORKER_ACTIVE__) {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js')

    wb.addEventListener('waiting', () => {
      const notificationContent =
        document.documentElement.getAttribute('data-fresh-content-notification-text') !== null
          ? document.documentElement.getAttribute('data-fresh-content-notification-text')
          : undefined

      FreshContentNotification.show(notificationContent, 5000)

      wb.messageSW({type: 'SKIP_WAITING'})
    })

    wb.register()
  }
}
