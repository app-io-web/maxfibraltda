import React, { useEffect, useState } from 'react';
import { buscarBannersEmpresariais } from '../../../Services/Empresarial/ServiceEmpresarial';

function BannersEmpresarial() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      const data = await buscarBannersEmpresariais();
      setBanners(data);
    };
    carregar();
  }, []);

  const children = banners.map((item, idx) =>
    React.createElement(
      'picture',
      {
        key: idx,
        className: 'w-full rounded-xl overflow-hidden shadow-md'
      },
      React.createElement('source', {
        media: '(min-width: 2560px)',
        srcSet: item['Banners-4K']
      }),
      React.createElement('source', {
        media: '(min-width: 1920px)',
        srcSet: item['Banners-2K']
      }),
      React.createElement('source', {
        media: '(min-width: 1080px)',
        srcSet: item['Banners-1080P']
      }),
      React.createElement('img', {
        src: item['Banners-Mobile'],
        alt: `Banner ${idx + 1}`,
        className: 'w-full h-auto object-cover'
      })
    )
  );

  return React.createElement(
    'div',
    { className: 'grid gap-4 p-4' },
    children // <- aqui está o ajuste que resolve o erro!
  );
}

export default BannersEmpresarial;
