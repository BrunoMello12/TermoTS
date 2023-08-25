import { Termo } from "./Termo.js";

class TelaTermo {
  pnlTeclado: HTMLDivElement;
  pnlTermo: HTMLDivElement;
  jogoTermo: Termo;
  linha: number;
  coluna: number;
  btnEnter: HTMLButtonElement;
  palavra: string;
  venceu: boolean;
  erros: number;
  temLetra: string;
  Errou: string;
  btnReiniciar: HTMLButtonElement;
  mensagemfinal: HTMLDivElement;
  mensagem: HTMLLabelElement;

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
    this.pnlTeclado = document.getElementById("pnlTeclado") as HTMLDivElement;
    this.pnlTermo = document.getElementById("pnlTermo") as HTMLDivElement;
    this.btnEnter = document.getElementById("btnEnter") as HTMLButtonElement;
    this.mensagem = document.getElementById("mensagem") as HTMLLabelElement;

    this.btnReiniciar = document.getElementById(
      "btnReiniciar"
    ) as HTMLButtonElement;
    this.mensagemfinal = document.getElementById(
      "mensagemfinal"
    ) as HTMLDivElement;
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
    this.btnReiniciar.addEventListener("click", (sender) =>
      this.reiniciarJogo(sender)
    );
  }
  
  verificar(sender: MouseEvent): any {
    this.venceu = this.jogoTermo.venceu(this.palavra);
    const linha = this.pnlTermo.children[this.linha] as HTMLDivElement;

    if (this.venceu) {
      for (let botao of this.pnlTeclado.children) {
        (botao as HTMLButtonElement).disabled = true;
      }

      this.mensagemfinal.classList.remove("display-none");
      this.mensagem.textContent = `Você venceu, a palavra secreta era ${this.jogoTermo.palavraSecreta}!`;
    } 
    else if (this.jogadorPerdeu()) {
      for (let botao of this.pnlTeclado.children) {
        (botao as HTMLButtonElement).disabled = true;
      }

      this.mensagemfinal.classList.remove("display-none");
      this.mensagem.textContent = `Você pedeu, a palavra secreta era ${this.jogoTermo.palavraSecreta}!`;
    }

    if (this.palavra.length < 5) return;

    for (let i = 0; i < 5; i++) {
      const letra = linha.children[i] as HTMLDivElement;

      if (this.palavra[i] == this.jogoTermo.palavraSecreta[i]) {
        letra.style.backgroundColor = "green";
      } else if (this.jogoTermo.palavraSecreta.includes(this.palavra[i])) {
        letra.style.backgroundColor = "yellow";
      } else {
        letra.style.backgroundColor = "transparent";
      }
    }

    this.palavra = "";
    this.linha++;
    this.erros++;
  }

  darPalpite(sender: Event): void {
    const botaoClicado = sender.target as HTMLButtonElement;
    const palpite = botaoClicado.textContent![0];

    if (botaoClicado.textContent == "Enter") return;

    this.palavra += palpite;

    this.pnlTermo.children
      .item(this.linha)!
      .children.item(this.coluna)!.textContent = palpite;

    this.coluna++;
    if (this.coluna >= this.jogoTermo.obterQuantidadeLetras()) {
      this.coluna = 0;
    }
  }

  jogadorPerdeu(): boolean {
    if (this.erros > 3) {
      return true;
    }

    return false;
  }

  reiniciarJogo(sender: MouseEvent): any {
    this.jogoTermo = new Termo();
    this.palavra = "";
    this.erros = 0;
    this.linha = 0;
    this.coluna = 0;

    for (const linha of this.pnlTermo.children) {
      let i = 0;

      for (const coluna of linha.children) {
        const letra = linha.children[i] as HTMLDivElement;
        letra.style.backgroundColor = "#bebebe";
        letra.textContent = '';
        i++;

        for (let botao of this.pnlTeclado.children) {
          (botao as HTMLButtonElement).disabled = false;
        }
      }
    }

    this.mensagemfinal.classList.add("display-none");
  }
}

window.addEventListener("load", () => new TelaTermo());
