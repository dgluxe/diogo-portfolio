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

// Abre e fecha o menu normalmente sem mexer na rolagem do sistema
menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    
    if (!mobileMenu.classList.contains("hidden")) {
        menuBtn.textContent = "✕";
        // ISSO TRAVA O SITE NO FUNDO TOTALMENTE (O TOQUE NÃO PASSA PRO SITE)
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
    } else {
        menuBtn.textContent = "☰";
        // ISSO LIBERA O SITE DE VOLTA QUANDO FECHA
        document.body.style.position = "";
        document.body.style.width = "";
    }
});

document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuBtn.textContent = "☰";
        // GARANTE QUE DESTRAVA SE CLICAR NO LINK
        document.body.style.position = "";
        document.body.style.width = "";
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

       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
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

langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const lang = button.dataset.lang;

        changeLanguage(lang);
    });
});

function changeLanguage(lang) {
    setActiveLanguage(lang);
    applyTranslations(lang);
    localStorage.setItem("language", lang);
}
function setActiveLanguage(lang) {
    langButtons.forEach((button) => {
        button.classList.remove(
            "lang-btn-active",
            "lang-btn-inactive"
        );

        if (button.dataset.lang === lang) {
            button.classList.add("lang-btn-active");
        } else {
            button.classList.add("lang-btn-inactive");
        }
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
                description: "Software Engineering student focused on C#/.NET development and databases. Experienced in corporate environments with a strong track record in problem-solving, organization, and agile deliveries.",
                projectsButton: "View Projects",
                contactButton: "Contact"
            },

            hab: {
                    title: "Skills",
                    subtitle: "Technical",
                    description: "Technologies and tools I use throughout my development journey",
                    skill_1: "Foundational Front-end",
                    skill_2: "Version Control",
                    skill_3: "Data Visualization",
                    skill_4: "User Support",
                    skill_5: "Primary IDE",
                    skill_6: "Support Tools"
            },

            exp: {
                title: "Experience &",
                subtitle: "Education",
                description: "My professional and academic journey",

                item1: {
                    data: "AUG/2025 – OCT/2025",
                    cargo: "IT Intern",
                    company: "CADDI Cloud, Dedicated Servers and Datacenter",
                    descrip_1: "• Logged and tracked tickets (Tiflux), ensuring effective prioritization and workflow organization.",
                    descrip_2: "• Provided user and system support, including software installation, configuration, and troubleshooting.",
                    descrip_3: "• Generated active hardware reports and validated data consistency.",
                    descrip_4: "• Handled an average of 20+ tickets per day with a strong focus on agility and efficiency."
                },

                item2: {
                    data: "JUL/2022 – AUG/2025",
                    cargo: "Administrative Assistant",
                    company: "Transportes Bertolini",
                    descrip_5: "• Executed administrative routines focused on the digitization and automation of tax data.",
                    descrip_6: "• Generated daily cargo reports and conducted operational monitoring.",
                    descrip_7: "• Utilized spreadsheets for data analysis and process optimization support."
                },

                item3: {
                    area: "Software Engineering",
                    school: "Centro Universitário ENIAC (Ongoing)",
                    descrip_8: "• Undergraduate degree focused on software development and database management."
                },

                item4: {
                    area: "Technical Degree in Administration",
                    school: "ETEC Professor Horácio Augusto da Silveira",
                    descrip_9: "• Completed technical program."
                }
            },

            recom: {
                title: "Letter of",
                subtitle: "Recommendation",
                description: "Letter issued by CADDI Soluções em Tecnologia following my performance as an IT intern.",
                btn: "View Recommendation Letter"
            },

            proj: {
                title: "My",
                subtitle: "Proyectos", // Nota: Mude para "Projects" se for renderizar apenas em inglês
                description: "Personal and academic projects",

                one: {
                    title: "Ticket System",
                    subtitle: "A C#-based system to create, list, and resolve IT tickets, featuring PostgreSQL data persistence.",
                    btn: "View on GitHub"
                },

                two: {
                    title: "SQL Load Management",
                    subtitle: "A system designed to organize and query cargo loads utilizing PostgreSQL and optimized SQL scripts for operational routines.",
                    btn: "View on GitHub"
                },

                thr: {
                    title: "2D Educational Game",
                    subtitle: "An educational game developed to raise awareness about SDG 2 in an interactive and accessible manner.",
                    btn: "Play"
                },

                four: {
                    title: "E-commerce Planning (Final Project)",
                    subtitle: "Final capstone project developed in a group during the Technical Administration program, analyzing e-commerce operations, logistics, security, payment methods, and digital market trends.",

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
                email: "Your email address",
                message: "Your message",
                button: "Send Message"
            },

            fot: {
                inf: "All rights reserved."
            }
        },

        es: {
            nav: {
                about: "Sobre mí",
                skills: "Habilidades",
                experience: "Experiencia",
                recommendation: "Carta de recomendación",
                projects: "Proyectos",
                contact: "Contacto"
            },
            hero: {
                eyebrow: "Desarrollador y Analista de Datos",
                firstName: "Diogo de Alcantara",
                lastName: "Brasil",
                description: "Estudiante de Ingeniería de Software enfocado en el desarrollo C#/.NET y bases de datos. Experiencia en entornos corporativos con resolución de problemas, organización y entregas ágiles.",
                projectsButton: "Ver Proyectos",
                contactButton: "Contacto"
            },

            hab: {
                    title: "Habilidades",
                    subtitle: "Técnicas",
                    description: "Tecnologías y herramientas que utilizo en mi trayectoria de desarrollo",
                    skill_1: "Front-end básico",
                    skill_2: "Control de versiones",
                    skill_3: "Visualización de datos",
                    skill_4: "Soporte al usuario",
                    skill_5: "IDE principal",
                    skill_6: "Herramientas de soporte"
            },

            exp: {
                title: "Experiencia y",
                subtitle: "Educación",
                description: "Mi trayectoria profesional y académica",

                item1: {
                    data: "AGO/2025 – OCT/2025",
                    cargo: "Pasante de TI",
                    company: "CADDI Cloud, Dedicated Servers and Datacenter",
                    descrip_1: "• Registro y seguimiento de tickets (Tiflux), con priorización y organización del flujo de trabajo.",
                    descrip_2: "• Soporte técnico a usuarios y sistemas, incluyendo instalación/configuración de software y resolución de problemas.",
                    descrip_3: "• Generación de informes de equipos activos y validación de la consistencia de datos.",
                    descrip_4: "• Promedio de más de 20 tickets atendidos por día con enfoque en la agilidade y eficiencia."
                },

                item2: {
                    data: "JUL/2022 – AGO/2025",
                    cargo: "Asistente Administrativo",
                    company: "Transportes Bertolini",
                    descrip_5: "• Rutinas administrativas enfocadas en la digitalización y automatización de datos fiscales.",
                    descrip_6: "• Generación diaria de informes de carga y monitoreo operativo.",
                    descrip_7: "• Uso de hojas de cálculo para el análisis de datos y soporte en la optimización de procesos."
                },

                item3: {
                    area: "Ingeniería de Software",
                    school: "Centro Universitário ENIAC (En curso)",
                    descrip_8: "• Carrera universitaria en curso enfocada en desarrollo de software y bases de datos."
                },

                item4: {
                    area: "Técnico en Administración",
                    school: "ETEC Professor Horácio Augusto da Silveira",
                    descrip_9: "• Educación técnica completa."
                }
            },

            recom: {
                title: "Carta de",
                subtitle: "Recomendación",
                description: "Carta emitida por CADDI Soluções em Tecnologia tras mi desempeño como pasante de TI.",
                btn: "Ver Carta de Recomendación"
            },

            proj: {
                title: "Mis",
                subtitle: "Proyectos",
                description: "Proyectos personales y académicos",

                one: {
                    title: "Ticket System",
                    subtitle: "Sistema para crear, listar y cerrar tickets de TI en C# con persistencia de datos en PostgreSQL.",
                    btn: "Ver en GitHub"
                },

                two: {
                    title: "SQL Load Management",
                    subtitle: "Sistema para organizar y consultar cargas utilizando PostgreSQL y scripts SQL enfocados en rutinas operativas.",
                    btn: "Ver en GitHub"
                },

                thr: {
                    title: "Juego Educativo 2D",
                    subtitle: "Juego educativo desarrollado para concientizar sobre el ODS 2 de manera interactiva y accesible.",
                    btn: "Jugar"
                },

                four: {
                    title: "Planificación de E-commerce (Proyecto Final)",
                    subtitle: "Proyecto final de carrera desarrollado en grupo durante el curso de Técnico en Administración, analizando operaciones de comercio electrónico, logística, seguridad, métodos de pago y tendencias del mercado digital.",

                    descrip: "E-commerce",
                    descrip2: "Administración",
                    descrip3: "Planificación",

                    btn: "Ver Proyecto"
                }
            },
            
            cont: {
                title: "Póngase en",
                subtitle: "Contacto",
                description: "Hablemos de oportunidades",
                inf: "Información",
                name: "Tu nombre",
                email: "Tu correo electrónico",
                message: "Tu mensaje",
                button: "Enviar mensaje"
            },

            fot: {
                inf: "Todos los derechos reservados."
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
                value = value?.[k];
            });

            if (value === undefined) return;

            // INPUT E TEXTAREA
            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                element.placeholder = value;
                element.value = ""; // limpa texto bugado dentro do campo
            } else {
                element.textContent = value;
            }
        });
    }

        const savedLanguage = localStorage.getItem("language") || "pt";
        changeLanguage(savedLanguage);
