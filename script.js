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

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
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

if (contatoForm) {
    contatoForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const nome = contatoForm.querySelector('input[name="name"]').value.trim();
        const email = contatoForm.querySelector('input[name="email"]').value.trim();
        const mensagem = contatoForm.querySelector('textarea[name="message"]').value.trim();

        const quantidadePalavras = mensagem.split(/\s+/).filter(Boolean).length;

        if (nome.length < 2) {
            formStatus.textContent = "Digite seu nome corretamente.";
            formStatus.className = "mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300";
            return;
        }

        if (!email.includes("@")) {
            formStatus.textContent = "Digite um e-mail válido.";
            formStatus.className = "mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300";
            return;
        }

        if (quantidadePalavras < 5) {
            formStatus.textContent = "A mensagem deve ter no mínimo 5 palavras.";
            formStatus.className = "mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300";
            return;
        }

        formStatus.textContent = "Enviando mensagem...";
        formStatus.className = "mt-4 rounded-lg border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-sm font-medium text-violet-300";

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
                formStatus.textContent = "Mensagem enviada com sucesso!";
                formStatus.className = "mt-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-300";
                contatoForm.reset();
            } else {
                formStatus.textContent = "Não foi possível enviar. Tente novamente.";
                formStatus.className = "mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300";
            }

        } catch (error) {
            formStatus.textContent = "Erro ao enviar. Verifique sua conexão.";
            formStatus.className = "mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300";
        }
    });
}