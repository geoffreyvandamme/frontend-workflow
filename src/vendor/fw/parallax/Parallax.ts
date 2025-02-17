/**
 * V: 0.1.2
 */

import {Factory} from './../../base/js/Factory'

/**
 * Basic parallax functionality based on window scroll position
 */
export class Parallax extends Factory() {
  public static attached: boolean = false
  public static shouldAnimate: boolean = false
  public static timeout: number | null = null

  public static className: string = 'Parallax'

  constructor(el: Element) {
    super(el)
  }

  public update(offset: number): void {
    const depth: number = parseFloat(this.el.getAttribute('data-depth') || '0.5')
    const translate3d: string = `translate3d(0, ${(offset * depth).toFixed(5)}px, 0)`

    if (this.el instanceof HTMLElement) {
      this.el.style.transform = translate3d
    }
  }

  public static attach(selector: string, ...restArgs: any[]): void {
    super.attach(selector, ...restArgs)

    // Only activate this logic once per page
    if (Parallax.attached === false) {
      // Only activate the animation if user has scrolled
      window.addEventListener('scroll', () => {
        // If currently not animating, start animation
        if (Parallax.shouldAnimate === false) {
          Parallax.shouldAnimate = true
          Parallax.updateInstances()
        }

        // If previous timeout is set, clear it
        if (Parallax.timeout !== null) {
          window.clearTimeout(Parallax.timeout)
        }

        // Set timeout to stop the animation after a set time
        Parallax.timeout = window.setTimeout(() => {
          Parallax.shouldAnimate = false
          Parallax.timeout = null
        }, 100)
      })

      // Preset position (needed if a user refreshes the page after scroll, the top will be preset by the browser)
      Parallax.updateInstances()
      Parallax.attached = true
    }
  }

  /**
   * Updates all instances
   */
  public static updateInstances(): void {
    const offset: number = window.pageYOffset || document.documentElement.scrollTop

    Parallax.instances.forEach(instance => {
      instance.update(offset)
    })

    // Do not request a new frame if the animation should be stopped
    if (Parallax.shouldAnimate === true) {
      window.requestAnimationFrame(Parallax.updateInstances.bind(this))
    }
  }
}
