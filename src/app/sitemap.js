import getDataPromise from '@/app/data/getData'

export const dynamic = 'force-static'

const BASE_URL = 'https://satoshi-power.com'

export default async function sitemap() {
	const data = await getDataPromise()
	const dataArr = Object.values(data)
	const currencyEntries = dataArr.map((item) => ({
		url: `${BASE_URL}/currency/${item.currencyCodeSlug}`,
		changeFrequency: 'daily',
		priority: 1,
	}))
	return [
		{
			url: BASE_URL,
			changeFrequency: 'daily',
			priority: 1,
		},
		...currencyEntries,
	]
}
