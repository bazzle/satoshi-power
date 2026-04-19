import { ImageResponse } from 'next/og'
import { HomePageOG } from '@/app/ui/misc/OgImage'

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

export default function OGImage({ params }) {
	return new ImageResponse(
		<>
			<HomePageOG title="Satoshi Power" description="Comparing the price of a Satoshi against fiat sh!tcoins 💀" />
		</>
		,
		{ ...size, fonts },
	)

}
