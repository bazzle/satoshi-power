import fs from 'fs'
import Image from 'next/image'
import path from 'path'

// Logo
const logoData = fs.readFileSync(path.join(process.cwd(), 'public/logo.png'))
const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

export function CurrencyPageOG({ currencyTitle, description }) {
	return (
		<div style={{
			width: '1200px',
			height: '630px',
			background: '#000000',
			display: 'flex',
			color: '#ffffff',
			fontFamily: '"DM Sans"',
			padding: '30px 30px',
		}}
		>
			<div style={{
				width: '100%',
				height: '100%',
				padding: '60px 60px',
				border: '2px solid #f7931a',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}>
				<img width="489" height="120" src={logoSrc} alt="Logo" />
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px', flexGrow: 1 }}>
					<div style={{ fontFamily: '"DM Sans"', fontSize: '50px' }}>
						{currencyTitle}
					</div>
					<div style={{ color: '#f7931a', fontSize: '32px' }}>
						{description}
					</div>
				</div>
			</div>
		</div>
	)
}

export function HomePageOG({ title, description }) {
	return (
		<div style={{
			width: '1200px',
			height: '630px',
			background: '#000000',
			display: 'flex',
			color: '#ffffff',
			fontFamily: '"DM Sans"',
			padding: '30px 30px',
		}}
		>
			<div style={{
				width: '100%',
				height: '100%',
				padding: '60px 60px',
				border: '2px solid #f7931a',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}>

				<img width="489" height="120" src={logoSrc} alt="Logo" />
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px', flexGrow: 1 }}>
					<div style={{ fontSize: '32px' }}>
						{description}
					</div>
				</div>
			</div>
		</div>
	)
}
