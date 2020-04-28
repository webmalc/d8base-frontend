import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Master} from '@app/core/models/master';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {EducationFormFields} from '@app/profile/enums/education-form-fields';
import {EducationFormService} from '@app/profile/forms/education-form.service';
import {Education} from '@app/profile/models/education';
import {EducationCertificate} from '@app/profile/models/education-certificate';
import {CertificateApiService} from '@app/profile/services/certificate-api.service';
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
        private certificateApiService: CertificateApiService,
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
        const certificates: EducationCertificate[] = plainToClass<EducationCertificate, object[]>(
            EducationCertificate,
            this.formService.form.getRawValue()[EducationFormFields.Certificates],
            { excludeExtraneousValues: true }
            );

        this.masterManager.getMasterList().subscribe(
            (master: Master[]) => {
                education.master_id = master[0].id;
                this.educationApiService.save(education).subscribe(
                    response => {
                        certificates.forEach(
                            (cert: EducationCertificate) => cert.master_id = master[0].id
                        );
                        this.certificateApiService.save(certificates).subscribe(
                            resp => console.log('saved')
                        );
                    }
                );
            }
        );
    }
}
