import Header from '@/app/ui/modules/Header'
import Footer from '@/app/ui/modules/Footer'

export const metadata = {
	title: 'Privacy Policy — Satoshi Power',
	description: 'Privacy policy for Satoshi Power',
	alternates: {
		canonical: '/privacy',
	},
}

export default function PrivacyPage() {
	return (
		<>
			<Header location="page" />
			<main className="main">
				<div className="row row--nomargin-top main__content">
					<div className="row-container">
						<div className="bodyText">

							<h1>Privacy Policy</h1>

							<h2 id="website">satoshi-power.com Privacy Policy</h2>
							<p>Last updated: June 7, 2025</p>

							<h3>Overview</h3>
							<p>
								This privacy policy applies to the Satoshi Power website at <a href="https://satoshi-power.com">satoshi-power.com</a>, developed by Bazzle. Satoshi Power compares the price of a Satoshi to units of fiat currency.
							</p>

							<h3>Data We Collect</h3>
							<p>
								Satoshi Power does not directly collect or store any personal data from visitors. However, we use Google Search Console to understand how the website is discovered via Google Search. Google Search Console provides aggregated, anonymised data about search queries and page performance. It does not provide us with personally identifiable information about individual visitors.
							</p>

							<h3>Third-Party Services</h3>
							<p>The following third-party services are used by this website:</p>
							<ul>
								<li>
									<strong>Google Search Console</strong> – used to monitor search performance. Data is collected and processed by Google in accordance with <a href="https://policies.google.com/privacy">Google's Privacy Policy</a>.
								</li>
								<li>
									<strong>blockchain.com API</strong> – used to fetch publicly available Bitcoin price data for display on the site. No personal or visitor information is sent as part of these requests.
								</li>
							</ul>

							<h3>Cookies</h3>
							<p>
								Satoshi Power does not set any cookies directly. Google Search Console does not place cookies on visitor devices via this website.
							</p>

							<h3>Analytics and Tracking</h3>
							<p>
								Beyond Google Search Console, the website does not use any analytics, advertising, or tracking services.
							</p>

							<h3>Childrens Privacy</h3>
							<p>
								This website does not knowingly collect data from children under the age of 13.
							</p>

							<h3>Changes to This Policy</h3>
							<p>
								If this policy changes, the updated version will be posted at this URL with a revised date.
							</p>

							<h3>Contact</h3>
							<p>
								For questions about this privacy policy, contact: <a href="https://x.com/bazzle">@bazzle on X</a>
							</p>

							<hr/>

							<h2 id="app">Satoshi Power App Privacy Policy</h2>

							<p>Last updated: June 7, 2025</p>

							<h3>Overview</h3>
							<p>
								This privacy policy applies to the Satoshi Power app for Android, developed by Bazzle. Satoshi Power is a Bitcoin/satoshi to fiat currency conversion app.
							</p>

							<h3>Data Collection</h3>
							<p>
								Satoshi Power does not collect, store, or share any personal data from its users. No accounts, registration, or login are required to use the app.
							</p>

							<h3>Third-Party Data</h3>
							<p>
								The app fetches publicly available Bitcoin price data from the <a href="https://www.blockchain.com">blockchain.com</a> API in order to display satoshi-to-fiat currency conversions. No personal or device information is sent as part of these requests.
							</p>

							<h3>Device Permissions</h3>
							<p>The app requires internet access solely to retrieve live Bitcoin price data. No other device permissions are requested or used.
							</p>

							<h3>Analytics and Tracking</h3>
							<p>
								The app does not use any analytics, advertising, or tracking services.
							</p>

							<h3>Childrens Privacy</h3>
							<p>
								The app does not collect data from anyone, including children under the age of 13.
							</p>

							<h3>Changes to This Policy</h3>
							<p>
								If this policy changes, the updated version will be posted at this URL with a revised date.
							</p>

							<h3>Contact</h3>
							<p>
								For questions about this privacy policy, contact: <a href="https://x.com/bazzle">@bazzle on X</a>
							</p>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</>
	)
}
