import Link from 'next/link';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from '../functions';
import { brandName, logoURL } from '../shared/shared';

export default function Header() {
    const [scrolled, setScrolled] = useState<any>(false);
    // const app = useContext(appContext);
    // const {width, height, form} = app;
    useEffect(() => {
        window.addEventListener('scroll', (event?:any) => window.scrollY > 5 ? setScrolled(true) : setScrolled(false));
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
                    <Button id="signinBtn" className="btn regBtn lightBtn" title='Signin'>Signin</Button>
                    <Button id="signupBtn" className="btn regBtn" title='Signup'>Signup</Button>
                </div>
            </div>
        </header>
    )
}