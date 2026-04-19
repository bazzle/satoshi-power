import { ImageResponse } from 'next/og'
import getDataPromise from '@/app/data/getData'
import { CurrencyPageOG, HomePageOG } from './OgImage'

export const dynamic = 'force-static'
export const contentType = 'image/png'

// Fonts
import fs from 'fs'
import path from 'path'
function toArrayBuffer(buf) {
	return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
}
const dmSansBuf = fs.readFileSync(path.join(process.cwd(), 'src/app/fonts/dmsans.ttf'))
const dmSans = toArrayBuffer(dmSansBuf)
const fonts = [
	{ name: 'DM Sans', data: dmSans, weight: 400, style: 'normal' },
]
// Size
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
