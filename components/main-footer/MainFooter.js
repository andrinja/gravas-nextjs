import InstagramIcon from '../icons/Instagram';
import FacebookIcon from '../icons/Facebook';
import { Footer, FooterInner, Brand, PartnerLinks, SocialLinks, PartnerLink } from './style';
import Image from 'next/image';
import Link from 'next/link';

const MainFooter = () => {
	return (
		<Footer>
		<FooterInner>
		<Brand>
			<Image width={120} height={21} src="/static/logo.svg" alt="Gravas" />
			<Link href="/sitemap.xml">© {new Date().getFullYear()} Gravas · Bauska</Link>
		</Brand>
		<PartnerLinks>
			<p className="heading">Sadarbības partneri</p>
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
		</PartnerLinks>
		<SocialLinks>
			<a
				href="https://www.instagram.com/gravasbauska/"
				target="_blank"
				rel="noreferrer"
				aria-label="Instagram - Gravas Bauska">
					<InstagramIcon aria-hidden />
			</a>
			<a
				href="https://www.facebook.com/gravasatputa"
				target="_blank"
				rel="noreferrer"
				aria-label="Facebook - Gravas atpūta"
			>
					<FacebookIcon aria-hidden />
			</a>
		</SocialLinks>
		</FooterInner>
		</Footer>
	)
}

export default MainFooter
