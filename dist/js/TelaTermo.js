import { Termo } from "./Termo.js";
class TelaTermo {
    constructor() {
        this.registrarElementos();
        this.registrarEventos();
        this.jogoTermo = new Termo();
        this.desativarBotao();
    }
    desativarBotao() {
        this.mensagemfinal.classList.add("display-none");
    }
    registrarElementos() {
        this.pnlTeclado = document.getElementById("pnlTeclado");
        this.pnlTermo = document.getElementById("pnlTermo");
        this.btnEnter = document.getElementById("btnEnter");
        this.mensagem = document.getElementById("mensagem");
        this.btnReiniciar = document.getElementById("btnReiniciar");
        this.mensagemfinal = document.getElementById("mensagemfinal");
        this.palavra = "";
        this.temLetra = "";
        this.Errou = "";
        this.linha = 0;
        this.coluna = 0;
        this.erros = 0;
    }
    registrarEventos() {
        for (let botao of this.pnlTeclado.children) {
            botao.addEventListener("click", (sender) => this.darPalpite(sender));
        }
        this.btnEnter.addEventListener("click", (sender) => this.verificar(sender));
        this.btnReiniciar.addEventListener("click", (sender) => this.reiniciarJogo(sender));
    }
    verificar(sender) {
        this.venceu = this.jogoTermo.venceu(this.palavra);
        const linha = this.pnlTermo.children[this.linha];
        if (this.venceu) {
            for (let botao of this.pnlTeclado.children) {
                botao.disabled = true;
            }
            this.mensagemfinal.classList.remove("display-none");
            this.mensagem.textContent = `Você venceu, a palavra secreta era ${this.jogoTermo.palavraSecreta}!`;
        }
        else if (this.jogadorPerdeu()) {
            for (let botao of this.pnlTeclado.children) {
                botao.disabled = true;
            }
            this.mensagemfinal.classList.remove("display-none");
            this.mensagem.textContent = `Você pedeu, a palavra secreta era ${this.jogoTermo.palavraSecreta}!`;
        }
        if (this.palavra.length < 5)
            return;
        for (let i = 0; i < 5; i++) {
            const letra = linha.children[i];
            if (this.palavra[i] == this.jogoTermo.palavraSecreta[i]) {
                letra.style.backgroundColor = "green";
            }
            else if (this.jogoTermo.palavraSecreta.includes(this.palavra[i])) {
                letra.style.backgroundColor = "yellow";
            }
            else {
                letra.style.backgroundColor = "transparent";
            }
        }
        this.palavra = "";
        this.linha++;
        this.erros++;
    }
    darPalpite(sender) {
        const botaoClicado = sender.target;
        const palpite = botaoClicado.textContent[0];
        if (botaoClicado.textContent == "Enter")
            return;
        this.palavra += palpite;
        this.pnlTermo.children
            .item(this.linha)
            .children.item(this.coluna).textContent = palpite;
        this.coluna++;
        if (this.coluna >= this.jogoTermo.obterQuantidadeLetras()) {
            this.coluna = 0;
        }
    }
    jogadorPerdeu() {
        if (this.erros > 3) {
            return true;
        }
        return false;
    }
    reiniciarJogo(sender) {
        this.jogoTermo = new Termo();
        this.palavra = "";
        this.erros = 0;
        this.linha = 0;
        this.coluna = 0;
        for (const linha of this.pnlTermo.children) {
            let i = 0;
            for (const coluna of linha.children) {
                const letra = linha.children[i];
                letra.style.backgroundColor = "#bebebe";
                letra.textContent = '';
                i++;
                for (let botao of this.pnlTeclado.children) {
                    botao.disabled = false;
                }
            }
        }
        this.mensagemfinal.classList.add("display-none");
    }
}
window.addEventListener("load", () => new TelaTermo());
//# sourceMappingURL=TelaTermo.js.map