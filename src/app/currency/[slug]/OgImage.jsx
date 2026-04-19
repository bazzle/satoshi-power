import fs from 'fs'
import path from 'path'

function toArrayBuffer(buf) {
	return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
}

const bebasNeueBuf = fs.readFileSync(path.join(process.cwd(), 'src/app/fonts/bebasneue.ttf'))
const dmSansBuf = fs.readFileSync(path.join(process.cwd(), 'src/app/fonts/dmsans.ttf'))
const bebasNeue = toArrayBuffer(bebasNeueBuf)
const dmSans = toArrayBuffer(dmSansBuf)

const logoData = fs.readFileSync(path.join(process.cwd(), 'public/logo.png'))
const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

export const fonts = [
	{ name: 'Bebas Neue', data: bebasNeue, weight: 400, style: 'normal' },
	{ name: 'DM Sans', data: dmSans, weight: 400, style: 'normal' },
]

export function CurrencyPageOG({ currencyTitle, description }) {
	return (
		<div
			style={{
				width: '1200px',
				height: '630px',
				background: '#000000',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: '60px 70px',
				color: '#ffffff',
				fontFamily: '"DM Sans"',
			}}
		>

			<img width="400" src={logoSrc} alt="Logo" />

			<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
				<div style={{ fontFamily: '"DM Sans"', fontSize: '50px' }}>
					{currencyTitle}
				</div>
			</div>

			<div style={{ display: 'flex', color: '#f7931a', fontSize: '32px' }}>
				{description}
			</div>
		</div>
	)
}

export function HomePageOG({ currencyTitle, description }) {
	return (
		<div
			style={{
				width: '1200px',
				height: '630px',
				background: '#000000',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: '60px 70px',
				color: '#ffffff',
				fontFamily: '"DM Sans"',
			}}
		>

			<img width="400" src={logoSrc} alt="Logo" />

			<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
				<div style={{ fontFamily: '"DM Sans"', fontSize: '50px' }}>
					{currencyTitle}
				</div>
			</div>

			<div style={{ display: 'flex', color: '#f7931a', fontSize: '32px' }}>
				{description}
			</div>
		</div>
	)
}
