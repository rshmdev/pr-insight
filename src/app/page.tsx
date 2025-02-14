"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  GitPullRequest,
  Zap,
  Clock,
  Bot,
  ChevronDown,
  MenuIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PricingCard, PricingCardProps } from "@/components/pricing-card";
import { FeatureCard, FeatureCardProps } from "@/components/feature-card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";

interface FAQItem {
  question: string;
  answer: string;
}

const LandingPage: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features: FeatureCardProps[] = [
    {
      icon: GitPullRequest,
      title: "Geração Automática",
      description: "Crie descrições de PR detalhadas com um clique",
    },
    {
      icon: Zap,
      title: "Integração Rápida",
      description: "Conecte-se facilmente ao GitHub, GitLab e Bitbucket",
    },
    {
      icon: Clock,
      title: "Economia de Tempo",
      description: "Reduza o tempo gasto escrevendo descrições em até 80%",
    },
    {
      icon: Bot,
      title: "IA Avançada",
      description:
        "Utilize modelos de linguagem de ponta para resultados precisos",
    },
  ];

  const pricingPlans: PricingCardProps[] = [
    {
      name: "Gratuito",
      price: "R$ 0",
      features: ["Até 50 PRs/mês", "1 repositório", "Suporte por email"],
    },
    {
      name: "Pro",
      price: "R$ 49/mês",
      features: [
        "PRs ilimitados",
        "Até 10 repositórios",
        "Suporte prioritário",
        "Personalização avançada",
      ],
      highlighted: true,
      stripePriceId: "price_1OovvoLZpQHeI3zgWv49IkYn",
    },
    {
      name: "Empresarial",
      price: "R$ 199/mês",
      features: [
        "PRs ilimitados",
        "Repositórios ilimitados",
        "Suporte 24/7",
        "API dedicada",
        "Treinamento personalizado",
      ],
      stripePriceId: "price_1OovxELZpQHeI3zg2y2gZbyz",
    },
  ];

  const faqItems: FAQItem[] = [
    {
      question:
        "Como funciona a geração automática de descrições de Pull Requests?",
      answer:
        "Nossa IA analisa meticulosamente o conteúdo do seu pull request, incluindo as alterações de código, commits e contexto do projeto. Utilizando modelos de linguagem avançados, ela gera uma descrição detalhada e relevante que resume as principais mudanças, destaca pontos importantes e fornece contexto adicional quando necessário. Isso economiza tempo valioso dos desenvolvedores e melhora a qualidade das revisões de código.",
    },
    {
      question:
        "Quais plataformas de controle de versão são suportadas atualmente?",
      answer:
        "Atualmente, oferecemos suporte completo para GitHub, GitLab e Bitbucket. Nossa equipe está constantemente trabalhando para expandir nossas integrações. Se você utiliza outra plataforma e gostaria de vê-la suportada, entre em contato conosco. Estamos sempre abertos a sugestões e feedback dos usuários para melhorar nosso serviço.",
    },
    {
      question:
        "É possível personalizar o estilo e conteúdo das descrições geradas?",
      answer:
        "Absolutamente! Nossos planos Pro e Empresarial oferecem opções avançadas de personalização. Você pode ajustar o tom da linguagem (formal, casual, técnico), o formato da descrição (estruturada, narrativa), e até mesmo definir seções específicas que deseja incluir (como 'Mudanças principais', 'Impacto', 'Testes realizados'). Além disso, é possível integrar terminologia específica da sua empresa ou projeto para garantir que as descrições estejam alinhadas com suas práticas internas.",
    },
    {
      question:
        "Como a ferramenta lida com informações sensíveis ou proprietárias?",
      answer:
        "A segurança e privacidade dos dados dos nossos clientes são nossa prioridade máxima. Nossa IA é treinada para não incluir informações sensíveis nas descrições geradas. Além disso, todos os dados são processados em servidores seguros e criptografados. Não armazenamos o conteúdo dos seus repositórios ou pull requests além do tempo necessário para gerar as descrições. Para clientes com requisitos de segurança ainda mais rigorosos, nosso plano Empresarial oferece a opção de implantação local (on-premises).",
    },
    {
      question:
        "Qual é o processo de integração e quanto tempo leva para começar a usar o serviço?",
      answer:
        "O processo de integração é rápido e simples. Após se cadastrar em nossa plataforma, você pode conectar seus repositórios em questão de minutos usando nossa interface intuitiva. Para a maioria dos usuários, o serviço está pronto para uso imediato após a conexão. Para integrações mais complexas ou personalizadas, nossa equipe de suporte está disponível para auxiliar. Oferecemos também um período de teste gratuito para que você possa experimentar o serviço sem compromisso e ver como ele se adapta ao seu fluxo de trabalho.",
    },
    {
      question:
        "Como a ferramenta lida com projetos multilíngues ou com código em diferentes linguagens de programação?",
      answer:
        "Nossa IA é treinada para reconhecer e trabalhar com uma ampla variedade de linguagens de programação. Ela adapta automaticamente suas descrições com base no contexto do projeto, seja ele em Python, JavaScript, Java, C++, ou qualquer outra linguagem popular. Para projetos multilíngues, a ferramenta é capaz de gerar descrições que abrangem as diferentes partes do código, fornecendo uma visão holística das mudanças. Além disso, oferecemos a opção de gerar descrições em múltiplos idiomas humanos para equipes globalmente distribuídas.",
    },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen text-white mx-auto">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            PR Insights
          </h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <a
                  onClick={() => scrollTo("funcionalidades")}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Funcionalidades
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollTo("planos")}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Planos
                </a>
              </li>
              <li>
                <a
                  onClick={() => scrollTo("faq")}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  FAQ
                </a>
              </li>
              <li>
                {session ? (
                  <Link
                    href="/dashboard"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </nav>
          <Sheet>
            <SheetTrigger className="md:hidden">
              <MenuIcon className="w-6 h-6 text-white" />
              <span className="sr-only">Abrir menu de navegação</span>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  PR Insights
                </h2>
              </SheetHeader>
              <nav className="mt-4">
                <ul className="flex flex-col gap-3">
                  <li>
                    <a
                      onClick={() => scrollTo("funcionalidades")}
                      className="hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      Funcionalidades
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => scrollTo("planos")}
                      className="hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      Planos
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => scrollTo("faq")}
                      className="hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    {session ? (
                      <Link
                        href="/dashboard"
                        className="hover:text-blue-400 transition-colors"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        href="/login"
                        className="hover:text-blue-400 transition-colors"
                      >
                        Login
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="pt-20">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('/grid.svg')",
              backgroundSize: "cover",
              opacity: opacity,
            }}
          />
          <div className="container mx-auto px-4 py-20 text-center relative z-10">
            <motion.h2
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Revolucione suas Pull Requests com IA
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Gere descrições de Pull Requests automaticamente e economize tempo
              valioso para sua equipe.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 rounded-full"
              >
                Comece Agora
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-8 h-8 text-blue-400" />
          </motion.div>
        </section>

        <section id="funcionalidades" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Funcionalidades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="planos" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Nossos Planos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <PricingCard {...plan} />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="faq" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Perguntas Frequentes
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto space-y-4"
          >
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Pronto para revolucionar suas Pull Requests?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Junte-se a milhares de desenvolvedores que já estão economizando
              tempo com nossa solução.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 rounded-full"
            >
              Comece seu teste gratuito
            </Button>
          </motion.div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12 absolute botton-0 left-0 w-full">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-bold mb-2">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  Carreiras
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  Documentação
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  Suporte
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-blue-400">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2023 AI PR Description. Todos os direitos reservados.</p>
        </div>
      </footer>

      <motion.div
        className="fixed bottom-4 right-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer"
        style={{ opacity: scrollY > 100 ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          ></path>
        </svg>
      </motion.div>
    </div>
  );
};

export default LandingPage;
