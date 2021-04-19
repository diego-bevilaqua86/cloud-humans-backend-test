import App from "../../src/app";
import { ProfilesController } from '../../src/controllers/profiles.controller';
import { Profile } from "../../src/models/profile/profile";
import request from 'supertest';

describe('The ProfilesController', () => {
  describe('POST /evaluate', () => {
    describe('if the profile age is underage', () => {
      it('should emit a 400 HTTP error', () => {
        const userData: Profile = {
          age: 17,
          referral_code: null,
          writing_score: 0.3,
          internet_test: { download_speed: 5, upload_speed: 5 },
          past_experiences: { support: false, sales: false },
          education_level: "no_education"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(userData)
            .expect(400);
      });
    });

    describe('if the education level is no_education', () => {
      it('should obtain one point', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: null,
          writing_score: 0.3,
          internet_test: { download_speed: 5, upload_speed: 5 },
          past_experiences: { support: false, sales: false },
          education_level: "no_education"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":1/);
      });
    });

    describe('if the education level is high_school', () => {
      it('should obtain two points', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: null,
          writing_score: 0.3,
          internet_test: { download_speed: 5, upload_speed: 5 },
          past_experiences: { support: false, sales: false },
          education_level: "high_school"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":2/);
      });
    });

    describe('if the education level is bachelors_degree_or_high', () => {
      it('should obtain three points', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: null,
          writing_score: 0.3,
          internet_test: { download_speed: 5, upload_speed: 5 },
          past_experiences: { support: false, sales: false },
          education_level: "bachelors_degree_or_high"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":3/);
      });
    });

    describe('if past experiences in support and sales are false', () => {
      it('should obtain one point', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: null,
          writing_score: 0.3,
          internet_test: { download_speed: 5, upload_speed: 5 },
          past_experiences: { support: false, sales: false },
          education_level: "no_education"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":1/);
      });
    });

    describe('if past experience in support is true', () => {
      it('should obtain four points', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: null,
          writing_score: 0.3,
          internet_test: { download_speed: 5, upload_speed: 5 },
          past_experiences: { support: true, sales: false },
          education_level: "no_education"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":4/);
      });
    });

    describe('if past experience in sales is true', () => {
      it('should obtain six points', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: null,
          writing_score: 0.3,
          internet_test: { download_speed: 5, upload_speed: 5 },
          past_experiences: { support: false, sales: true },
          education_level: "no_education"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":6/);
      });
    });

    describe('if past experiences in support and sales are true', () => {
      it('should obtain nine points', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: null,
          writing_score: 0.3,
          internet_test: { download_speed: 5, upload_speed: 5 },
          past_experiences: { support: true, sales: true },
          education_level: "no_education"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":9/);
      });
    });

    describe('if download and upload speeds are between 5mb and 50mb', () => {
      it('should obtain one point', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: null,
          writing_score: 0.3,
          internet_test: { download_speed: 5.0, upload_speed: 50.0 },
          past_experiences: { support: false, sales: false },
          education_level: "no_education"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":1/);
      });
    });

    describe('if download speed is under 5mb', () => {
      it('should obtain zero points', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: null,
          writing_score: 0.3,
          internet_test: { download_speed: 4.9, upload_speed: 5.0 },
          past_experiences: { support: false, sales: false },
          education_level: "no_education"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":0/);
      });
    });

    describe('if download speed is over 50mb', () => {
      it('should obtain two points', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: null,
          writing_score: 0.3,
          internet_test: { download_speed: 50.1, upload_speed: 50.0 },
          past_experiences: { support: false, sales: false },
          education_level: "no_education"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":2/);
      });
    });

    describe('if upload speed is under 5mb', () => {
      it('should obtain zero points', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: null,
          writing_score: 0.3,
          internet_test: { download_speed: 5.0, upload_speed: 4.9 },
          past_experiences: { support: false, sales: false },
          education_level: "no_education"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":0/);
      });
    });

    describe('if upload speed is over 50mb', () => {
      it('should obtain two points', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: null,
          writing_score: 0.3,
          internet_test: { download_speed: 50.0, upload_speed: 50.1 },
          past_experiences: { support: false, sales: false },
          education_level: "no_education"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":2/);
      });
    });

    describe('if writing score is under 30%', () => {
      it('should obtain minus one points', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: null,
          writing_score: 0.29,
          internet_test: { download_speed: 5.0, upload_speed: 50.0 },
          past_experiences: { support: false, sales: false },
          education_level: "no_education"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":-1/);
      });
    });

    describe('if writing score is between 30% and 70%', () => {
      it('should obtain one point', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: null,
          writing_score: 0.30,
          internet_test: { download_speed: 5.0, upload_speed: 50.0 },
          past_experiences: { support: false, sales: false },
          education_level: "no_education"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":1/);
      });
    });

    describe('if referral code is not valid', () => {
      it('should obtain one point', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: null,
          writing_score: 0.3,
          internet_test: { download_speed: 5.0, upload_speed: 50.0 },
          past_experiences: { support: false, sales: false },
          education_level: "no_education"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":1/);
      });
    });

    describe('if referral code is valid', () => {
      it('should obtain two points', () => {
        const profileData: Profile = {
          age: 20,
          referral_code: 'token1234',
          writing_score: 0.3,
          internet_test: { download_speed: 5.0, upload_speed: 50.0 },
          past_experiences: { support: false, sales: false },
          education_level: "no_education"
        };

        const profilesController = new ProfilesController();
        const app = new App([
          profilesController,
        ]);
        return request(app.getServer())
            .post(`${profilesController.path}/evaluate`)
            .send(profileData)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(/"score":2/);
      });
    });
  });
});
