import { Fragment, useEffect } from "react";

import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";

import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { listarProdutos } from "../service/produtoService";
const Home = () => {
  const newArrivalData = [];
  const bestSales = [];

  useWindowScrollToTop();

  useEffect(() => {
    listarProdutos().then((produtos) => {
      console.log("📦 Produtos retornados do backend:");
      console.table(produtos); // Mostra em formato de tabela no console
    }).catch((err) => {
      console.error("Erro ao buscar produtos do backend:", err);
    });
  }, []);

  return (
    <Fragment>
      <SliderHome />

      <Section
        title="Itens"
        bgColor="#f6f9fc"
        productItems={[]} // Aqui você pode usar produtos do backend se quiser
        //abaixo é o código pra ver os produtos estáticos
        // productItems={discoutProducts}

      />
    </Fragment>
  );
};

export default Home;
