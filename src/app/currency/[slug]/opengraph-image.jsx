import { ImageResponse } from 'next/og'
import getDataPromise from '@/app/data/getData'
import currenciesRef from '@/app/data/currenciesReference.json'
import OGImageTemplate, { fonts } from './OgImage'

export const dynamic = 'force-static'
export const contentType = 'image/png'
export const size = { width: 1200, height: 630 }

const excluded = ['ghs']

export function generateStaticParams() {
	return Object.keys(currenciesRef)
		.filter((code) => !excluded.includes(code))
		.map((code) => ({ slug: code }))
}

export default async function OGImage({ params }) {
	const { slug } = await params
	const data = await getDataPromise()
	const currencyObj = data[slug.toUpperCase()]

	const title1 = currencyObj
		? (currencyObj.noSubUnit || currencyObj.subUnitKilled ? currencyObj.demonym : `${currencyObj.subUnitName} /`)
		: ''
	const title2 = currencyObj?.unitNameSingular ?? ''
	const currencyName = currencyObj?.unitName ?? slug.toUpperCase()

	return new ImageResponse(
		<OGImageTemplate currencyName={currencyName} title1={title1} title2={title2} />,
		{ ...size, fonts },
	)
}
