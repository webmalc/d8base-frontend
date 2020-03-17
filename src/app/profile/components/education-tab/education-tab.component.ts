import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Master} from '@app/core/models/master';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {EducationFormFields} from '@app/profile/enums/education-form-fields';
import {EducationFormService} from '@app/profile/forms/education-form.service';
import {Certification} from '@app/profile/models/certification';
import {Education} from '@app/profile/models/education';
import {CertificationApiService} from '@app/profile/services/certification-api.service';
import {EducationApiService} from '@app/profile/services/education-api.service';
import {plainToClass} from 'class-transformer';

@Component({
    selector: 'app-education-tab',
    templateUrl: './education-tab.component.html',
    styleUrls: ['./education-tab.component.scss'],
})
export class EducationTabComponent implements OnInit {

    public formFields = EducationFormFields;
    public form: FormGroup;

    constructor(
        public formService: EducationFormService,
        private educationApiService: EducationApiService,
        private certificationApiService: CertificationApiService,
        private masterManager: MasterManagerService
    ) {
    }

    public ngOnInit(): void {
      this.formService.getForm().subscribe(
          form => this.form = form
      );
    }

    public submitEducationForm(): void {
        const education: Education = plainToClass(Education, this.formService.form.getRawValue(), { excludeExtraneousValues: true });
        const certifications: Certification[] = plainToClass<Certification, object[]>(
            Certification,
            this.formService.form.getRawValue()[EducationFormFields.Certifications],
            { excludeExtraneousValues: true }
            );

        this.masterManager.getCurrentMaster().subscribe(
            (master: Master) => {
                education.master_id = master.id;
                this.educationApiService.save(education).subscribe(
                    response => {
                        (certifications as any).forEach(
                            (cert: Certification) => cert.master_id = master.id
                        );
                        this.certificationApiService.save(certifications).subscribe(
                            resp => console.log('saved')
                        );
                    }
                );
            }
        );
    }
}
