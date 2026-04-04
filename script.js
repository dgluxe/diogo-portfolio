const header = document.getElementById("site-header");

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
    header.classList.remove("scrolled");
    }
}); 

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    menuBtn.textContent = mobileMenu.classList.contains("hidden") ? "☰" : "✕";
});

document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuBtn.textContent = "☰";
    });
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1,
    }
);

document.querySelectorAll(".scroll-reveal").forEach((el) => {
    observer.observe(el);
});

const contatoForm = document.getElementById("contato-form");
const formStatus = document.getElementById("form-status");
let statusTimeout;

function mostrarStatus(mensagem, classes, tempo = 4000) {
    clearTimeout(statusTimeout);

    formStatus.textContent = mensagem;
    formStatus.className = classes;
    formStatus.classList.remove("hidden");

    statusTimeout = setTimeout(() => {
        formStatus.textContent = "";
        formStatus.classList.add("hidden");
    }, tempo);
}

if (contatoForm) {
    contatoForm.querySelectorAll("input, textarea").forEach((campo) => {
        campo.addEventListener("input", () => {
            clearTimeout(statusTimeout);
            formStatus.textContent = "";
            formStatus.classList.add("hidden");
        });
    });

    contatoForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const nome = contatoForm.querySelector('input[name="name"]').value.trim();
        const email = contatoForm.querySelector('input[name="email"]').value.trim();
        const mensagem = contatoForm.querySelector('textarea[name="message"]').value.trim();

        const mensagemSemEspacos = mensagem.replace(/\s/g, "");

        if (nome.length < 2) {
            mostrarStatus(
                "Digite seu nome corretamente.",
                "mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300"
            );
            return;
        }

        if (!email.includes("@")) {
            mostrarStatus(
                "Digite um e-mail válido.",
                "mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300"
            );
            return;
        }

        if (mensagemSemEspacos.length < 5) {
            mostrarStatus(
                "A mensagem deve ter no mínimo 5 caracteres.",
                "mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300"
            );
            return;
        }

        mostrarStatus(
            "Enviando mensagem...",
            "mt-4 rounded-lg border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm font-medium text-violet-300",
            10000
        );

        const formData = new FormData(contatoForm);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    Accept: "application/json"
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok && data.success) {
                mostrarStatus(
                    "Mensagem enviada com sucesso!",
                    "mt-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-300"
                );
                contatoForm.reset();
            } else {
                mostrarStatus(
                    "Não foi possível enviar. Tente novamente.",
                    "mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300"
                );
            }

        } catch (error) {
            mostrarStatus(
                "Erro ao enviar. Verifique sua conexão.",
                "mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300"
            );
        }
    });
}

const langButtons = document.querySelectorAll(".lang-btn");
const langPt = document.getElementById("lang-pt");
const langEn = document.getElementById("lang-en");
const langEs = document.getElementById("lang-es");

function setActiveLanguage(lang) {

    langButtons.forEach((button) => {
        button.classList.remove("lang-btn-active", "lang-btn-inactive", "lang-btn-disabled");
        
        if (button.dataset.lang === "es") {
            button.classList.add("lang-btn-disabled");
            return;
        }
        if (button.dataset.lang === lang) {
            button.classList.add("lang-btn-active");
        } else {
            button.classList.add("lang-btn-inactive");
        }
    });
}


    if (langPt) {
        langPt.addEventListener("click", () => {
            setActiveLanguage("pt");
            applyTranslations("pt")
        });
    }

    if (langEn) {
        langEn.addEventListener("click", () => {
            setActiveLanguage("en");
            applyTranslations("en")
        });
    }

    

    const translations = {
        pt: {
            nav: {
                about: "Sobre",
                skills: "Habilidades",
                experience: "Experiência",
                recommendation: "Carta de Recomendação",
                projects: "Projetos",
                contact:"Contato"
            },

            hero: {
                eyebrow: "Desenvolvedor & Analista de Dados",
                firstName: "Diogo de Alcantara",
                lastName: "Brasil",
                description: "Estudante de Engenharia de Software com foco em desenvolvimento C#/.NET e banco de dados. Experiência em ambiente corporativo com resolução de problemas, organização e entregas ágeis.",      
                projectsButton:"Ver Projetos",
                contactButton:"Contato"
                
            },

            hab: {
                title: "Habilidades",
                subtitle:"Técnicas",
                description:"Tecnologias e ferramentas que uso na minha jornada de desenvolvimento",
                skill_1:"Front-end básico",
                skill_2:"Controle de versão",
                skill_3:"Visualização de dados",
                skill_4:"Usuário",
                skill_5:"IDE principal",
                skill_6:"Ferramentas de apoio"
            },

            exp:{
                title:"Experiência &",
                subtitle:"Formação",
                description:"Minha trajetória profissional e acadêmica",

                item1:{
                    data:"AGO/2025 – OUT/2025",
                    cargo:"Estagiário de TI",
                    company: "CADDI Cloud, Servidor Dedicado e Datacenter",
                    descrip_1:"• Registro e acompanhamento de chamados (Tiflux), com priorização e organização de fluxo",
                    descrip_2:"• Suporte a usuários e sistemas, com instalação/configuração de softwares e troubleshooting",
                    descrip_3:"• Geração de relatórios de máquinas ativas e conferência de dados para consistência",
                    descrip_4:"• Atendimento médio de 20+ chamados/dia com foco em agilidade"
                },

                item2:{
                    data:"JUL/2022 – AGO/2025",
                    cargo:"Auxiliar Administrativo",
                    company: "Transportes Bertolini",
                    descrip_5:"• Rotinas administrativas com foco em digitalização e automação de dados fiscais",
                    descrip_6:"• Geração diária de relatórios de carga e acompanhamento operacional",
                    descrip_7:"• Uso de planilhas para análise de informações e apoio em processos"
                },

                item3: {
                    area:"Engenharia de Software",
                    school:"Centro Universitário ENIAC (Cursando)",
                    descrip_8:"• Graduação em andamento com foco em desenvolvimento e banco de dados"
                },

                item4:{
                    area:"Técnico em Administração",
                    school:"ETEC Professor Horácio Augusto da Silveira",
                    descrip_9:"• Formação técnica concluída"
                }
            },

            recom:{
                title:" Carta de",
                subtitle:"Recomendação",
                description:"Carta emitida pela empresa CADDI Soluções em Tecnologia após minha atuação como estagiário na área de TI.",
                btn:"Ver Carta de Recomendação"
            },


            proj:{
                title:"Meus",
                subtitle:"Projetos",
                description:"Projetos pessoais e acadêmicos",

                one:{
                    title:"Programa de Chamados",
                    subtitle:"Sistema para abrir, listar e fechar chamados de TI em C# com persistência em PostgreSQL.",
                    btn:"Ver no GitHub"
                },

                two:{
                    title:"Controle de Cargas SQL",
                    subtitle:"Sistema para organizar e consultar cargas com PostgreSQL e scripts SQL voltados à rotina operacional.",
                    btn:"Ver no GitHub"
                },

                thr:{
                    title:"Jogo Educativo 2D",
                    subtitle:"Jogo educativo desenvolvido para conscientizar sobre o ODS 2 de forma interativa e acessível.",
                    btn:"Jogar"
                },

                four:{
                    title:"Planejamento de E-commerce (TCC)",
                    subtitle: `Trabalho de Conclusão de Curso desenvolvido em grupo
                                no curso Técnico em Administração, analisando o
                                funcionamento do e-commerce, logística, segurança,
                                formas de pagamento e tendências do mercado digital.`,
                    
                    descrip:"E-commerce",
                    descrip2:"Administração",
                    descrip3:"Planejamento",

                    btn:"Ver TCC"

                }
            },

            cont:{
                title:"Entre em",
                subtitle:"Contato",
                description:"Vamos conversar sobre oportunidades",
                inf:"Informações",
                name:"Seu nome",
                email:"Seu e-mail",
                message:"Sua mensagem",
                button:"Enviar Mensagem"
            },

            fot:{
                inf:"Todos os direitos reservados."
            }

        },
        

        en: {
            nav: {
                about: "About",
                skills: "Skills",
                experience: "Experience",
                recommendation: "Recommendation Letter",
                projects: "Projects",
                contact: "Contact"
            },
            hero: {
                eyebrow: "Developer & Data Analyst",
                firstName: "Diogo de Alcantara",
                lastName: "Brasil",
                description: "Software Engineering student focused on C#/.NET development and databases. Experience in corporate environments with problem solving, organization, and agile deliveries.",
                projectsButton: "View Projects",
                contactButton: "Contact"
            },

            hab: {
                    title: "Skills",
                    subtitle:"Technical",
                    description:"Technologies and tools I use in my development journey",
                    skill_1:"Basic front-end",
                    skill_2:"Version control",
                    skill_3:"Data visualization",
                    skill_4:"User support",
                    skill_5:"Main IDE",
                    skill_6:"Support tools"
            },

            exp: {
                title: "Experience &",
                subtitle: "Education",
                description: "My professional and academic journey",

                item1: {
                    data: "AUG/2025 – OCT/2025",
                    cargo: "IT Intern",
                    company: "CADDI Cloud, Dedicated Servers and Datacenter",
                    descrip_1: "• Ticket registration and tracking (Tiflux), with prioritization and workflow organization",
                    descrip_2: "• User and system support, including software installation/configuration and troubleshooting",
                    descrip_3: "• Generation of active machine reports and data validation for consistency",
                    descrip_4: "• Average of 20+ tickets handled per day with focus on agility"
                },

                item2: {
                    data: "JUL/2022 – AUG/2025",
                    cargo: "Administrative Assistant",
                    company: "Transportes Bertolini",
                    descrip_5: "• Administrative routines focused on digitization and automation of tax data",
                    descrip_6: "• Daily generation of cargo reports and operational monitoring",
                    descrip_7: "• Use of spreadsheets for data analysis and process support"
                },

                item3: {
                    area: "Software Engineering",
                    school: "Centro Universitário ENIAC (Ongoing)",
                    descrip_8: "• Undergraduate degree in progress focused on development and databases"
                },

                item4: {
                    area: "Technical Degree in Administration",
                    school: "ETEC Professor Horácio Augusto da Silveira",
                    descrip_9: "• Completed technical education"
                }
            },

            recom: {
                title: "Letter of",
                subtitle: "Recommendation",
                description: "Letter issued by CADDI Soluções em Tecnologia after my work as an IT intern.",
                btn: "View Recommendation Letter"
            },

            proj: {
                title: "My",
                subtitle: "Projects",
                description: "Personal and academic projects",

                one: {
                    title: "Ticket System",
                    subtitle: "System to create, list and close IT tickets in C# with PostgreSQL persistence.",
                    btn: "View on GitHub"
                },

                two: {
                    title: "SQL Load Management",
                    subtitle: "System to organize and query loads using PostgreSQL and SQL scripts focused on operational routines.",
                    btn: "View on GitHub"
                },

                thr: {
                    title: "2D Educational Game",
                    subtitle: "Educational game developed to raise awareness about SDG 2 in an interactive and accessible way.",
                    btn: "Play"
                },

                four: {
                    title: "E-commerce Planning (Final Project)",
                    subtitle: "Final course project developed in a group during the Technical Administration course, analyzing e-commerce operations, logistics, security, payment methods, and digital market trends.",

                    descrip: "E-commerce",
                    descrip2: "Administration",
                    descrip3: "Planning",

                    btn: "View Project"
                }
            },
            
            cont: {
                title: "Get in",
                subtitle: "Touch",
                description: "Let's talk about opportunities",
                inf: "Information",
                name: "Your name",
                email: "Your email",
                message: "Your message",
                button: "Send Message"
            },

            fot: {
                inf: "All rights reserved."
            }
        }
    }

    function applyTranslations(lang) {
        const elements = document.querySelectorAll("[data-i18n]");

        elements.forEach((element) => {
            const key= element.dataset.i18n;
            const keys = key.split(".");

            let value = translations[lang];

            keys.forEach((k) => {
                value = value[k];
            });

            if (!value) return;

            // INPUT E TEXTAREA
            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                element.placeholder = value;
                element.value = ""; // limpa texto bugado dentro do campo
            } else {
                element.textContent = value;
            }
        });
    }

        setActiveLanguage("pt");
    applyTranslations("pt")
