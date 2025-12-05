import { UnitSelector } from '../Selector/SelectorUnits';
import logo from '../../assets/images/logo.svg'
import './Header.css';

export const Header = () => {

    return (
        <header className="header">
            <div className="container flex">
                <img className='logo' src={logo} alt="logo" />
                <UnitSelector />
            </div>
        </header>
    );

}