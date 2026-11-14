export function getSiteUrl() {
	const configuredUrl = process.env.SITE_URL;

	if (configuredUrl) return new URL(configuredUrl);

	if (process.env.NODE_ENV !== "production")
		return new URL("http://localhost:3000");

	throw new Error("SITE_URL must be set to the production site origin.");
}
