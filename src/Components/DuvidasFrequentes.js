import React, { useState, useEffect } from "react";
import getDuvidasFrequentes from "../Services/duvidasService";
import "../Styles/DuvidasFrequentes.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const DuvidasFrequentes = () => {
  const [duvidas, setDuvidas] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const fetchDuvidas = async () => {
      const data = await getDuvidasFrequentes();
      setDuvidas(data);
    };

    fetchDuvidas();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDuvida = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="duvidas-container">
      <h2 className="titulo-duvidas">DÚVIDAS FREQUENTES</h2>
      <p className="descricao-duvidas">
        Tire suas dúvidas sobre a Internet Fibra da MaxFibra
      </p>

      {!isMobile ? (
        <div className="duvidas-grid">
          {duvidas.length > 0 ? (
            duvidas.map((item, index) => (
              <div key={index} className={`duvida-card ${openIndex === index ? "ativo" : ""}`}>
                <button className="duvida-pergunta" onClick={() => toggleDuvida(index)}>
                  {item.pergunta}
                  {openIndex === index ? <FaMinus className="icone-expandir" /> : <FaPlus className="icone-expandir" />}
                </button>
                <div className="duvida-resposta">
                  <ReactMarkdown>{item.resposta}</ReactMarkdown>
                </div>
              </div>
            ))
          ) : (
            <p>Carregando dúvidas...</p>
          )}
        </div>
      ) : (
        <div className="swiper-container">
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            centeredSlides={true}
            pagination={{ clickable: true, el: ".duvidas-pagination" }} // 🔥 Define a classe para paginação
            style={{ padding: "20px 0" }}
          >
            {duvidas.length > 0 ? (
              duvidas.map((item, index) => (
                <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center" }}>
                  <div className={`duvida-card ${openIndex === index ? "ativo" : ""}`}>
                    <button className="duvida-pergunta" onClick={() => toggleDuvida(index)}>
                      {item.pergunta}
                      {openIndex === index ? <FaMinus className="icone-expandir" /> : <FaPlus className="icone-expandir" />}
                    </button>
                    <div className="duvida-resposta">
                      <ReactMarkdown>{item.resposta}</ReactMarkdown>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p>Carregando dúvidas...</p>
            )}
          </Swiper>
          {/* 🔥 Adicionando um container para as bolinhas da paginação */}
          <div className="duvidas-pagination"></div>
        </div>
      )}
    </section>
  );
};

export default DuvidasFrequentes;
