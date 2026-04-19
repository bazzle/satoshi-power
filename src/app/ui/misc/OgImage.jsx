import fs from 'fs'
import Image from 'next/image'
import path from 'path'

// Logo
const logoData = fs.readFileSync(path.join(process.cwd(), 'public/logo.png'))
const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

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

			<img width="489" height="120" src={logoSrc} alt="Logo" />

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

export function HomePageOG({ title, description }) {
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

			<img width="489" height="120" src={logoSrc} alt="Logo" />

			<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
				<div style={{ fontFamily: '"DM Sans"', fontSize: '50px' }}>
					{title}
				</div>
			</div>

			<div style={{ display: 'flex', color: '#f7931a', fontSize: '32px' }}>
				{description}
			</div>
		</div>
	)
}
