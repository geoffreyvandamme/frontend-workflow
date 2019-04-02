// import Settings from './Settings';

let instance: Site | null = null
export class Site {
  constructor() {
    if (!instance) {
      instance = this
    }

    // Add your stuff here
  }

  public static getInstance(): Site {
    if (instance === null) {
      instance = new Site()
    }

    return instance
  }
}
