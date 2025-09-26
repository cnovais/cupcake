import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-pink-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sobre a Lumière cupcakes
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
            Criando momentos doces e especiais há mais de uma década
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Tudo começou em uma pequena cozinha de casa, onde nossa fundadora Maria descobriu 
                  sua paixão por criar cupcakes únicos e deliciosos. O que era apenas um hobby 
                  se transformou em um sonho: levar alegria e doçura para as pessoas através 
                  de cupcakes artesanais.
                </p>
                <p>
                  Hoje, a Lumière cupcakes é uma referência em cupcakes personalizados, 
                  atendendo milhares de clientes que buscam produtos de qualidade, 
                  ingredientes frescos e muito amor em cada criação.
                </p>
                <p>
                  Nossa missão é transformar momentos especiais em memórias ainda mais doces, 
                  sempre priorizando a qualidade e a satisfação dos nossos clientes.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-3xl">C</span>
                  </div>
                  <p className="text-gray-600 text-lg">Nossa cozinha especial</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600">
              O que nos move todos os dias
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Qualidade</h3>
              <p className="text-gray-600">
                Utilizamos apenas ingredientes frescos e de primeira qualidade, 
                sem conservantes artificiais.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tradição</h3>
              <p className="text-gray-600">
                Receitas tradicionais passadas de geração em geração, 
                combinadas com técnicas modernas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comunidade</h3>
              <p className="text-gray-600">
                Acreditamos no poder da doçura para unir pessoas e 
                criar momentos especiais juntos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossa Equipe
            </h2>
            <p className="text-xl text-gray-600">
              Pessoas apaixonadas por criar experiências doces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary-600 font-bold text-4xl">M</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Julha Oliveira Novais</h3>
              <p className="text-primary-600 font-medium mb-4">Fundadora & Chef Confeiteira</p>
              <p className="text-gray-600">
                Apaixonada por confeitaria desde criança, Julha transformou seu sonho 
                em realidade criando a Lumière cupcakes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-gold-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-gold-600 font-bold text-4xl">A</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ana Costa</h3>
              <p className="text-primary-600 font-medium mb-4">Especialista em Toppings</p>
              <p className="text-gray-600">
                Ana é responsável por transformar nossos cupcakes em verdadeiras 
                obras de arte com suas decorações únicas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 font-bold text-4xl">C</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Carlos Santos</h3>
              <p className="text-primary-600 font-medium mb-4">Chef de Cozinha</p>
              <p className="text-gray-600">
                Com anos de experiência, Carlos garante que cada cupcake 
                tenha o sabor perfeito e a textura ideal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-pink-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Nossa Missão
          </h2>
          <p className="text-xl md:text-2xl text-primary-100 max-w-4xl mx-auto mb-8">
            "Transformar momentos especiais em memórias ainda mais doces, 
            criando cupcakes únicos que trazem alegria e felicidade para cada pessoa que os saboreia."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">10+</div>
              <div className="text-primary-100">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50k+</div>
              <div className="text-primary-100">Cupcakes Vendidos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-primary-100">Ingredientes Frescos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Venha nos Conhecer!
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Estamos sempre prontos para criar o cupcake perfeito para você. 
            Entre em contato conosco ou visite nossa loja.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Ver Nossos Produtos
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-lg font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
