import { FaFacebook } from "react-icons/fa";

import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  
  return(
    <div className="border-t border-slate-700/50 w-full flex flex-col">
      <div className="flex w-full justify-center gap-8 p-8">
        <ul>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Careers</li>
        </ul>

        <ul className="text-primary flex flex-col gap-2 text-xl">
          <li>
            <a href="https://www.facebook.com/profile.php?id=100089900432473"><FaFacebook/></a>
          </li>
          <li>
            <a href=""><FaTwitter/></a>
          </li>
        </ul>
      </div>

      <div className="border-t border-t-slate-700/50 w-full text-center p-8">
        <p>&copy; 2026 NEGRO BARBERSHOP. ALL RIGHT RESERVED.</p>
      </div>
    </div>
  );
}

export default Footer;