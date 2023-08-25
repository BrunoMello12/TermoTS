export class Termo {
    erros: number;
    mensagemFinal: string;
    palavraSecreta: string;
    letrasEncontradas: string[];
  
    constructor() {
      this.palavraSecreta = this.ObterPalavraSecreta();
      this.erros = 0;
      console.log(this.palavraSecreta);
    }
  
    ObterPalavraSecreta(): string {
        const palavras: string[] = [
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

    venceu(palavra: string): boolean {
        if(palavra == this.palavraSecreta){
            return true;
        }
        else{
            return false;
        }
    }

    obterQuantidadeLetras(): number {
      return this.palavraSecreta.length;
    }
  }
