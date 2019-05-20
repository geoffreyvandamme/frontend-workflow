import 'core-js/features/array/from'
import 'promise-polyfill/src/polyfill'

/**
 * Helper class to lazy load components based on DOM elements.
 *
 * If you try to load a component, it will first search for DOM elements that it can apply to.
 * 1: If nothing is found, it will not be loaded, thus saving bandwidth on unneeded JS code
 * 2: If elements are found in the DOM, the component will be loaded and executed on these elements
 *
 * Keep in mind, if you have ajax based navigation, or the DOM is dynamically changed, you'll need to manually
 * load the needed components (preferably in an event listener after the DOM has been updated)
 *
 * This class does not contain all components that are included in this workflow,
 * as some components are not bound on specific elements. These you should add manually.
 */
export class AsyncModuleLoader {
  /**
   * Lazy loads "Accordion" if needed on the page
   */
  public static async loadAccordion(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.fw-accordion')) {
      await import(/* webpackChunkName: "accordion" */ './accordion/index')
    }
  }

  /**
   * Lazy loads "Expandable" if needed on the page
   */
  public static async loadExpandable(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.fw-expandable')) {
      await import(/* webpackChunkName: "expandable" */ './expandable/index')
    }
  }

  /**
   * Lazy loads "InViewAnimation" if needed on the page
   */
  public static async loadInViewAnimation(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.js-in-view-animation')) {
      await import(/* webpackChunkName: "inviewanimation" */ './in-view-animation/index')
    }
  }

  /**
   * Lazy loads "SameHeight" if needed on the page
   */
  public static async loadSameHeight(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.js-sameheight')) {
      await import(/* webpackChunkName: "sameheight" */ './sameheight/index')
    }
  }

  /**
   * Lazy loads "FixedHeader" if needed on the page
   */
  public static async loadFixedNavbar(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.navbar.is-fixed-top')) {
      await import(/* webpackChunkName: "fixedheader" */ './fixed-navbar/index')
    }
  }

  /**
   * Lazy loads "FixedHeader" if needed on the page
   */
  public static async loadBottomNavbar(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.navbar.is-bottom-mobile')) {
      await import(/* webpackChunkName: "bottomnavbar" */ './bottom-navbar/index')
    }
  }

  /**
   * Lazy loads "ResponsiveNavbar" if needed on the page
   */
  public static async loadResponsiveNavbar(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.navbar')) {
      await import(/* webpackChunkName: "responsivenavbar" */ './responsive-navbar/index')
    }
  }

  /**
   * Lazy loads "Slider" if needed on the page
   */
  public static async loadSlider(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.swiper-container')) {
      await import(/* webpackChunkName: "slider" */ './slider/index')
    }
  }

  /**
   * Lazy loads "Gallery" if needed on the page
   */
  public static async loadGallery(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.js-gallery')) {
      await import(/* webpackChunkName: "gallery" */ './gallery/index')
    }
  }

  /**
   * Lazy loads "Parallax" if needed on the page
   */
  public static async loadParallax(): Promise<void> {
    if (AsyncModuleLoader.checkIfElementsExist('.fw-parallax')) {
      await import(/* webpackChunkName: "parallax" */ './parallax/index')
    }
  }

  /**
   * Shortcut to load all components
   */
  public static loadAll() {
    AsyncModuleLoader.loadAccordion()
    AsyncModuleLoader.loadExpandable()
    AsyncModuleLoader.loadInViewAnimation()
    AsyncModuleLoader.loadSameHeight()
    AsyncModuleLoader.loadFixedNavbar()
    AsyncModuleLoader.loadBottomNavbar()
    AsyncModuleLoader.loadResponsiveNavbar()
    AsyncModuleLoader.loadSlider()
    AsyncModuleLoader.loadGallery()
    AsyncModuleLoader.loadParallax()
  }

  /**
   * Searches for elements in DOM matching a specific selector
   *
   * @param {string} selector Selector for DOM elements to search for
   * @returns {boolean} selector TRUE if elements are found, FALSE is not elements are found
   */
  public static checkIfElementsExist(selector: string): boolean {
    return Array.from(document.querySelectorAll(selector)).length !== 0
  }
}
