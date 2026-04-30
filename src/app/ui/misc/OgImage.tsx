import fs from 'fs'
import Image from 'next/image'
import path from 'path'
import logoSvg from '@/app/ui/misc/logo.tsx'

type CurrencyPageOGprops = {
	currencyTitle: string,
	description: string
}

export function CurrencyPageOG({ currencyTitle, description } : CurrencyPageOGprops) {
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
				{logoSvg}
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

type HomePageOGProps = {
	title: string,
	description: string
}

export function HomePageOG({ title, description } : HomePageOGProps) {
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

				{logoSvg}
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px', flexGrow: 1 }}>
					<div style={{ fontSize: '32px' }}>
						{description}
					</div>
				</div>
			</div>
		</div>
	)
}
