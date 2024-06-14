import './sidebar.module.css'
import Link from "next/link";
import { BsChatRightDots, BsDatabase } from "react-icons/bs";


const linkStyle = {
	textDecoration: 'none',
	cursor: 'pointer',
}

const itemStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
	marginLeft: '2rem'
}

const iconStyle = {
	fontSize: '1.2rem'
}

const ulStyle = {
	marginTop: '2.5rem'
}

function Sidebar() {
	return (
		<div className="sidebar">
			{
				<ul style={ulStyle}>
					<li>
						<div style={itemStyle}>
							<BsDatabase style={iconStyle} />
							<Link legacyBehavior style={linkStyle} href="/basedoc">
								<a>Base Documentaire</a>
							</Link>
						</div>
					</li>
					<li>
						<div style={itemStyle}>
							<BsChatRightDots style={iconStyle} />
							<Link legacyBehavior  style={linkStyle} href="/chat">
								<a>Conversation</a>
							</Link>
						</div>
					</li>
					
				</ul>

			}
		</div>
	);
}



export default Sidebar