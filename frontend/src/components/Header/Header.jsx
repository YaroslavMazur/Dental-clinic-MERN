import React ,{useState} from 'react';
import css from "./Header.module.css";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const Header = () => {
	const [isMenuOpened, setIsMenuOpen] = useState(false);
	// const [burgerStyle, setBurgerStyle] = useState("");

	const toggleMenu = () =>{
		setIsMenuOpen(!isMenuOpened);

	}

	const closeMenu = ()=>{
		setIsMenuOpen(false);
	}

	console.log("rerender");

   return (
      <header className={css.header}>
			<nav>
				<Link to="/" className = {css.logoLink}></Link>

				<ul className={css.mainList}>
					<li><Link to="/profile">Profile</Link></li>
					<li><Link to="/about">About</Link></li>
					<li><Link to="/login">Log in</Link></li>
					<li><Link to="/registration">Sign up</Link></li>
				</ul>

				<Link to="/appointmant" className={css.bookBtn}>Book</Link>

				<div className={`${css.hamburgerIcon} ${isMenuOpened ? css.opened : ''}`} onClick={toggleMenu}>
					<div className={css.bar}></div>
					<div className={css.bar}></div>
					<div className={css.bar}></div>
				</div>
				
				{isMenuOpened &&(
					<ul className={css.openedMenu} onClick={closeMenu}>
						<li><Link to="/profile">Profile</Link></li>
						<li><Link to="/about">About</Link></li>
						<li><Link to="/login">Sign in</Link></li>
						<li><Link to="/register">Sign up</Link></li>
					</ul>
				)

				}

				
			</nav>
		</header>
   )
}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
