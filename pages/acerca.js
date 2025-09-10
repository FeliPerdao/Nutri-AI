import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Acerca = () => {
  return (
    <>
      <div className="p-8 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Acerca de mí</h1>
        <p className="text-lg mb-4 text-gray-700">
          Soy Ingeniero Industrial con pasión por las finanzas, criptomonedas,
          automatización industrial, IoT, ingeniería aeroespacial y escalar
          cerros de más de 5.000 metros. Siempre buscando aprender y
          experimentar en tecnología y aventuras.
        </p>
        <p className="text-lg mb-6 text-gray-700">
          Si querés ver algunos de mis proyectos o conectarte conmigo:
        </p>
        <div className="flex justify-center gap-6 text-3xl text-gray-800">
          <a
            href="https://github.com/FeliPerdao"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/filipeperdao/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </>
  );
};

export default Acerca;
