import { UnitSelector } from '../Selector/SelectorUnits';
import './Header.css';

export const Header = () => {

    return (
        <header className="header">
            <div className="container flex">
                <img className='logo' src="src\assets\images\logo.svg" alt="logo" />
                <UnitSelector />
            </div>
        </header>
    );

}