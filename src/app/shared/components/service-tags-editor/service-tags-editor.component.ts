import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { normalizeString } from '@app/core/functions/string.functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const MAX_TAGS = 10;
const MAX_TAG_LENGTH = 20;

interface TagModel {
  name: string;
}

@Component({
  selector: 'app-service-tags-editor',
  templateUrl: './service-tags-editor.component.html',
  styleUrls: ['./service-tags-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ServiceTagsEditorComponent),
      multi: true,
    },
  ],
})
export class ServiceTagsEditorComponent implements ControlValueAccessor {
  @Output()
  public tagsChanged = new EventEmitter<TagModel[]>();

  public form: FormGroup;
  public tagNameControl: FormControl;
  public hasValue$: Observable<boolean>;
  public maxTagLength = MAX_TAG_LENGTH;

  private onChange: (value: any) => void;
  private onTouched: () => void;

  private _tags: TagModel[] = [];

  constructor() {
    this.tagNameControl = new FormControl('');
    this.form = new FormGroup({
      tagName: this.tagNameControl,
    });
    this.hasValue$ = this.tagNameControl.valueChanges.pipe(map(Boolean));
  }

  public get tags(): TagModel[] {
    return this._tags;
  }

  @Input()
  public set tags(value: TagModel[]) {
    this._tags = value ?? [];
    this.tagsChanged.emit(this.tags);
    if (this.onChange) {
      this.onChange(this.tags);
    }
  }

  public addTag(): void {
    const tagName = normalizeString(this.form.controls.tagName.value);
    if (!tagName || this.tags.length >= MAX_TAGS) {
      return;
    }
    this.form.reset();

    if (this.hasTag(tagName)) {
      return;
    }
    this.tags = [...this.tags, { name: tagName }];
  }

  public removeTag(tag): void {
    this.tags = this.tags.filter(t => t.name !== tag.name);
  }

  public writeValue(value: TagModel[]): void {
    this._tags = value ?? [];
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private hasTag(name: string): boolean {
    return Boolean(this.tags.find(t => t.name === name));
  }
}
