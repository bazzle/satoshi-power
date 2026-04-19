import { ImageResponse } from 'next/og'
import getDataPromise from '@/app/data/getData'
import { CurrencyPageOG, HomePageOG, fonts } from './OgImage'

export const dynamic = 'force-static'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

export async function generateStaticParams() {
	const data = await getDataPromise()
	const dataArr = Object.values(data)
	return dataArr.map((item) => ({ slug: item.currencyCodeSlug }))
}

export default async function OGImage({ params }) {
	try {
		const { slug } = await params
		const data = await getDataPromise()
		const currencyObj = data[slug.toUpperCase()]
		const code = currencyObj.currencyCode

		const prefix = currencyObj.noSubUnit || currencyObj.subUnitKilled ? currencyObj.demonym : `${currencyObj.subUnitName} /`
		const unit = currencyObj.unitNameSingular
		const titleCombined = `${prefix} ${unit} to Satoshi/Bitcoin`
		const description = `How many sats is one ${unit}?`

		return new ImageResponse(
			<>
				<CurrencyPageOG currencyTitle = {titleCombined} description={description} />
			</>
			,
			{ ...size, fonts },
		)
	}
	catch(error) {
		console.error(error)
	}
}
