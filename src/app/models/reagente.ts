import { Classificacao } from "./classificacao";
import { Unidade } from "./unidade";
export interface Reagente {
  id: number;
  img?: string;
  qtdEstoqueLacrado?: number;
  qtdEstoqueAberto?: number;
  qtdEstoqueTotal: number;
  nome: string;
  comentario?: string;
  classificacao: Classificacao;
  valor: number;
  unidade: Unidade;
}
