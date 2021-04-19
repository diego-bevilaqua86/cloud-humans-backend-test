import { Expose } from "class-transformer";
import { IsDefined, IsIn, IsInt, IsOptional, Max, Min, ValidateNested } from "class-validator";
import { EducationLevel } from "./education-level.type";
import { InternetTest } from "./internet-test";
import { PastExperiences } from "./past-experiences";

export class Profile {
  @IsDefined({ message: "Por favor, informe a idade." })
  @IsInt({ message: "A idade deve ser um número válido." })
  @Min(0, { message: "A idade deve ser maior do que zero." })
  @Expose()
  age!: number;

  @IsDefined({ message: "Por favor, informe o grau de escolaridade." })
  @IsIn(
      [ 'high_school', 'no_education', 'bachelors_degree_or_high' ],
      { message: 'Escolha uma opção válida para o grau de escolaridade.' }
  )
  @Expose()
  education_level!: EducationLevel;

  @IsDefined({ message: "Por favor, informe sobre as experiências anteriores." })
  @ValidateNested()
  @Expose()
  past_experiences!: PastExperiences;

  @IsDefined({ message: "Por favor, informe sobre a velocidade de conexão com a Internet." })
  @ValidateNested()
  @Expose()
  internet_test!: InternetTest;

  @IsDefined({ message: "Por favor, informe a pontuação de escrita." })
  // @IsDecimal({ force_decimal: false, }, { message: "A pontuação de escrita deve ser um número válido." })
  @Min(0.0, { message: "A pontuação de escrita deve ser maior ou igual a zero." })
  @Max(1.0, { message: "A pontuação de escrita deve ser menor ou igual a um." })
  @Expose()
  writing_score!: number;

  @IsOptional()
  @Expose()
  referral_code?: string | null;

  constructor() {
  }

  toString(): string {
    return JSON.stringify(this, null, 2);
  }
}
