import { plainToClass } from "class-transformer";
import { Router, Request, Response, NextFunction } from 'express';
import { Project } from "../models/project/project";
import { ProjectService } from "../services/project.service";
import { HttpException } from "../shared/exceptions/http.exception";
import { isNullOrUndefined } from "../shared/functions";
import { bodyValidator } from "../shared/middlewares/body-validator.middleware";
import { Controller } from "./controller.interface";
import { Profile } from "../models/profile/profile";

function sortProjectsDescending(a: Project, b: Project): number {
  if (a.min_score > b.min_score) {
    return -1;
  } else if (a.min_score < b.min_score) {
    return 1;
  } else {
    return 0;
  }
}

export class ProfilesController implements Controller {
  public path = '/profiles';
  public router = Router();
  // TODO Use a dependency injector to provide this during construction
  private projectService = new ProjectService();
  private profiles: Array<Profile> = [];

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(this.path, [
      this.getAllProfiles.bind(this)
    ]);

    this.router.post(`${this.path}/evaluate`, [
      bodyValidator(Profile),
      this.bodyToProfile,
      this.evaluateAge,
      this.evaluateEducationLevel,
      this.evaluatePreviousExperience,
      this.evaluateInternetSpeed,
      this.evaluateWritingScore,
      this.evaluateReferralCode,
      this.matchProfileToProject.bind(this)
    ]);
  }

  private getAllProfiles(_req: Request, _res: Response, _next: NextFunction) {
    _res.status(200).send(this.profiles);
  }

  private bodyToProfile(_req: Request, _res: Response, _next: NextFunction) {
    _res.locals.profile = plainToClass(Profile, _req.body);
    return _next();
  }

  private evaluateAge(_req: Request, _res: Response, _next: NextFunction) {
    if (_res.locals.profile.age < 18) {
      return _next(new HttpException(400, 'O candidato precisa ser maior de idade (ter mais de 18 anos).'));
    }
    _res.locals.score = 0;
    return _next();
  }

  private evaluateEducationLevel(_req: Request, _res: Response, _next: NextFunction) {
    if (_res.locals.profile.education_level === 'high_school') {
      _res.locals.score += 1;
    } else if (_res.locals.profile.education_level === "bachelors_degree_or_high") {
      _res.locals.score += 2;
    }
    return _next();
  }

  private evaluatePreviousExperience(_req: Request, _res: Response, _next: NextFunction) {
    if (_res.locals.profile.past_experiences.sales) {
      _res.locals.score += 5;
    }
    if (_res.locals.profile.past_experiences.support) {
      _res.locals.score += 3;
    }
    return _next();
  }

  private evaluateInternetSpeed(_req: Request, _res: Response, _next: NextFunction) {
    if (_res.locals.profile.internet_test.download_speed > 50.0) {
      _res.locals.score += 1;
    } else if (_res.locals.profile.internet_test.download_speed < 5.0) {
      _res.locals.score -= 1;
    }

    if (_res.locals.profile.internet_test.upload_speed > 50.0) {
      _res.locals.score += 1;
    } else if (_res.locals.profile.internet_test.upload_speed < 5.0) {
      _res.locals.score -= 1;
    }
    return _next();
  }

  private evaluateWritingScore(_req: Request, _res: Response, _next: NextFunction) {
    if (_res.locals.profile.writing_score < 0.3) {
      _res.locals.score -= 1;
    } else if (_res.locals.profile.writing_score <= 0.7) {
      _res.locals.score += 1;
    } else {
      _res.locals.score += 2;
    }
    return _next();
  }

  private evaluateReferralCode(_req: Request, _res: Response, _next: NextFunction) {
    if (!isNullOrUndefined(_res.locals.profile.referral_code) && _res.locals.profile.referral_code === "token1234") {
        _res.locals.score += 1;
    }
    return _next();
  }

  private matchProfileToProject(_req: Request, _res: Response, _next: NextFunction) {
    const availableProjects = this.projectService.getAvailableProjects();
    availableProjects.sort(sortProjectsDescending);

    let projectMatch = {
      score: _res.locals.score,
      selected_project: "",
      eligible_projects: new Array<string>(),
      ineligible_projects: new Array<string>()
    };

    projectMatch.selected_project = availableProjects
        .find((project) => project.min_score < _res.locals.score)
        ?.name || "";
    projectMatch.eligible_projects = availableProjects
        .filter((project) => project.min_score < _res.locals.score)
        .map(project => project.name);
    projectMatch.ineligible_projects = availableProjects
        .filter((project) => project.min_score >= _res.locals.score)
        .map(project => project.name);

    return _res.status(200).send(projectMatch);
  }
}
