import ActiveLink from '../ActiveLink';
import Item from './style';

const NavItem = ({ href, label, ...rest }) => (
	<ActiveLink
		href={href}
		activeClassName="active"
		{...rest}>
		<Item
		className="item"
		whileHover={{
			scale: 1.1,
			transition: { duration: 0.3 },
		}}
		whileTap={{
			scale: 0.9,
			transition: { duration: 0.3 }
		}}>
			{label}
        </Item>
    </ActiveLink>
)
export default NavItem