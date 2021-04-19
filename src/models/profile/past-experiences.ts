import { IsBoolean } from "class-validator";

export class PastExperiences {
  @IsBoolean({ message: "Escolha uma opção válida referente à sua experiência prévia com vendas."})
  sales!: boolean;
  @IsBoolean({ message: "Escolha uma opção válida referente à sua experiência prévia com suporte ao cliente." })
  support!: boolean;
}
