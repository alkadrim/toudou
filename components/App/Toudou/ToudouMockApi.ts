import { TodoModel } from "@models/ToudouModels";

export default class ToudouMockApi {
  public static getSomeToudous(): TodoModel[] {
    return [
      {
        titre: "1ere tache",
        description: "La premiere tache ",
        participant: "Moé"
      },
      {
        titre: "2eme tache",
        description: "Ueue 2 ",
        participant: "Moé"
      },
      {
        titre: "Rien",
        description: "Pas grand chose",
        participant: "Pas moé"
      }
    ]
  }
}
