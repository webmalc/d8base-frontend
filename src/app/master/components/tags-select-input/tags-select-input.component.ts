import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProfessionalTagList } from '@app/api/models';
import { MasterManagerService } from '@app/core/services/managers/master-manager.service';
import { Tag } from '@app/master/models/tag';
import { TagsApiService } from '@app/master/services/tags-api.service';
import { ProfessionalsService } from '@app/api/services';
import { BehaviorSubject } from 'rxjs';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tags-select-input',
  templateUrl: './tags-select-input.component.html',
  styleUrls: ['./tags-select-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsSelectInputComponent),
      multi: true,
    },
  ],
})
export class TagsSelectInputComponent implements OnInit, ControlValueAccessor {
  public tagsList$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public masterId: number;
  public form: FormGroup;
  private onChange: (fn: any) => void;

  constructor(
    private readonly api: TagsApiService,
    private readonly formBuilder: FormBuilder,
    private readonly professionalsApi: ProfessionalsService,
    private readonly masterManager: MasterManagerService,
  ) {}

  public ngOnInit(): void {
    this.masterManager
      .getMasterList()
      .pipe(tap(list => (this.masterId = list[0].id)))
      .subscribe(() => {
        this.professionalsApi
          .professionalsTagsList({})
          .subscribe(data => this.tagsList$.next(this.getTagNamesArray(data.results)));
        this.api.getByMasterId(this.masterId).subscribe(data => {
          this.createForm(data.results);
          this.onChange(this.form.get('tagSelect').value);
        });
      });
  }

  public addTag(): void {
    const newOption: string = this.form.get('tagInput').value;
    if (!newOption) {
      return;
    }
    this.tagsList$
      .pipe(first())
      .subscribe(list => {
        this.form.get('tagInput').setValue('');
        if (this.isNewOptionUnique(list, newOption)) {
          list.push(newOption);
          this.tagsList$.next(list);
          const selectedOptions: string[] = this.form.get('tagSelect').value;
          selectedOptions.push(newOption);
          this.form.controls.tagSelect.patchValue(selectedOptions);
        }
      })
      .unsubscribe();
  }

  public selectChange(): void {
    this.onChange(this.form.get('tagSelect').value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /* eslint-disable no-empty, @typescript-eslint/no-empty-function */
  public registerOnTouched(fn: any): void {}

  public writeValue(data: string[]): void {}

  public setDisabledState(isDisabled: boolean): void {}

  private isNewOptionUnique(list: string[], newOption: string): boolean {
    for (const tag of list) {
      if (tag === newOption) {
        return false;
      }
    }

    return true;
  }

  private createForm(currentTags: Tag[]): any {
    this.form = this.formBuilder.group({
      tagSelect: [this.getTagNamesArray(currentTags)],
      tagInput: [''],
    });
  }

  private getTagNamesArray(tags: ProfessionalTagList[]): string[] {
    const arr: string[] = [];
    tags.forEach(tag => arr.push(tag.name));

    return arr;
  }
}
