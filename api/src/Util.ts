export interface BrowserParams {
	browser: string;
	majorVersion: number;
}

export class Util {
	static getBrowserWithMajorVersion(userAgent: string): BrowserParams {
		let browser; let version; let verOffset; let ix; let majorVersion;

		if ((verOffset = userAgent.indexOf("Edge")) > -1) {
			browser = "Edge";
			version = userAgent.substring(verOffset + 5);
		} else if ((verOffset = userAgent.indexOf("Opera")) !== -1 || (verOffset = userAgent.indexOf("OPR")) !== -1) {
			browser = "Opera";

			// Opera Next
			if (userAgent.indexOf("OPR") !== -1) {
				version = userAgent.substring(verOffset + 4);
			} else {
				version = userAgent.substring(verOffset + 6);
				if ((verOffset = userAgent.indexOf("Version")) !== -1) {
					version = userAgent.substring(verOffset + 8);
				}
			}
		} else if ((verOffset = userAgent.indexOf("Chrome")) !== -1) {
			browser = "Chrome";
			version = userAgent.substring(verOffset + 7);
		} else if ((verOffset = userAgent.indexOf("Safari")) !== -1) {
			browser = "Safari";

			version = userAgent.substring(verOffset + 7);
			if ((verOffset = userAgent.indexOf("Version")) !== -1) {
				version = userAgent.substring(verOffset + 8);
            }
		} else if ((verOffset = userAgent.indexOf("Firefox")) !== -1) {
			browser = "Firefox";
			version = userAgent.substring(verOffset + 8);
		} else if ((verOffset = userAgent.indexOf("MSIE")) !== -1 || userAgent.indexOf("Trident/") !== -1) {
			browser = "IE";

			if (userAgent.indexOf("MSIE") !== -1) {
				version = userAgent.substring(verOffset + 5);
			} else {
				version = userAgent.substring(userAgent.indexOf("rv:") + 3);
			}
		} else {
			browser = "Unknown";
			version = "";
		}

		// trim the version string
		if ((ix = version.indexOf(";")) !== -1) { version = version.substring(0, ix); }
		if ((ix = version.indexOf(" ")) !== -1) { version = version.substring(0, ix); }
		if ((ix = version.indexOf(")")) !== -1) { version = version.substring(0, ix); }

		majorVersion = parseInt("" + version, 10);

		return {
			browser,
			majorVersion,
		};
	}

	static getOsType(userAgent: string): string {
		if (userAgent.indexOf("Linux") > -1) {
            return "Linux";
		} else if (userAgent.indexOf("Mac") !== -1) {
		    return "Mac Os X";
		} else if (userAgent.indexOf("Win") !== -1) {
		    return "Windows";
		} else {
		    return "Unknown";
		}
	}
}
