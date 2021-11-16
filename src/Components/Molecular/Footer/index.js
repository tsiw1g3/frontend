import React from "react";

import "./styles.css";

/*
  Componente responsável pela renderização do rodapé da aplicação
*/

function Footer() {
  return (
    <div className="footer" bg="light" expand="lg" fixed="bottom">
      <div>
        <strong>INSTITUTO DE COMPUTAÇÃO</strong>
        <p>Avenida Adhemar de Barros, s/n - Campus de Ondina</p>
        <p>CEP: 40.170-110 Salvador-Bahia Telefone: 3283-6164</p>
      </div>
      <img
        src="https://dcc.ufba.br/sites/computacao.ufba.br/files/logos_ufba_rodape.png"
        alt="Logos IC"
      />
    </div>
  );
}

export default Footer;
