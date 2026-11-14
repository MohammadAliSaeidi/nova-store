import { getSiteUrl } from "@/utils/site-url";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: { userAgent: "*", allow: "/" },
		sitemap: new URL("/sitemap.xml", getSiteUrl()).toString(),
	};
}
