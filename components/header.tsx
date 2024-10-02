import Link from 'next/link';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from '../functions';
import { brandName, logoURL } from '../shared/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlantWilt, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const [scrolled, setScrolled] = useState<any>(false);
    // const app = useContext(appContext);
    // const {width, height, form} = app;
    useEffect(() => {
        window.addEventListener('scroll', (event?: any) => window.scrollY > 5 ? setScrolled(true) : setScrolled(false));
    }, [setScrolled]);
    return (
        <header className={scrolled ? `scrolledHeader` : `nonscrolledHeader`}>
            <div className="innerHeader">
                <Link href={`/`}>
                    <a title="Home">
                        <LazyLoadImage 
                            id={`logo`} 
                            alt={`logo`} 
                            effect="blur" 
                            src={logoURL} 
                            width={`100%`} 
                            height={`auto`} 
                            className="logo" 
                        />
                        {brandName}
                    </a>
                </Link>
                <div className="buttons">
                    <Button id="signinBtn" className="btn" title='Plants'>
                        <FontAwesomeIcon icon={faPlantWilt} style={{ paddingRight: 15 }} />
                        Plants
                    </Button>
                    <Button id="signinBtn" className="btn regBtn lightBtn" title='Signin'>
                        <FontAwesomeIcon icon={faUser} style={{ paddingRight: 15 }} />
                        Signin
                    </Button>
                    <Button id="signupBtn" className="btn regBtn" title='Signup'>
                        <FontAwesomeIcon icon={faUser} style={{ paddingRight: 15 }} />
                        Signup
                    </Button>
                </div>
            </div>
        </header>
    )
}