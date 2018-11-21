import { Unidade } from "./unidade";
import { Tamanho } from "./tamanho";
export interface Vidraria {
  id: number;
  img?: string;
  qtdEstoque: number;
  nome: string;
  comentario?: string;
  valor: number;
  unidade: Unidade;
  tamanho: Tamanho;
}
