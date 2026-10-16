import ActiveLink from '../ActiveLink';
import Item from './style';

// No scale-on-hover any more: the redesign uses an underline, and a scaling
// uppercase label shifted its neighbours.
const NavItem = ({ href, label, ...rest }) => (
	<ActiveLink
		href={href}
		activeClassName="active"
		{...rest}>
		<Item className="item">
			{label}
		</Item>
	</ActiveLink>
)
export default NavItem
