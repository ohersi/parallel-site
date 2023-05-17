import Link from "next/link";

interface INavLogo {};

const NavLogo = (props: INavLogo) => {
    
  return (
    <>
        <div>
            <Link href={'/'}>Parallel</Link>
        </div>
    </>
  )
};

export default NavLogo;