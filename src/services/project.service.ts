import { Project } from "../models/project/project";

export class ProjectService {
  public getAvailableProjects(): Array<Project> {
    // TODO Get projects from a database
    return [
      { name: "calculate_dark_matter_nasa", description: "Calculate the Dark Matter of the universe for Nasa", min_score: 10 },
      { name: "determine_schrodinger_cat_is_alive", description: "Determine if the Schrodinger's cat is alive", min_score: 5 },
      { name: "support_users_from_xyz", description: "Attend to users support for a YXZ Company", min_score: 3 },
      { name: "collect_information_for_xpto", description: "Collect specific people information from their social media for XPTO Company", min_score: 2 },
    ];
  }
}
