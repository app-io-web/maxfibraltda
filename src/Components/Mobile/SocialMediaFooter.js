import React, { useEffect, useState } from "react";
import { fetchSocialLinks } from "../../Services/socialMediaService.js";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import "../../Styles/Mobile/SocialMediaFooter.css"; // Importação do CSS

const iconMap = {
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  facebook: <FaFacebook />,
};

const SocialMediaFooter = () => {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const getLinks = async () => {
      const links = await fetchSocialLinks();
      setSocialLinks(links);
    };
    getLinks();
  }, []);

  return (
    <div className="example-2">
      {socialLinks.map((link, index) => (
        <div key={index} className="icon-content">
          <a href={link.url} target="_blank" rel="noopener noreferrer" data-social={link.platform}>
            {iconMap[link.platform]}
            <span className="filled"></span>
          </a>
          <span className="tooltip">{link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}</span>
        </div>
      ))}
    </div>
  );
};

export default SocialMediaFooter;
