import { IsDecimal, IsDefined, Min } from "class-validator";

export class InternetTest {
  @IsDefined({ message: "Por favor, informe a velocidade de download." })
  @IsDecimal({ force_decimal: false }, { message: "A velocidade de download deve ser um número válido." })
  @Min(0.0, { message: "A velocidade de download deve ser maior que zero." })
  download_speed!: number;

  @IsDefined({ message: "Por favor, informe a velocidade de upload." })
  @IsDecimal({ force_decimal: false }, { message: "A velocidade de upload deve ser um número válido." })
  @Min(0.0, { message: "A velocidade de upload deve ser maior que zero." })
  upload_speed!: number;
}
