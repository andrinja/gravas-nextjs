import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import Grid from '@material-ui/core/Grid';
import {Footer, PartnerLink} from './style';
import theme from '../theme';
import Link from 'next/link'

 const MainFooter = () => {
	return (
		<Footer container justifyContent="space-between" alignItems="center">
		<Link href="/sitemap.xml">
			<a style={{textDecoration: 'none', color: theme.fontColors.secondary}}>
				© 2020 Gravas
			</a>
		</Link>
		<Grid item style={{ display: 'flex', flexDirection: 'column'}}>
				<h5 style={{ paddingBottom: '8px', color: theme.fontColors.disabled}}>Sadarbības partneri</h5>
			<PartnerLink href="https://www.celotajs.lv/lv/e/gravas_pirts?0">
				Lauku ceļotājs
			</PartnerLink>
			<PartnerLink href="https://viesunamiem.lv/gravas">
				Viesunamiem
			</PartnerLink>
			<PartnerLink href="https://viesunamiem.lv/gravas">
				Pirtis
			</PartnerLink>
			<PartnerLink href="https://www.booking.com/hotel/lv/gravas">
				Booking
			</PartnerLink>
			<PartnerLink href="https://www.airbnb.com/rooms/19097319?check_in=2021-09-16&check_out=2021-09-17&guests=1&adults=1&s=67&unique_share_id=0c987f22-57bb-4284-bcff-9541ca41d2cf">
				Airbnb
			</PartnerLink>
			<PartnerLink href="https://pirtsslotas.lv/">
				Pirtsslotas
			</PartnerLink>
			<PartnerLink href="https://www.lieliskadavana.lv/gravas">
				Lieliska dāvana
			</PartnerLink>
		</Grid>
		<Grid item>
			<Link
				href="https://www.instagram.com/gravasbauska/"
				target="_blank"
				rel="noreferrer"
				style={{marginRight: '8px'}}>
				<a>
					<InstagramIcon fontSize={'large'} color={'primary'}/>
				</a>
			</Link>
			<Link
				href="https://www.facebook.com/gravasatputa"
				target="_blank"
				rel="noreferrer"
			>
				<a>
					<FacebookIcon fontSize={'large'} color={'primary'}/>
				</a>
			</Link>
		</Grid>
		</Footer>
	)
}

export default MainFooter