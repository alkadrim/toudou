export default class ToudouMockApi {
  public static getSomeToudous(): any[] {
    return [
      {
        titre: "1ere tache",
        description: "La premiere tache ",
        participant: "Mo�"
      },
      {
        titre: "2eme tache",
        description: "Ueue 2 ",
        participant: "Mo�"
      },
      {
        titre: "Rien",
        description: "Pas grand chose",
        participant: "Pas mo�"
      }
    ]
  }
}
