export class Termo {
    constructor() {
        this.palavraSecreta = this.ObterPalavraSecreta();
        this.erros = 0;
        console.log(this.palavraSecreta);
    }
    ObterPalavraSecreta() {
        const palavras = [
            "ABRIR",
            "AMIGO",
            "BEBER",
            "BOLDO",
            "CAIXA",
            "CASAL",
            "CORPO",
            "DEDOS",
            "DENTE",
            "DIZER",
            "ERROS",
            "FALAR",
            "FESTA",
            "FOGAO",
            "GANHO",
            "GIRAR",
            "GRITO",
            "HORAS",
            "JOGOS",
            "JULHO",
            "LIMAO",
            "LOUCO",
            "MACAS",
            "MAIOR",
            "MELAO",
            "MOLHO",
        ];
        const indiceAleatorio = Math.floor(Math.random() * palavras.length);
        return palavras[indiceAleatorio];
    }
    venceu(palavra) {
        if (palavra == this.palavraSecreta) {
            return true;
        }
        else {
            return false;
        }
    }
    obterQuantidadeLetras() {
        return this.palavraSecreta.length;
    }
}
//# sourceMappingURL=Termo.js.map