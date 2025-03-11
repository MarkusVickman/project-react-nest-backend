import { Injectable } from '@nestjs/common';

//class som innehåller svar för routes i app.controller
@Injectable()
export class AppService {
  getHello(): string {
    return '<h1>Välkommen till Easy Book Review API. Testa endpoint /review med Get istället för att läsa ut alla recensioner.<h1>';
  }
}
