export class Util {
	static getBrowserType(userAgent: string): string {
		if (userAgent.indexOf("Edge") > -1) {
			return "Edge";
		} else if (userAgent.indexOf("Opera") !== -1 || userAgent.indexOf("OPR") !== -1) {
			return "Opera";
		} else if (userAgent.indexOf("Chrome") !== -1) {
			return "Chrome";
		} else if (userAgent.indexOf("Safari") !== -1) {
			return "Safari";
		} else if (userAgent.indexOf("Firefox") !== -1) {
			return "Firefox";
		} else if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident") !== -1) {
			return "IE";
		} else {
			return "Unknown";
		}
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
