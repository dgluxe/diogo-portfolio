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
       
       formStatus.textContent = "Enviando mensagem...";

       const formData = new FormData (contatoForm);

       try {
        const response = await fetch ("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                Accept: "application/json"
            },
            body: formData
        });

        const data = await response.json();

        if (response.ok && data.sucess){
            formStatus.textContent = "Mensagem enviada com sucesso!";
            contatoForm.reset();
        } else {
            formStatus.textContent = "Não foi possível enviar. Tente novamente.";

        }

    } catch (error) {
            formStatus.textContent = "Erro ao enviar. Verifique sua conexão";
        }
    });
}
