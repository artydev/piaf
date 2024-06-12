import Image from 'next/image'
import styles from './navbar.module.css'
import Link from 'next/link'



function Navbar() {
    return (
        <div className="navbar">
            <div>
                <Image
                    src="/logo.png"
                    width={290}
                    height={120}
                    alt="Picture of the author"
                />
            </div>
            <div>
           
            </div>
            <div>
                <Link href='/login'>Login</Link>
            </div>
            
        </div>
    )
}


export default Navbar