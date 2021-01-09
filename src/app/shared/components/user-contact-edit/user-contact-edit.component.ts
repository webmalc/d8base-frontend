import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { MasterContact } from '@app/master/models/master-contact';
import { MasterContactsApiService } from '@app/master/services/master-contacts-api.service';
import { Contact } from '@app/profile/models/contact';
import { UserContact } from '@app/profile/models/user-contact';
import { ContactApiService } from '@app/profile/services/contact-api.service';
import { UserContactApiService } from '@app/profile/services/user-contact-api.service';
import { ClientContactInterface } from '@app/shared/interfaces/client-contact-interface';
import { ContactsApiServiceInterface } from '@app/shared/interfaces/contacts-api-service-interface';
import { forkJoin, Observable, of } from 'rxjs';
import { first, map, shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-contact-edit',
  templateUrl: './user-contact-edit.component.html',
  styleUrls: ['./user-contact-edit.component.scss'],
})
export class UserContactEditComponent implements OnInit {

  public selectOptions: Contact[];
  public form: FormGroup;

  private contact: ClientContactInterface;
  private isMaster: boolean;
  private clientContactsApiService: ContactsApiServiceInterface;
  private contactId: number;

  constructor(
    private readonly userContactApiService: UserContactApiService,
    private readonly masterContactApiService: MasterContactsApiService,
    private readonly route: ActivatedRoute,
    private readonly contactsApi: ContactApiService,
    private readonly formBuilder: FormBuilder,
    public readonly location: Location,
    private readonly masterManager: MasterManagerService,
  ) {
  }

  public get canDelete(): boolean {
    return Boolean(this.contact?.id); // TODO check is default
  }

  public ngOnInit(): void {
    const snapshot = this.route.snapshot;
    this.isMaster = snapshot.data?.isMaster;
    this.contactId = parseInt(snapshot.paramMap.get('contact-id'), 10);
    const defaultContactId = parseInt(snapshot.paramMap.get('default-contact-id'), 10);
    const newContact = defaultContactId ? { contact: defaultContactId, id: null, value: '' } : null;
    this.clientContactsApiService = this.isMaster ? this.masterContactApiService : this.userContactApiService;
    const selectOptions$ = this.contactsApi.get().pipe(map(response => response.results), shareReplay(1));
    forkJoin([
      selectOptions$,
      (this.contactId ? this.clientContactsApiService.getByEntityId(this.contactId)
        : of<ClientContactInterface>(newContact)),
    ]).pipe(first())
      .subscribe(([options, contact]) => {
        this.selectOptions = options;
        this.contact = contact;
        this.createForm(contact);
      });
  }

  public deleteContact(): void {
    if (this.contactId) {
      this.clientContactsApiService.delete(this.contact).subscribe(() => {
        // TODO: show feedback about operation success
      });
    }
    this.location.back();
  }

  public submitForm(): void {
    const updatedValues = this.form.getRawValue();
    const request = this.contactId
      ? this.clientContactsApiService.put({
        ...this.contact,
        ...updatedValues,
      })
      : this.getNewClientContactModel().pipe(
        switchMap(contact => this.clientContactsApiService.create({
            ...contact,
            ...updatedValues,
          }),
        ),
      );
    request.subscribe(() => this.location.back());
  }

  private createForm(contact?: ClientContactInterface): void {
    this.form = this.formBuilder.group({
      contact: [{ value: contact?.contact, disabled: Boolean(contact?.contact) }, [Validators.required]],
      value: [contact?.value, [Validators.required]],
    });
  }

  private getNewClientContactModel(): Observable<ClientContactInterface> {
    if (this.isMaster) {
      return this.masterManager.getMasterList().pipe(
        map(list => {
          const contact = new MasterContact();
          contact.professional = list[0].id;

          return contact;
        }),
      );
    }

    return of(new UserContact());
  }
}
