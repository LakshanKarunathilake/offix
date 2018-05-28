
import { AeroGearConfiguration, INSTANCE, isCordovaAndroid, isCordovaIOS } from "@aerogear/core";
import axios from "axios";

declare var window: any;
declare var document: any;

/**
 * AeroGear UPS registration SDK
 *
 * Usage:
 * // Initialize SDK first
 * app.init(config);
 * let registration = new PushRegistration();
 * registration.register("myAppleOrFirebaseToken");
 */
export class PushRegistration {

  public static readonly TYPE: string = "push";
  public static readonly API_PATH: string = "rest/registry/device";

  private pushConfig: any;

  constructor() {
    const configuration = INSTANCE.getConfigByType(PushRegistration.TYPE);
    if (!configuration || configuration.length === 0) {
      console.warn("Push configuration is missing. UPS server registration will not work.");
      this.pushConfig = {};
    } else {
      this.pushConfig = configuration[0];
    }
  }

  /**
   * Register deviceToken for Android or IOS platforms
   *
   * @param deviceToken token that will be sent to Unified Push server
   * @param alias device alias used for registration
   * @param categories array list of categories that device should be register to.
   */
  public register(deviceToken: string, alias: string = "", categories: string[] = []): Promise<void> {
    if (!window || !window.device) {
      return Promise.reject("Registration requires cordova plugin. Verify the " +
        "@aerogear/cordova-plugin-aerogear-metrics plugin is installed.");
    }
    if (!this.pushConfig || !this.pushConfig.config || !this.pushConfig.url) {
      return Promise.reject("UPS registration: configuration is invalid");
    }
    let platformConfig;
    const url = this.pushConfig.url;
    if (isCordovaAndroid()) {
      platformConfig = this.pushConfig.config.android;
    } else if (isCordovaIOS()) {
      platformConfig = this.pushConfig.config.ios;
    } else {
      return Promise.reject("UPS registration: Platform is not supported.");
    }

    if (!platformConfig) {
      return Promise.reject("UPS registration: Platform is configured." +
        "Please add UPS variant and generate mobile - config.json again");
    }
    const authToken = window.btoa(`${platformConfig.variantId}:${platformConfig.variantSecret}`);
    const postData = {
      "deviceToken": deviceToken,
      "deviceType": window.device.model,
      "operatingSystem": window.device.platform,
      "osVersion": window.device.version,
      "alias": alias,
      "categories": categories
    };
    const instance = axios.create({
      baseURL: url,
      timeout: 5000,
      headers: { "Authorization": `Basic ${authToken}` }
    });
    return new Promise((resolve, reject) => {
      return instance.post(PushRegistration.API_PATH, postData).then(() => resolve()).catch(reject);
    });
  }
}
